export class ReadTableListModel {}

export class ReadTableDetailModel {
  Id: string;
}

export class CreateTableModel {
  Location: string;
}

export class UpdateTableModel {
  Id: string;
  Location: string;
}

export class DeleteTableModel {
  Id: string;
}

export class ReadOrderTableListModel {}

export class ReadOrderTableDetailModel {
  Id: string;
}

export class CreateOrderTableModel {
  Id: string;
  Orders: { ProductId: string; Count: number }[];
}

export class ReadOrderAccountListModel {
  AccessToken: string;
}

export class ReadStatusTableModel {
  Id: string;
}

export class AcceptStatusTableModel {
  Id: string;
}

export class DeleteStatusTableModel {
  Id: string;
}

export class ReadOrderListModel {
  EndDay?: string;
  StartDay?: string;
  IsPay?: boolean;
}

export class ReadOrderMonthlyListModel {
  Count: number;
  Space: number;
}

export class ReadOrderDetailModel {
  Id: string;
}

export class CreateOrderModel {}

export class EmitUpdateOrderModel {}

export class UpdateOrderModel {
  Id: string;
  CustomerMobile: string;
  FactorNumber: number;
  Tax: number;
  Location: string;
  IsPay: boolean;
  FactorDate: string;
}

export class UpdatePayStatusOrderModel {
  Id: string;
  IsPay: boolean;
}

export class DeleteOrderModel {
  Id: string;
}

export class CreateOrderItemModel {
  Id: string;
}

export class UpdateOrderItemModel {
  Id: string;
  ProductCount: number;
  ProductDiscount: number;
  ProductName: string;
  ProductPrice: number;
}

export class DeleteOrderItemModel {
  Id: string;
}
