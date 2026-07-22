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
} from '../../../Domain/Models/Order.Service.Model';
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
} from '../../../Domain/ViewModels/Order.Service.ViewModel';

export interface IOrderService {
  //#region Table

  ReadTableList(Param: ReadTableListModel): Promise<ReadTableListViewModel[]>;

  ReadTableDetail(
    Param: ReadTableDetailModel,
  ): Promise<ReadTableDetailViewModel>;

  CreateTable(Param: CreateTableModel): Promise<CreateTableViewModel>;

  UpdateTable(Param: UpdateTableModel): Promise<UpdateTableViewModel>;

  DeleteTable(Param: DeleteTableModel): Promise<DeleteTableViewModel>;

  //#endregion

  //#region Status Table

  ReadStatusTable(
    Param: ReadStatusTableModel,
  ): Promise<ReadStatusTableViewModel>;

  AcceptStatusTable(
    Param: AcceptStatusTableModel,
  ): Promise<AcceptStatusTableViewModel>;

  DeleteStatusTable(
    Param: DeleteStatusTableModel,
  ): Promise<DeleteStatusTableViewModel>;

  //#endregion

  //#region Order Table

  ReadOrderTableList(
    Param: ReadOrderTableListModel,
  ): Promise<ReadOrderTableListViewModel[]>;

  ReadOrderTableDetail(
    Param: ReadOrderTableDetailModel,
  ): Promise<ReadOrderTableDetailViewModel>;

  CreateOrderTable(
    Param: CreateOrderTableModel,
  ): Promise<CreateOrderTableViewModel>;

  //#endregion

  //#region Order

  // ReadOrderAccountList(
  //   Param: ReadOrderAccountListModel,
  // ): Promise<ReadOrderAccountListViewModel[]>;

  ReadOrderMonthlyList(
    Param: ReadOrderMonthlyListModel,
  ): Promise<ReadOrderMonthlyListViewModel[]>;

  ReadOrderList(Param: ReadOrderListModel): Promise<ReadOrderListViewModel[]>;

  ReadOrderDetail(
    Param: ReadOrderDetailModel,
  ): Promise<ReadOrderDetailViewModel>;

  CreateOrder(Param: CreateOrderModel): Promise<CreateOrderViewModel>;

  EmitUpdateOrder(
    Param: EmitUpdateOrderModel,
  ): Promise<EmitUpdateOrderViewModel>;

  UpdateOrder(Param: UpdateOrderModel): Promise<UpdateOrderViewModel>;

  UpdatePayStatusOrder(
    Param: UpdatePayStatusOrderModel,
  ): Promise<UpdatePayStatusOrderViewModel>;

  DeleteOrder(Param: DeleteOrderModel): Promise<DeleteOrderViewModel>;

  //#endregion

  //#region Order Item

  CreateOrderItem(
    Param: CreateOrderItemModel,
  ): Promise<CreateOrderItemViewModel>;

  UpdateOrderItem(
    Param: UpdateOrderItemModel,
  ): Promise<UpdateOrderItemViewModel>;

  DeleteOrderItem(
    Param: DeleteOrderItemModel,
  ): Promise<DeleteOrderItemViewModel>;

  //#endregion
}
