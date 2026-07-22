export class ReadUnitPricingListModel {}

export class ReadUnitPricingDetailModel {
  Id: string;
}

export class CreateUnitPricingModel {
  Name: string;
}

export class UpdateUnitPricingModel {
  Id: string;
  Name: string;
}

export class DeleteUnitPricingModel {
  Id: string;
}

export class ReadProductPricingListModel {}

export class CreateProductPricingModel {
  Name: string;
  Buy: number;
}

export class UpdateProductPricingModel {
  Id: string;
  Name: string;
  Buy: number;
}

export class DeleteProductPricingModel {
  Id: string;
}

export class CreateProductUnitPricingModel {
  UnitPricingId: string;
  ProductPricingId: string;
  ProductMenuId: string;
  Ratio: number;
  Profit: number;
}

export class UpdateProductUnitPricingModel {
  Id: string;
  UnitPricingId: string;
  ProductMenuId: string;
  Ratio: number;
  Profit: number;
}

export class DeleteProductUnitPricingModel {
  Id: string;
}

export class UpdateProductUnitRatioModel {
  IsRatio: boolean;
  ProductUnitId1: string;
  ProductUnitId2: string;
}

export class CreateDetailProductPricingModel {
  Amount: number;
  ParentProductUnitDetailId: string;
  ChildProductUnitDetailId: string;
}

export class UpdateDetailProductPricingModel {
  Id: string;
  Amount: number;
  ChildProductUnitDetailId: string;
}

export class DeleteDetailProductPricingModel {
  Id: string;
}

export class ReadCostProductPricingListModel {}

export class ReadCostProductPricingDetailModel {
  Id: string;
}

export class CreateCostProductPricingModel {
  Name: string;
  Price: number;
}

export class UpdateCostProductPricingModel {
  Id: string;
  Name: string;
  Price: number;
}

export class DeleteCostProductPricingModel {
  Id: string;
}
