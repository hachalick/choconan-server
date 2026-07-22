import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import moment from 'moment-jalaali';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { PresentFactorEntity } from 'src/Domain/Entities/Mysql/PresentFactor.Entity';
import { PresentFactorItemEntity } from 'src/Domain/Entities/Mysql/FactorPresentOrder.Entity';
import { FactorItemEntity } from 'src/Domain/Entities/Mysql/FactorItem.Entity';
import { FactorEntity } from 'src/Domain/Entities/Mysql/Factor.Entity';
import { type IOrderService } from './Interfaces/Order.Service.Interface';
import {
  AcceptStatusTableModel,
  CreateOrderItemModel,
  CreateOrderModel,
  CreateOrderTableModel,
  CreateTableModel,
  DeleteOrderItemModel,
  DeleteOrderModel,
  DeleteStatusTableModel,
  DeleteTableModel,
  EmitUpdateOrderModel,
  ReadOrderDetailModel,
  ReadOrderListModel,
  ReadOrderMonthlyListModel,
  ReadOrderTableDetailModel,
  ReadOrderTableListModel,
  ReadStatusTableModel,
  ReadTableDetailModel,
  ReadTableListModel,
  UpdateOrderItemModel,
  UpdateOrderModel,
  UpdatePayStatusOrderModel,
  UpdateTableModel,
} from '../../Domain/Models/Order.Service.Model';
import {
  AcceptStatusTableViewModel,
  CreateOrderItemViewModel,
  CreateOrderTableViewModel,
  CreateOrderViewModel,
  CreateTableViewModel,
  DeleteOrderItemViewModel,
  DeleteOrderViewModel,
  DeleteStatusTableViewModel,
  DeleteTableViewModel,
  EmitUpdateOrderViewModel,
  ReadOrderDetailViewModel,
  ReadOrderListViewModel,
  ReadOrderMonthlyListViewModel,
  ReadOrderTableDetailViewModel,
  ReadOrderTableListViewModel,
  ReadStatusTableViewModel,
  ReadTableDetailViewModel,
  ReadTableListViewModel,
  UpdateOrderItemViewModel,
  UpdateOrderViewModel,
  UpdatePayStatusOrderViewModel,
  UpdateTableViewModel,
} from '../../Domain/ViewModels/Order.Service.ViewModel';
import { HttpExceptionCustom } from 'src/Api/Exceptions/HttpExceptionCustom';
import { HttpExceptionMessageCustom } from 'src/Share/Constants/HttpExceptionMessageCustom';

@Injectable()
export class OrderService implements IOrderService {
  @WebSocketServer() private server: Server;

  constructor(
    @InjectRepository(ProductMenuEntity, ConnectionNameMysql.global)
    private readonly ProductMenuRepository: Repository<ProductMenuEntity>,

    @InjectRepository(PresentFactorEntity, ConnectionNameMysql.global)
    private readonly PresentFactorRepository: Repository<PresentFactorEntity>,

    @InjectRepository(PresentFactorItemEntity, ConnectionNameMysql.global)
    private readonly PresentFactorItemRepository: Repository<PresentFactorItemEntity>,

    @InjectRepository(FactorEntity, ConnectionNameMysql.global)
    private readonly FactorRepository: Repository<FactorEntity>,

    @InjectRepository(FactorItemEntity, ConnectionNameMysql.global)
    private readonly FactorItemRepository: Repository<FactorItemEntity>,
  ) {}

  //#region table

  async ReadTableList(
    Param: ReadTableListModel,
  ): Promise<ReadTableListViewModel[]> {
    return (
      await this.PresentFactorRepository.find({
        order: { Location: 'ASC' },
        select: { Location: true, Guid: true },
      })
    ).map((res) => ({
      Id: res.Guid,
      Location: res.Location,
    }));
  }

