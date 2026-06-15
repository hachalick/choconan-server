import { Injectable } from '@nestjs/common';
import { FactorPresentOrderEntity } from '../modules/entity/mysql/FactorPresentOrder.entity';
import { PresentOrderTableEntity } from '../modules/entity/mysql/PresentOrderTable.entity';
import { ProductMenuEntity } from '../modules/entity/mysql/Product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  IsNull,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Raw,
  Repository,
} from 'typeorm';
import { FactorEntity } from 'src/modules/entity/mysql/Factor.entity';
import { FactorItemEntity } from 'src/modules/entity/mysql/FactorItem.entity';
import moment from 'moment-jalaali';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { TDetailOrders } from 'src/modules/types/order';

@Injectable()
export class OrderService {
  constructor(
    private readonly jwtService: JwtService,
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
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
      order: { factorPresentOrderTable: { update_at: 'DESC' } },
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
  async historyOrderAccount({ token }: { token: string }) {
    const prop = await this.jwtService.verifyAccessToken(token);
    const phone = prop.phone as string | undefined;
    if (phone) {
      this.factorRepository.find({
        where: {
          factor_number: Raw(
            (alias) => `CAST(${alias} AS TEXT) LIKE '%${phone}%'`,
          ),
        },
      });
    }
  }

  async getOneOrder({ factor_id }: { factor_id: string }) {
    const res = await this.factorRepository.findOne({
      where: { factor_id },
      relations: { factor_items: true },
    });
    res.create_at = moment(res?.create_at).format('jYYYY/jMM/jDD HH:mm:ss');
    res.update_at = moment(res.update_at).format('jYYYY/jMM/jDD HH:mm:ss');
    return res;
  }

  // async monthlyReport(year: number, month: number) {
  //   const { startDate, endDate } = this.getShamsiMonthRange(year, month);

  //   const qb = this.factorRepository.createQueryBuilder('factor');

  //   const result = await qb
  //     .leftJoinAndSelect('factor.factor_items', 'items')
  //     .where('factor.create_at BETWEEN :start AND :end', {
  //       start: startDate,
  //       end: endDate,
  //     })
  //     .getMany();

  //   return result;
  // }

  getShamsiMonthRange(year: number, month: number) {
    if (!year || !month) {
      const today = moment();
      year = Number(today.format('jYYYY'));
      month = Number(today.format('jM'));
    }

    const start = moment(`${year}/${month}/01`, 'jYYYY/jM/jD').startOf(
      'jMonth',
    );
    const end = moment(start).endOf('jMonth');

    return {
      startDate: start.toDate(),
      endDate: end.toDate(),
    };
  }

  async monthlyReport(year: number, month: number) {
    const start = moment(`${year}/${month}/01`, 'jYYYY/jM/jD').startOf(
      'jMonth',
    );
    const end = moment(start).endOf('jMonth');

    const factors = await this.factorRepository.find({
      where: { create_at: Between(start.toDate(), end.toDate()) },
      relations: { factor_items: true },
    });

    let totalPrice = 0;
    let totalItems = 0;
    const productMap = {};

    for (const f of factors) {
      for (const item of f.factor_items) {
        totalPrice +=
          item.product_count * (item.product_price - item.product_discount);
        totalItems += item.product_count;
        productMap[item.product_name] =
          (productMap[item.product_name] || 0) + item.product_count;
      }
    }

    const cursorNow = moment().startOf('jMonth');

    const raghamAshar = 100;
    let averagePrice = 0;
    let averageItems = 0;
    let averageFactors = 0;

    if (
      year == Number(cursorNow.format('jYYYY')) &&
      month === Number(cursorNow.format('jM'))
    ) {
    } else {
      averagePrice =
        Math.floor((totalPrice * raghamAshar) / Number(end.format('jD'))) /
        raghamAshar;
      averageItems =
        Math.floor((totalItems * raghamAshar) / Number(end.format('jD'))) /
        raghamAshar;
      averageFactors =
        Math.floor((factors.length * raghamAshar) / Number(end.format('jD'))) /
        raghamAshar;
    }

    return {
      month: `${year}/${month}`,
      totalFactors: factors.length,
      averageFactors,
      totalItems,
      averageItems,
      totalPrice,
      averagePrice,
    };
  }

  async last12MonthsReport(countMonth = 12) {
    const result = [];

    let cursor = moment().startOf('jMonth');

    for (let i = 0; i < countMonth; i++) {
      const year = Number(cursor.format('jYYYY'));
      const month = Number(cursor.format('jM'));

      const report = await this.monthlyReport(year, month);
      result.push(report);

      cursor = cursor.subtract(1, 'jMonth');
    }

    return result;
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
    const nowFullDate = new Date();

    const nowYear = nowFullDate.getFullYear();
    const nowMonth = nowFullDate.getMonth() + 1;
    const nowDay = nowFullDate.getDate() + 1;

    const startToday = new Date(
      `${nowYear}/${nowMonth}/${nowDay} 00:00:00`,
    ).getTime();

    const factors = await this.factorRepository.find({
      where: {
        create_at: Between(
          new Date(startToday - 1000 * 60 * 60 * 24),
          new Date(startToday),
        ),
      },
      select: { factor_number: true },
      order: { factor_number: 'ASC' },
    });

    let counterFactor = 1;

    for (const item of factors) {
      if (item.factor_number != counterFactor) {
        break;
      }
      counterFactor++;
    }

    const newFactor = this.factorRepository.create({
      factor_number: counterFactor,
      tax: 0,
      pay_status: false,
      create_at: new Date(),
      update_at: new Date(),
      location: '',
    });

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
    create_date,
  }: {
    factor_id: string;
    customer_mobile: string;
    factor_number: number;
    tax: number;
    location: string;
    pay_status: boolean;
    create_date: string;
  }): Promise<{ update: boolean }> {
    try {
      const dateFactor = new Date(
        moment(create_date, 'jYYYY/jMM/jDD hh:mm:ss').format(
          'YYYY-MM-DD hh:mm:ss',
        ),
      );

      const findFactor = await this.factorRepository.findOne({
        where: {
          factor_id,
        },
      });

      if (findFactor.create_at != dateFactor) {
        const nowYear = dateFactor.getFullYear();
        const nowMonth = dateFactor.getMonth() + 1;
        const nowDay = dateFactor.getDate() + 1;

        const startToday = new Date(
          `${nowYear}/${nowMonth}/${nowDay} 00:00:00`,
        ).getTime();

        const factors = await this.factorRepository.find({
          where: {
            create_at: Between(
              new Date(startToday - 1000 * 60 * 60 * 24),
              new Date(startToday),
            ),
          },
          select: { factor_number: true },
          order: { factor_number: 'ASC' },
        });

        let counterFactor = 1;

        for (const item of factors) {
          if (item.factor_number != counterFactor) {
            break;
          }
          counterFactor++;
        }

        findFactor.factor_number = counterFactor;
      }

      await this.factorRepository.update(
        { factor_id },
        {
          customer_mobile,
          location,
          pay_status,
          tax,
          factor_number: findFactor.factor_number,
          create_at: dateFactor,
        },
      );
      return { update: true };
    } catch (error) {
      return { update: false };
    }
  }

