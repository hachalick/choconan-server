import {
  BaseCreateViewModel,
  BaseDeleteViewModel,
  BaseEmitViewModel,
  BaseReadViewModel,
  BaseUpdateViewModel,
} from './Seed/Base.Service.ViewModel';

export class ReadTableListViewModel extends BaseReadViewModel {
  Location: string;
}

export class ReadTableDetailViewModel extends BaseReadViewModel {
  Table: number;
}

export class CreateTableViewModel extends BaseCreateViewModel {}

export class UpdateTableViewModel extends BaseUpdateViewModel {}

export class DeleteTableViewModel extends BaseDeleteViewModel {}

export class ReadStatusTableViewModel {
  IsBusy: boolean;
}

export class AcceptStatusTableViewModel {
  Accept: boolean;
}

export class DeleteStatusTableViewModel extends BaseDeleteViewModel {}

export class ReadOrderTableListViewModel extends BaseReadViewModel {
  Location: string;
  IsBusy: boolean;
  Items: {
    ProductId: string;
    ProductName: string;
    ProductPrice: number;
    ProductCount: number;
  }[];
}

export class ReadOrderTableDetailViewModel extends BaseReadViewModel {
  Location: string;
  IsBusy: boolean;
  Items: {
    ProductId: string;
    ProductName: string;
    ProductCount: number;
  }[];
}

export class ReadOrderMonthlyListViewModel {
  month: string;
  totalFactors: any;
  averageFactors: number;
  totalItems: number;
  averageItems: number;
  totalPrice: number;
  averagePrice: number;
}

export class CreateOrderTableViewModel extends BaseCreateViewModel {}

export class ReadOrderAccountListViewModel extends BaseReadViewModel {}

export class ReadOrderDetailViewModel extends BaseReadViewModel {
  CustomerMobile: string;
  FactorNumber: number;
  Tax: number;
  Location: string;
  IsPay: boolean;
  FactorDate: string;
  FactorItems: {
    Id: string;
    ProductCount: number;
    ProductDiscount: number;
    ProductName: string;
    ProductPrice: number;
  }[];
}

export class ReadOrderListViewModel extends BaseReadViewModel {
  CustomerMobile: string;
  FactorNumber: number;
  Tax: number;
  Location: string;
  IsPay: boolean;
  FactorDate: string;
  FactorItems: {
    Id: string;
    ProductCount: number;
    ProductDiscount: number;
    ProductName: string;
    ProductPrice: number;
  }[];
}

export class CreateOrderViewModel extends BaseCreateViewModel {
  Id: string;
  FactorNumber: number;
  CustomerMobile: string;
  Tax: number;
  Location: string;
  IsPay: boolean;
  FactorDate: string;
}

export class EmitUpdateOrderViewModel extends BaseEmitViewModel {}

export class UpdateOrderViewModel extends BaseUpdateViewModel {}

export class UpdatePayStatusOrderViewModel extends BaseUpdateViewModel {}

export class DeleteOrderViewModel extends BaseDeleteViewModel {}

export class CreateOrderItemViewModel extends BaseCreateViewModel {
  Id: string;
  ProductCount: number;
  ProductDiscount: number;
  ProductName: string;
  ProductPrice: number;
}

export class UpdateOrderItemViewModel extends BaseUpdateViewModel {}

export class DeleteOrderItemViewModel extends BaseDeleteViewModel {}
