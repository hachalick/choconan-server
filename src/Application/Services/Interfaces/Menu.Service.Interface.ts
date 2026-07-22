import {
  CreateContentEconomicPackageModel,
  CreateEconomicPackageModel,
  CreateMenuCategoryModel,
  CreateMenuProductModel,
  DeleteContentEconomicPackageModel,
  DeleteEconomicPackageModel,
  DeleteMenuCategoryModel,
  DeleteMenuProductModel,
  ReadEconomicPackageDetailModel,
  ReadEconomicPackageListModel,
  ReadMenuCategoryDetailModel,
  ReadMenuDetailModel,
  ReadMenuProductDetailModel,
  ReadSearchMenuDetailModel,
  UpdateEconomicPackageModel,
  UpdateMenuCategoryModel,
  UpdateMenuProductModel,
} from '../../../Domain/Models/Menu.Service.Model';
import {
  CreateContentEconomicPackageViewModel,
  CreateEconomicPackageViewModel,
  CreateMenuCategoryViewModel,
  CreateMenuProductViewModel,
  DeleteContentEconomicPackageViewModel,
  DeleteEconomicPackageViewModel,
  DeleteMenuCategoryViewModel,
  DeleteMenuProductViewModel,
  ReadEconomicPackageDetailViewModel,
  ReadEconomicPackageListViewModel,
  ReadMenuCategoryDetailViewModel,
  ReadMenuDetailViewModel,
  ReadMenuProductDetailViewModel,
  ReadSearchMenuDetailViewModel,
  UpdateEconomicPackageViewModel,
  UpdateMenuCategoryViewModel,
  UpdateMenuProductViewModel,
} from '../../../Domain/ViewModels/Menu.Service.ViewModel';

export interface IMenuService {
  ReadMenuDetail(
    Param: ReadMenuDetailModel,
  ): Promise<ReadMenuDetailViewModel[]>;

  ReadSearchMenuDetail(
    Param: ReadSearchMenuDetailModel,
  ): Promise<ReadSearchMenuDetailViewModel[]>;

  ReadMenuCategoryDetail(
    Param: ReadMenuCategoryDetailModel,
  ): Promise<ReadMenuCategoryDetailViewModel>;

  CreateMenuCategory(
    Param: CreateMenuCategoryModel,
  ): Promise<CreateMenuCategoryViewModel>;

  UpdateMenuCategory(
    Param: UpdateMenuCategoryModel,
  ): Promise<UpdateMenuCategoryViewModel>;

  DeleteMenuCategory(
    Param: DeleteMenuCategoryModel,
  ): Promise<DeleteMenuCategoryViewModel>;

  ReadMenuProductDetail(
    Param: ReadMenuProductDetailModel,
  ): Promise<ReadMenuProductDetailViewModel>;

  CreateMenuProduct(
    Param: CreateMenuProductModel,
  ): Promise<CreateMenuProductViewModel>;

  UpdateMenuProduct(
    Param: UpdateMenuProductModel,
  ): Promise<UpdateMenuProductViewModel>;

  DeleteMenuProduct(
    Param: DeleteMenuProductModel,
  ): Promise<DeleteMenuProductViewModel>;

  ReadEconomicPackageList(
    Param: ReadEconomicPackageListModel,
  ): Promise<ReadEconomicPackageListViewModel[]>;

  ReadEconomicPackageDetail(
    Param: ReadEconomicPackageDetailModel,
  ): Promise<ReadEconomicPackageDetailViewModel>;

  CreateEconomicPackage(
    Param: CreateEconomicPackageModel,
  ): Promise<CreateEconomicPackageViewModel>;

  UpdateEconomicPackage(
    Param: UpdateEconomicPackageModel,
  ): Promise<UpdateEconomicPackageViewModel>;

  DeleteEconomicPackage(
    Param: DeleteEconomicPackageModel,
  ): Promise<DeleteEconomicPackageViewModel>;

  CreateContentEconomicPackage(
    Param: CreateContentEconomicPackageModel,
  ): Promise<CreateContentEconomicPackageViewModel>;

  DeleteContentEconomicPackage(
    Param: DeleteContentEconomicPackageModel,
  ): Promise<DeleteContentEconomicPackageViewModel>;
}