  async updatePayStatusOrder({
    factor_id,
    pay_status,
  }: {
    factor_id: string;
    pay_status: boolean;
  }): Promise<{ update: boolean }> {
    try {
      await this.factorRepository.update({ factor_id }, { pay_status });
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
      const findFactor = await this.factorRepository.findOne({
        where: { factor_id },
      });

      const findFactorYear = findFactor.create_at.getFullYear();
      const findFactorMonth = findFactor.create_at.getMonth() + 1;
      const findFactorDay = findFactor.create_at.getDate() + 1;

      const startFirstDay = new Date(
        `${findFactorYear}/${findFactorMonth}/${findFactorDay} 00:00:00`,
      ).getTime();

      if (findFactor) {
        const res = await this.factorRepository.delete({ factor_id });

        const listFactor = await this.factorRepository.find({
          where: {
            create_at: Between(
              new Date(startFirstDay - 1000 * 60 * 60 * 24),
              new Date(startFirstDay),
            ),
          },
          order: { create_at: 'ASC' },
        });

        let counter = 1;

        for (const item of listFactor) {
          await this.factorRepository.update(item.factor_id, {
            factor_number: counter,
          });

          counter++;
        }

        if (!res.affected) throw Error();
      }
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
      const product = await this.productMenuRepository.findOne({
        where: { name: product_name },
      });
      await this.factorItemRepository.update(
        { factor_item_id },
        {
          product_count,
          product_discount,
          product_name,
          product_price,
          product_menu_id: product?.product_id,
        },
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
