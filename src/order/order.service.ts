import { Injectable } from '@nestjs/common';
import { FactorPresentOrderEntity } from '../modules/entity/mysql/FactorPresentOrder.entity';
import { PresentOrderTableEntity } from '../modules/entity/mysql/PresentOrderTable.entity';
import { ProductMenuEntity } from '../modules/entity/mysql/Product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  IsNull,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { FactorEntity } from 'src/modules/entity/mysql/Factor.entity';
import { FactorItemEntity } from 'src/modules/entity/mysql/FactorItem.entity';
import * as moment from 'moment-jalaali';

@Injectable()
export class OrderService {
  private _counterFactor = 1;

  constructor(
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
    @InjectRepository(PresentOrderTableEntity)
    private readonly presentOrderTableRepository: Repository<PresentOrderTableEntity>,
    @InjectRepository(FactorPresentOrderEntity)
    private readonly factorPresentOrderRepository: Repository<FactorPresentOrderEntity>,
    @InjectRepository(FactorEntity)
    private readonly factorRepository: Repository<FactorEntity>,
    @InjectRepository(FactorItemEntity)
    private readonly factorItemRepository: Repository<FactorItemEntity>,
  ) {}

  //#region table

  async getTables(): Promise<{ table: number; table_id: string }[]> {
    const resPresentOrder = await this.presentOrderTableRepository.find({
      order: { table: 'ASC' },
      select: { table: true, present_order_table_id: true },
    });
    return resPresentOrder.map((res) => ({
      table_id: res.present_order_table_id,
      table: res.table,
    }));
  }

  async createTable({ table_number }: { table_number: number }) {
    const newTable = this.presentOrderTableRepository.create({
      accept: false,
      table: table_number,
      busy: false,
    });
    const res = await this.presentOrderTableRepository.save(newTable);
    return { create: true, table_id: res.present_order_table_id };
  }

  async deleteTable({ table_id }: { table_id: string }) {
    await this.presentOrderTableRepository.delete(table_id);
    return { delete: true };
  }

  //#endregion

  //#region status table

  async getStatusTable({ table_id }: { table_id: string }) {
    const res = await this.presentOrderTableRepository.findOne({
      where: { present_order_table_id: table_id },
    });
    return { can_order: res.accept && res.busy };
  }

  async acceptStatusTable({ table_id }: { table_id: string }) {
    await this.presentOrderTableRepository.update(
      { present_order_table_id: table_id },
      { accept: true },
    );
    return { accept: true };
  }

  async editableStatusTable({ table_id }: { table_id: string }) {
    await this.presentOrderTableRepository.update(
      { present_order_table_id: table_id },
      { accept: false, busy: true },
    );
    return { change: true };
  }

  async deleteStatusTable({ table_id }: { table_id: string }) {
    await this.presentOrderTableRepository.update(
      { present_order_table_id: table_id },
      { accept: false, busy: false },
    );
    const resPresent = await this.presentOrderTableRepository.findOne({
      where: { present_order_table_id: table_id },
      relations: { factorPresentOrderTable: true },
    });
    for (let i in resPresent.factorPresentOrderTable) {
      await this.factorPresentOrderRepository.delete({
        factor_present_order_id:
          resPresent.factorPresentOrderTable[i].factor_present_order_id,
      });
    }
    return { delete: true };
  }

  //#endregion

  //#region order table

  async getOrderTables() {
    const resPresentOrder = await this.presentOrderTableRepository.find({
      where: {
        factorPresentOrderTable: { factor_present_order_id: Not(IsNull()) },
      },
      order: { table: 'ASC' },
      relations: { factorPresentOrderTable: { products: true } },
    });
    return resPresentOrder;
  }

  async getOrderTableTables({ table_id }: { table_id: string }) {
    const resPresentOrder = await this.presentOrderTableRepository.findOne({
      where: { present_order_table_id: table_id },
      order: { table: 'ASC' },
      relations: { factorPresentOrderTable: { products: true } },
    });
    return resPresentOrder;
  }

  async orderTable({
    table_id,
    listOrder,
  }: {
    table_id: string;
    listOrder: TDetailOrders;
  }) {
    await this.presentOrderTableRepository.update(
      {
        present_order_table_id: table_id,
      },
      { busy: true },
    );
    const resTable = await this.presentOrderTableRepository.findOne({
      where: { present_order_table_id: table_id },
      relations: { factorPresentOrderTable: true },
    });
    resTable.factorPresentOrderTable.forEach(async (val) => {
      await this.factorPresentOrderRepository.delete(
        val.factor_present_order_id,
      );
    });
    listOrder.forEach(async (val) => {
      const { count, product_id } = val;
      const pro = await this.productMenuRepository.findOne({
        where: { product_id },
      });
      const newFactor = this.factorPresentOrderRepository.create({
        count,
        products: pro,
        presentOrderTable: resTable,
      });
      await this.factorPresentOrderRepository.save(newFactor);
    });
    return { submit: true };
  }

