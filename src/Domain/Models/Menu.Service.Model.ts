export class ReadMenuDetailModel {}

export class ReadMenuCategoryDetailModel {
  Id: string;
}

export class ReadMenuProductDetailModel {
  Id: string;
}

export class ReadSearchMenuDetailModel {
  Text: string;
}

export class CreateMenuCategoryModel {
  Name: string;
  IsShowMenu: boolean;
  MetaTitle: string;
  MetaDescription: string;
  Icon: string;
  Description: string;
}

export class UpdateMenuCategoryModel {
  Id: string;
  Name: string;
  IsShowMenu: boolean;
  MetaTitle: string;
  MetaDescription: string;
  Icon: string;
  Description: string;
}

export class DeleteMenuCategoryModel {
  Id: string;
}

export class CreateMenuProductModel {
  CategoryId: string;
  IsShowMenu: boolean;
  MetaTitle: string;
  MetaDescription: string;
  Name: string;
  Description: string;
  Price: number;
  Waiting: number;
  SnapId: string;
  TapsiId: string;
  SrcImage: string;
}

export class UpdateMenuProductModel {
  Id: string;
  CategoryId: string;
  IsShowMenu: boolean;
  MetaTitle: string;
  MetaDescription: string;
  Name: string;
  Description: string;
  Price: number;
  Waiting: number;
  SnapId: string;
  TapsiId: string;
  SrcImage: string;
}

export class DeleteMenuProductModel {
  Id: string;
}

export class ReadEconomicPackageListModel {
  IsActiveNow?: boolean;
}

export class ReadEconomicPackageDetailModel {
  Id: string;
}

export class CreateEconomicPackageModel {
  IsShowMenu: boolean;
  SrcImage: string;
  Title: string;
  StartDate: string;
  EndDate: string;
  Price: number;
}

export class UpdateEconomicPackageModel {
  Id: string;
  IsShowMenu: boolean;
  SrcImage: string;
  Title: string;
  StartDate: string;
  EndDate: string;
  Price: number;
}

export class DeleteEconomicPackageModel {
  Id: string;
}

export class CreateContentEconomicPackageModel {
  EconomicPackageId: string;
  ProductId: string;
  Count: number;
}

export class DeleteContentEconomicPackageModel {
  EconomicPackageId: string;
  ProductId: string;
  Count: number;
}
