import {
  BaseCreateViewModel,
  BaseDeleteViewModel,
  BaseReadViewModel,
  BaseUpdateViewModel,
} from 'src/Domain/ViewModels/Seed/Base.Service.ViewModel';

export class ReadUnitPricingListViewModel extends BaseReadViewModel {
  Name: string;
}

export class ReadUnitPricingDetailViewModel extends BaseReadViewModel {
  Name: string;
}

export class CreateUnitPricingViewModel extends BaseCreateViewModel {}

export class UpdateUnitPricingViewModel extends BaseUpdateViewModel {}

export class DeleteUnitPricingViewModel extends BaseDeleteViewModel {}

export class ReadProductPricingListViewModel {
  DayToWork: number;
  Cost: {
    SumCost: number;
    AverageCost: number;
    ItemCost: number;
    List: { Id: string; Name: string; Price: number }[];
  };
  ProductInMenu: {
    SumCountSell: number;
    AverageCountSell: number;
    SumBalance: number;
    List: {
      ProductIdInMenu: string;
      ProductCategoryIdInMenu: string;
      ProductNumberIdInMenu: string;
      NameInMenu: string;
      PriceInMenu: number;
      ProductIdInPricing: string;
      NameInPricing: string;
      SumDetailPricing: number;
      ProfitPricing: number;
      PriceInPricing: number;
      ProductUnitId: string;
      UnitPricing: string;
      RatioPricing: number;
      CountSell: number;
      AverageCountSell: number;
      Balance: number;
    }[];
  };
  ProductInPricing: {
    List: {
      Id: string;
      Name: string;
      BuyPrice: number;
      ProductUnit: {
        ProductMenuId: string;
        PriceInMenu: number;
        ProductUnitId: string;
        UnitName: string;
        UnitId: string;
        Ratio: number;
        Profit: number;
        SumDetail: number;
        PriceByUnit: number;
        TotalPriceForRatio: number;
        CountSell: number;
        PriceByTotalPrice: number;
        Detail: {
          Id: string;
          ProductName: string;
          UnitName: string;
          Amount: number;
          BuyPrice: number;
          Ratio: number;
          PriceByUnit: number;
          TotalPriceByUnit: number;
          ChildProductUnitId: string;
          ParentProductUnitId: string;
        }[];
      }[];
    }[];
  };
}

export class CreateProductUnitPricingViewModel extends BaseCreateViewModel {
  Id: string;
}

export class UpdateProductUnitPricingViewModel extends BaseUpdateViewModel {}

export class DeleteProductUnitPricingViewModel extends BaseDeleteViewModel {}

export class UpdateProductUnitRatioViewModel extends BaseUpdateViewModel {}

export class CreateProductPricingViewModel extends BaseCreateViewModel {
  Id: string;
}

export class UpdateProductPricingViewModel extends BaseUpdateViewModel {}

export class DeleteProductPricingViewModel extends BaseDeleteViewModel {}

export class CreateDetailProductPricingViewModel extends BaseCreateViewModel {
  Id: string;
}

export class UpdateDetailProductPricingViewModel extends BaseUpdateViewModel {}

export class DeleteDetailProductPricingViewModel extends BaseDeleteViewModel {}

export class ReadCostProductPricingListViewModel extends BaseReadViewModel {
  Name: string;
  Price: number;
}

export class ReadCostProductPricingDetailViewModel extends BaseReadViewModel {
  Name: string;
  Price: number;
}

export class CreateCostProductPricingViewModel extends BaseCreateViewModel {}

export class UpdateCostProductPricingViewModel extends BaseUpdateViewModel {}

export class DeleteCostProductPricingViewModel extends BaseDeleteViewModel {}