  async ReadTableDetail(
    Param: ReadTableDetailModel,
  ): Promise<ReadTableDetailViewModel> {
    throw new Error('Not Implement');
  }

  async CreateTable(Param: CreateTableModel): Promise<CreateTableViewModel> {
    const newModel = this.PresentFactorRepository.create({
      Location: Param.Location,
    });

    await this.PresentFactorRepository.save(newModel);

    return { Create: true };
  }

  async UpdateTable(Param: UpdateTableModel): Promise<UpdateTableViewModel> {
    throw new Error('Method not implemented.');
  }

  async DeleteTable(Param: DeleteTableModel): Promise<DeleteTableViewModel> {
    const findTable = await this.PresentFactorRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findTable) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.PresentFactorRepository.delete({
      Guid: Param.Id,
    });

    return { Delete: res.affected > 0 };
  }

  //#endregion

  //#region status table

  async ReadStatusTable(
    Param: ReadStatusTableModel,
  ): Promise<ReadStatusTableViewModel> {
    const res = await this.PresentFactorRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!res) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return { IsBusy: res.IsBusy };
  }

  async AcceptStatusTable(
    Param: AcceptStatusTableModel,
  ): Promise<AcceptStatusTableViewModel> {
    const res = await this.PresentFactorRepository.findOne({
      where: { Guid: Param.Id },
      relations: { FactorPresentOrderTables: { Product: true } },
    });

    if (!res) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createOrder = await this.CreateOrder({});

    for (const item of res.FactorPresentOrderTables) {
      const createOrderItem = await this.CreateOrderItem({
        Id: createOrder.Id,
      });

      await this.UpdateOrderItem({
        Id: createOrderItem.Id,
        ProductCount: item.Count,
        ProductDiscount: createOrderItem.ProductDiscount,
        ProductName: item.Product.Name,
        ProductPrice: item.Product.Price,
      });
    }

    await this.PresentFactorRepository.delete({ Guid: Param.Id });

    return { Accept: true };
  }

  async DeleteStatusTable(
    Param: DeleteStatusTableModel,
  ): Promise<DeleteStatusTableViewModel> {
    const res = await this.PresentFactorRepository.findOne({
      where: { Guid: Param.Id },
      relations: { FactorPresentOrderTables: { Product: true } },
    });

    if (!res) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.PresentFactorRepository.delete({ Guid: Param.Id });

    return { Delete: true };
  }

  //#endregion

  //#region order table

  async ReadOrderTableList(
    Param: ReadOrderTableListModel,
  ): Promise<ReadOrderTableListViewModel[]> {
    const res = await this.PresentFactorRepository.find({
      relations: {
        FactorPresentOrderTables: { Product: true },
      },
    });

    return res
      .map((val) => ({
        Id: val.Guid,
        IsBusy: val.IsBusy,
        Location: val.Location,
        Items: val.FactorPresentOrderTables.map((val2) => ({
          ProductId: val2.Product.Guid,
          ProductName: val2.Product.Name,
          ProductPrice: val2.Product.Price,
          ProductCount: val2.Count,
        })),
      }))
      .filter((val) => val.Items.length > 0);
  }

  async ReadOrderTableDetail(
    Param: ReadOrderTableDetailModel,
  ): Promise<ReadOrderTableDetailViewModel> {
    const res = await this.PresentFactorRepository.findOne({
      where: { Guid: Param.Id },
      order: { Location: 'ASC' },
      relations: { FactorPresentOrderTables: { Product: true } },
    });

    if (!res) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      Id: res.Guid,
      IsBusy: res.IsBusy,
      Location: res.Location,
      Items: res.FactorPresentOrderTables.map((val) => ({
        ProductId: val.Product.Guid,
        ProductName: val.Product.Name,
        ProductCount: val.Count,
      })),
    };
  }

  async CreateOrderTable(
    Param: CreateOrderTableModel,
  ): Promise<CreateOrderTableViewModel> {
    const resTable = await this.PresentFactorRepository.findOne({
      where: { Guid: Param.Id },
      relations: { FactorPresentOrderTables: true },
    });

    if (!resTable) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const item of resTable.FactorPresentOrderTables) {
      await this.PresentFactorItemRepository.delete({ Guid: item.Guid });
    }

    for (const item of Param.Orders) {
      const findProduct = await this.ProductMenuRepository.findOne({
        where: { Guid: item.ProductId },
      });

      if (!findProduct) continue;
      if (item.Count <= 0) continue;

      const newFactor = this.PresentFactorItemRepository.create({
        Count: item.Count,
        Product: findProduct,
        PresentOrderTable: resTable,
      });

      await this.PresentFactorItemRepository.save(newFactor);
    }

    await this.EmitUpdateOrder({});

    return { Create: true };
  }

  //#endregion

  //#region order

  async ReadOrderMonthlyList(
    Param: ReadOrderMonthlyListModel,
  ): Promise<ReadOrderMonthlyListViewModel[]> {
    const result: ReadOrderMonthlyListViewModel[] = [];

    let cursor = moment().startOf('jMonth');

    for (let i = Param.Space; i < Param.Count + Param.Space; i++) {
      const year = Number(cursor.format('jYYYY'));
      const month = Number(cursor.format('jM'));
      cursor = cursor.subtract(1, 'jMonth');

      const momentJ = moment(`${year}/${month}/01`, 'jYYYY/jM/jD');

      // ✅ تنظیم درست تاریخ‌ها
      const startDate = momentJ
        .clone()
        .startOf('jMonth')
        .startOf('day')
        .toDate();
      const endDate = momentJ.clone().endOf('jMonth').endOf('day').toDate();
      const daysInMonth = momentJ.daysInMonth();

      const factors = await this.FactorRepository.find({
        where: {
          FactorDate: Between(startDate, endDate),
        },
        relations: { FactorItems: true },
      });

      let totalPrice = 0;
      let totalItems = 0;
      const raghamAshar = 100;
      let averagePrice = 0;
      let averageItems = 0;
      let averageFactors = 0;

      for (const factor of factors) {
        for (const factorItem of factor.FactorItems) {
          const count = Number(factorItem.ProductCount) || 0;
          const price = Number(factorItem.ProductPrice) || 0;
          const discount = Number(factorItem.ProductDiscount) || 0;

          totalPrice += count * (price - discount);
          totalItems += count;
        }
      }

      const cursorNow = moment().startOf('jMonth');

      if (
        !(
          year === Number(cursorNow.format('jYYYY')) &&
          month === Number(cursorNow.format('jM'))
        )
      ) {
        averagePrice =
          Math.floor((totalPrice * raghamAshar) / daysInMonth) / raghamAshar;
        averageItems =
          Math.floor((totalItems * raghamAshar) / daysInMonth) / raghamAshar;
        averageFactors =
          Math.floor((factors.length * raghamAshar) / daysInMonth) /
          raghamAshar;
      }

      result.push({
        month: `${year}/${month}`,
        totalFactors: factors.length,
        averageFactors,
        totalItems,
        averageItems,
        totalPrice,
        averagePrice,
      });
    }

    return result;
  }

  // async ReadOrderMonthlyList(
  //   Param: ReadOrderMonthlyListModel,
  // ): Promise<ReadOrderMonthlyListViewModel[]> {
  //   const result: ReadOrderMonthlyListViewModel[] = [];

  //   let cursor = moment().startOf('jMonth');

  //   for (let i = Param.Space; i < Param.Count + Param.Space; i++) {
  //     const year = Number(cursor.format('jYYYY'));
  //     const month = Number(cursor.format('jM'));
  //     cursor = cursor.subtract(1, 'jMonth');

  //     const momentJ = moment(`${year}/${month}/01`, 'jYYYY/jM/jD');
  //     const startDate = momentJ.startOf('jMonth');
  //     const endDate = momentJ.endOf('jMonth');

  //     const factors = await this.FactorRepository.find({
  //       where: { FactorDate: Between(startDate.toDate(), endDate.toDate()) },
  //       relations: { FactorItems: true },
  //     });

  //     console.log(startDate.toDate(), endDate.toDate());

  //     let totalPrice = 0;
  //     let totalItems = 0;
  //     const raghamAshar = 100;
  //     let averagePrice = 0;
  //     let averageItems = 0;
  //     let averageFactors = 0;

  //     const productMap = {};

  //     for (const factor of factors) {
  //       for (const factorItem of factor.FactorItems) {
  //         totalPrice +=
  //           factorItem.ProductCount *
  //           (factorItem.ProductPrice - factorItem.ProductDiscount);
  //         totalItems += factorItem.ProductCount;
  //         productMap[factorItem.ProductName] =
  //           (productMap[factorItem.ProductName] || 0) + factorItem.ProductCount;
  //       }
  //     }

  //     const cursorNow = moment().startOf('jMonth');

  //     if (
  //       !(
  //         year === Number(cursorNow.format('jYYYY')) &&
  //         month === Number(cursorNow.format('jM'))
  //       )
  //     ) {
  //       averagePrice =
  //         Math.floor(
  //           (totalPrice * raghamAshar) / Number(endDate.format('jD')),
  //         ) / raghamAshar;
  //       averageItems =
  //         Math.floor(
  //           (totalItems * raghamAshar) / Number(endDate.format('jD')),
  //         ) / raghamAshar;
  //       averageFactors =
  //         Math.floor(
  //           (factors.length * raghamAshar) / Number(endDate.format('jD')),
  //         ) / raghamAshar;
  //     }

  //     result.push({
  //       month: `${year}/${month}`,
  //       totalFactors: factors.length,
  //       averageFactors,
  //       totalItems,
  //       averageItems,
  //       totalPrice,
  //       averagePrice,
  //     });
  //   }

  //   return result;
  // }

  async ReadOrderList(
    Param: ReadOrderListModel,
  ): Promise<ReadOrderListViewModel[]> {
    let whereCondition: FindOptionsWhere<FactorEntity> = {};

    if (Param.EndDay && Param.StartDay) {
      const startDate = new Date(
        moment(Param.StartDay, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
      );
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(
        moment(Param.EndDay, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
      );
      endDate.setHours(23, 59, 59, 999);

      whereCondition = {
        FactorDate: Between(startDate, endDate),
      };
    } else if (Param.EndDay) {
      const endDate = new Date(
        moment(Param.EndDay, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
      );
      endDate.setHours(23, 59, 59, 999);

      whereCondition = {
        FactorDate: LessThanOrEqual(endDate),
      };
    } else if (Param.StartDay) {
      const startDate = new Date(
        moment(Param.StartDay, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
      );
      startDate.setHours(0, 0, 0, 0);

      whereCondition = {
        FactorDate: MoreThanOrEqual(startDate),
      };
    }

    if (Param.IsPay !== undefined) {
      whereCondition.IsPay = Param.IsPay;
    }

    const res = await this.FactorRepository.find({
      where: whereCondition,
      order: { FactorDate: 'DESC' },
      relations: { FactorItems: true },
    });

    return res.map((factor) => ({
      Id: factor.Guid,
      CustomerMobile: factor.CustomerMobile,
      FactorDate: moment(factor.FactorDate).format('jYYYY/jMM/jDD HH:mm:ss'),
      FactorNumber: factor.FactorNumber,
      IsPay: factor.IsPay,
      Location: factor.Location,
      Tax: factor.Tax,
      FactorItems: factor.FactorItems.map((factorItem) => ({
        Id: factorItem.Guid,
        ProductCount: factorItem.ProductCount,
        ProductDiscount: factorItem.ProductDiscount,
        ProductName: factorItem.ProductName,
        ProductPrice: factorItem.ProductPrice,
      })),
    }));
  }

  async ReadOrderDetail(
    Param: ReadOrderDetailModel,
  ): Promise<ReadOrderDetailViewModel> {
    const res = await this.FactorRepository.findOne({
      where: { Guid: Param.Id },
      relations: { FactorItems: true },
    });

    if (!res) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      Id: res.Guid,
      CustomerMobile: res.CustomerMobile,
      FactorNumber: res.FactorNumber,
      Tax: res.Tax,
      IsPay: res.IsPay,
      Location: res.Location,
      FactorDate: moment(res.FactorDate).format('jYYYY/jMM/jDD HH:mm:ss'),
      FactorItems: res.FactorItems.map((val) => ({
        Id: val.Guid,
        ProductCount: val.ProductCount,
        ProductDiscount: val.ProductDiscount,
        ProductName: val.ProductName,
        ProductPrice: val.ProductPrice,
      })),
    };
  }

  async CreateOrder(Param: CreateOrderModel): Promise<CreateOrderViewModel> {
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1;
    const nowDay = nowDate.getDate() + 1;
    const endToday = new Date(
      `${nowYear}/${nowMonth}/${nowDay} 00:00:00`,
    ).getTime();
    const startToday = endToday - 1000 * 60 * 60 * 24;

    const factors = await this.FactorRepository.find({
      where: {
        FactorDate: Between(new Date(startToday), new Date(endToday)),
      },
      select: { FactorNumber: true },
      order: { FactorNumber: 'ASC' },
    });

    let counterFactor = 1;

    for (const item of factors) {
      if (item.FactorNumber != counterFactor) {
        break;
      }
      counterFactor++;
    }

    const newFactor = this.FactorRepository.create({
      FactorNumber: counterFactor,
      Tax: 0,
      IsPay: false,
      Location: '',
    });

    const res = await this.FactorRepository.save(newFactor);

    return {
      Id: res.Guid,
      CustomerMobile: res.CustomerMobile,
      FactorNumber: res.FactorNumber,
      IsPay: res.IsPay,
      Location: res.Location,
      Tax: res.Tax,
      FactorDate: moment(res.FactorDate).format('jYYYY/jMM/jDD HH:mm:ss'),
      Create: true,
    };
  }

  async EmitUpdateOrder(
    Param: EmitUpdateOrderModel,
  ): Promise<EmitUpdateOrderViewModel> {
    this.server.emit(`order-present`, { code: 1, message: 'reload site' });

    return { Send: true };
  }

  async UpdateOrder(Param: UpdateOrderModel): Promise<UpdateOrderViewModel> {
    const enDateFactor = new Date(
      moment(Param.FactorDate, 'jYYYY/jMM/jDD hh:mm:ss').format(
        'YYYY-MM-DD hh:mm:ss',
      ),
    );

    const findFactor = await this.FactorRepository.findOne({
      where: {
        Guid: Param.Id,
      },
    });

    if (!findFactor) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (findFactor.FactorDate != enDateFactor) {
      const nowYear = enDateFactor.getFullYear();
      const nowMonth = enDateFactor.getMonth() + 1;
      const nowDay = enDateFactor.getDate() + 1;

      const endToday = new Date(
        `${nowYear}/${nowMonth}/${nowDay} 00:00:00`,
      ).getTime();
      const startToday = endToday - 1000 * 60 * 60 * 24;

      const factors = await this.FactorRepository.find({
        where: {
          FactorDate: Between(new Date(startToday), new Date(endToday)),
        },
        select: { FactorNumber: true },
        order: { FactorNumber: 'ASC' },
      });

      let counterFactor = 1;

      for (const item of factors) {
        if (item.FactorNumber != counterFactor) {
          break;
        }
        counterFactor++;
      }

      findFactor.FactorNumber = counterFactor;
    }

    const res = await this.FactorRepository.update(
      { Guid: Param.Id },
      {
        CustomerMobile: Param.CustomerMobile,
        Location: Param.Location,
        IsPay: Param.IsPay,
        Tax: Param.Tax,
        FactorNumber: findFactor.FactorNumber,
        FactorDate: enDateFactor,
      },
    );

    return { Update: res.affected > 0 };
  }

  async UpdatePayStatusOrder(
    Param: UpdatePayStatusOrderModel,
  ): Promise<UpdatePayStatusOrderViewModel> {
    const findFactor = await this.FactorRepository.findOne({
      where: {
        Guid: Param.Id,
      },
    });

    if (!findFactor) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.FactorRepository.update(
      { Guid: Param.Id },
      { IsPay: Param.IsPay },
    );

    return { Update: res.affected > 0 };
  }

  async DeleteOrder(Param: DeleteOrderModel): Promise<DeleteOrderViewModel> {
    const findFactor = await this.FactorRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findFactor) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findFactorYear = findFactor.FactorDate.getFullYear();
    const findFactorMonth = findFactor.FactorDate.getMonth() + 1;
    const findFactorDay = findFactor.FactorDate.getDate() + 1;
    const endFactorDate = new Date(
      `${findFactorYear}/${findFactorMonth}/${findFactorDay} 00:00:00`,
    ).getTime();
    const startFactorDate = endFactorDate - 1000 * 60 * 60 * 24;

    const res = await this.FactorRepository.delete({ Guid: Param.Id });

    const listFactor = await this.FactorRepository.find({
      where: {
        FactorDate: Between(new Date(startFactorDate), new Date(endFactorDate)),
      },
      order: { FactorDate: 'ASC' },
    });

    let counter = 1;

    for (const item of listFactor) {
      await this.FactorRepository.update(
        { Id: item.Id },
        {
          FactorNumber: counter,
        },
      );

      counter++;
    }

    return { Delete: res.affected > 0 };
  }

  //#endregion

  //#region order item

  async CreateOrderItem(
    Param: CreateOrderItemModel,
  ): Promise<CreateOrderItemViewModel> {
    const findFactor = await this.FactorRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findFactor) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.FactorItemRepository.create({
      ProductName: '',
      ProductPrice: 0,
      ProductCount: 1,
      ProductDiscount: 0,
      Factor: findFactor,
    });

    const res = await this.FactorItemRepository.save(newModel);

    return {
      Id: res.Guid,
      ProductCount: res.ProductCount,
      ProductDiscount: res.ProductDiscount,
      ProductName: res.ProductName,
      ProductPrice: res.ProductPrice,
      Create: true,
    };
  }

  async UpdateOrderItem(
    Param: UpdateOrderItemModel,
  ): Promise<UpdateOrderItemViewModel> {
    const product = await this.ProductMenuRepository.findOne({
      where: { Name: Param.ProductName },
    });

    // if (Param.ProductPrice < 0) return { Update: false };
    // if (Param.ProductCount < 0) return { Update: false };
    // if (Param.ProductName.length === 0) return { Update: false };

    const res = await this.FactorItemRepository.update(
      { Guid: Param.Id },
      {
        ProductCount: Param.ProductCount,
        ProductDiscount: Param.ProductDiscount,
        ProductName: Param.ProductName,
        ProductPrice: Param.ProductPrice,
        ProductMenuId: product?.Guid,
      },
    );

    return { Update: res.affected > 0 };
  }

  async DeleteOrderItem(
    Param: DeleteOrderItemModel,
  ): Promise<DeleteOrderItemViewModel> {
    const findFactorItem = await this.FactorItemRepository.findOne({
      where: {
        Guid: Param.Id,
      },
    });

    if (!findFactorItem) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.FactorItemRepository.delete({ Guid: Param.Id });

    return { Delete: res.affected > 0 };
  }

  //#endregion
}