  //#endregion

  //#region order
  async getOneOrder({ factor_id }: { factor_id: string }) {
    const res = await this.factorRepository.findOne({
      where: { factor_id },
      relations: { factor_items: true },
    });
    res.create_at = moment(res.create_at).format('jYYYY/jMM/jDD HH:mm:ss');
    res.update_at = moment(res.update_at).format('jYYYY/jMM/jDD HH:mm:ss');
    return res;
  }

  private getDateRange(
    start: string,
    end: string,
  ): { startDate: Date; endDate: Date } {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (start === end) {
      endDate.setHours(23, 59, 59, 999);
    } else {
      endDate.setHours(23, 59, 59, 999);
    }

    startDate.setHours(0, 0, 0, 0);

    return { startDate, endDate };
  }

  async getOrder({
    end_day,
    start_day,
    pay_status,
  }: {
    end_day?: string;
    start_day?: string;
    pay_status?: boolean;
  }) {
    const whereCondition =
      end_day && start_day
        ? Between(
            this.getDateRange(
              moment(start_day, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
              moment(end_day, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
            ).startDate,
            this.getDateRange(
              moment(start_day, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
              moment(end_day, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
            ).endDate,
          )
        : end_day
          ? LessThanOrEqual(
              new Date(moment(end_day, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')),
            )
          : start_day
            ? MoreThanOrEqual(
                new Date(
                  moment(start_day, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
                ),
              )
            : new Date();
    return (
      await this.factorRepository.find({
        where: { create_at: whereCondition, pay_status },
        order: { create_at: 'DESC' },
        relations: { factor_items: true },
      })
    ).map((factor) => ({
      ...factor,
      create_at: moment(factor.create_at).format('jYYYY/jMM/jDD HH:mm:ss'),
      update_at: moment(factor.update_at).format('jYYYY/jMM/jDD HH:mm:ss'),
    }));
  }

  async createOrder(): Promise<{
    create: boolean;
    factor_id?: string;
    customer_mobile?: string;
    factor_number?: number;
    tax?: number;
    location?: string;
    pay_status?: boolean;
  }> {
    const newFactor = this.factorRepository.create({
      factor_number: this._counterFactor,
      tax: 0,
      pay_status: false,
      create_at: new Date(),
      update_at: new Date(),
      location: '',
    });

    this._counterFactor += 1;

    const {
      customer_mobile,
      factor_number,
      tax,
      location,
      pay_status,
      factor_id,
    } = await this.factorRepository.save(newFactor);

    return {
      create: true,
      customer_mobile,
      factor_number,
      tax,
      location,
      pay_status,
      factor_id,
    };
  }

  async updateOrder({
    factor_id,
    customer_mobile,
    factor_number,
    location,
    pay_status,
    tax,
  }: {
    factor_id: string;
    customer_mobile: string;
    factor_number: number;
    tax: number;
    location: string;
    pay_status: boolean;
  }): Promise<{ update: boolean }> {
    try {
      await this.factorRepository.update(
        { factor_id },
        { customer_mobile, factor_number, location, pay_status, tax },
      );
      return { update: true };
    } catch (error) {
      return { update: false };
    }
  }

  async deleteOrder({
    factor_id,
  }: {
    factor_id: string;
  }): Promise<{ delete: boolean }> {
    try {
      const res = await this.factorRepository.delete({ factor_id });
      if (!res.affected) throw Error();
      return { delete: true };
    } catch (error) {
      return { delete: false };
    }
  }

  //#endregion

  //#region order item

  async createOrderItem({ factor_id }: { factor_id: string }) {
    try {
      const factor = await this.factorRepository.findOne({
        where: { factor_id },
      });
      if (!factor) throw Error();
      const newOrderItem = this.factorItemRepository.create({
        product_name: '',
        product_price: 0,
        product_count: 1,
        product_discount: 0,
        factorEntity: factor,
      });

      const {
        factor_item_id,
        product_count,
        product_discount,
        product_name,
        product_price,
      } = await this.factorItemRepository.save(newOrderItem);

      return {
        create: true,
        factor_item_id,
        product_count,
        product_discount,
        product_name,
        product_price,
      };
    } catch (error) {
      return { create: false };
    }
  }

  async updateOrderItem({
    factor_item_id,
    product_count,
    product_discount,
    product_name,
    product_price,
  }: {
    factor_item_id: string;
    product_count: number;
    product_discount: number;
    product_name: string;
    product_price: number;
  }) {
    try {
      await this.factorItemRepository.update(
        { factor_item_id },
        { product_count, product_discount, product_name, product_price },
      );
      return { update: true };
    } catch (error) {
      return { update: false };
    }
  }

  async deleteOrderItem({ factor_item_id }: { factor_item_id: string }) {
    try {
      const res = await this.factorItemRepository.delete({ factor_item_id });
      if (!res.affected) throw Error();
      return { delete: true };
    } catch (error) {
      return { delete: false };
    }
  }

  //#endregion
}
