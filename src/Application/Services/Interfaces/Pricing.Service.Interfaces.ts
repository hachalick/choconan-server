import {
  CreateCostProductPricingModel,
  CreateDetailProductPricingModel,
  CreateProductPricingModel,
  CreateProductUnitPricingModel,
  CreateUnitPricingModel,
  DeleteCostProductPricingModel,
  DeleteDetailProductPricingModel,
  DeleteProductPricingModel,
  DeleteProductUnitPricingModel,
  DeleteUnitPricingModel,
  ReadCostProductPricingDetailModel,
  ReadCostProductPricingListModel,
  ReadProductPricingListModel,
  ReadUnitPricingDetailModel,
  ReadUnitPricingListModel,
  UpdateCostProductPricingModel,
  UpdateDetailProductPricingModel,
  UpdateProductPricingModel,
  UpdateProductUnitPricingModel,
  UpdateProductUnitRatioModel,
  UpdateUnitPricingModel,
} from '../../../Domain/Models/Pricing.Service.Model';
import {
  CreateCostProductPricingViewModel,
  CreateDetailProductPricingViewModel,
  CreateProductPricingViewModel,
  CreateProductUnitPricingViewModel,
  CreateUnitPricingViewModel,
  DeleteCostProductPricingViewModel,
  DeleteDetailProductPricingViewModel,
  DeleteProductPricingViewModel,
  DeleteProductUnitPricingViewModel,
  DeleteUnitPricingViewModel,
  ReadCostProductPricingDetailViewModel,
  ReadCostProductPricingListViewModel,
  ReadProductPricingListViewModel,
  ReadUnitPricingDetailViewModel,
  ReadUnitPricingListViewModel,
  UpdateCostProductPricingViewModel,
  UpdateDetailProductPricingViewModel,
  UpdateProductPricingViewModel,
  UpdateProductUnitPricingViewModel,
  UpdateProductUnitRatioViewModel,
  UpdateUnitPricingViewModel,
} from '../../../Domain/ViewModels/Pricing.Service.ViewModel';

export interface IPricingService {
  //#region Read Unit

  ReadUnitPricingList(
    Param: ReadUnitPricingListModel,
  ): Promise<ReadUnitPricingListViewModel[]>;

  ReadUnitPricingDetail(
    Param: ReadUnitPricingDetailModel,
  ): Promise<ReadUnitPricingDetailViewModel>;

  CreateUnitPricing(
    Param: CreateUnitPricingModel,
  ): Promise<CreateUnitPricingViewModel>;

  UpdateUnitPricing(
    Param: UpdateUnitPricingModel,
  ): Promise<UpdateUnitPricingViewModel>;

  DeleteUnitPricing(
    Param: DeleteUnitPricingModel,
  ): Promise<DeleteUnitPricingViewModel>;

  //#endregion

  //#region Product Pricing

  ReadProductPricingList(
    Param: ReadProductPricingListModel,
  ): Promise<ReadProductPricingListViewModel>;

  CreateProductPricing(
    Param: CreateProductPricingModel,
  ): Promise<CreateProductPricingViewModel>;

  UpdateProductPricing(
    Param: UpdateProductPricingModel,
  ): Promise<UpdateProductPricingViewModel>;

  DeleteProductPricing(
    Param: DeleteProductPricingModel,
  ): Promise<DeleteProductPricingViewModel>;

  //#endregion

  //#region Product Unit Pricing

  CreateProductUnitPricing(
    Param: CreateProductUnitPricingModel,
  ): Promise<CreateProductUnitPricingViewModel>;

  UpdateProductUnitPricing(
    Param: UpdateProductUnitPricingModel,
  ): Promise<UpdateProductUnitPricingViewModel>;

  DeleteProductUnitPricing(
    Param: DeleteProductUnitPricingModel,
  ): Promise<DeleteProductUnitPricingViewModel>;

  //#endregion

  //#region Product Unit Ratio

  UpdateProductUnitRatio(
    Param: UpdateProductUnitRatioModel,
  ): Promise<UpdateProductUnitRatioViewModel>;

  //#endregion

  //#region Detail Pricing Product

  CreateDetailProductPricing(
    Param: CreateDetailProductPricingModel,
  ): Promise<CreateDetailProductPricingViewModel>;

  UpdateDetailProductPricing(
    Param: UpdateDetailProductPricingModel,
  ): Promise<UpdateDetailProductPricingViewModel>;

  DeleteDetailProductPricing(
    Param: DeleteDetailProductPricingModel,
  ): Promise<DeleteDetailProductPricingViewModel>;

  //#endregion

  //#region Cost Product Pricing

  ReadCostProductPricingList(
    Param: ReadCostProductPricingListModel,
  ): Promise<ReadCostProductPricingListViewModel[]>;

  ReadCostProductPricingDetail(
    Param: ReadCostProductPricingDetailModel,
  ): Promise<ReadCostProductPricingDetailViewModel>;

  CreateCostProductPricing(
    Param: CreateCostProductPricingModel,
  ): Promise<CreateCostProductPricingViewModel>;

  UpdateCostProductPricing(
    Param: UpdateCostProductPricingModel,
  ): Promise<UpdateCostProductPricingViewModel>;

  DeleteCostProductPricing(
    Param: DeleteCostProductPricingModel,
  ): Promise<DeleteCostProductPricingViewModel>;

  //#endregion
}
