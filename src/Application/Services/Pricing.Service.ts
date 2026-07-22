import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import moment from 'moment-jalaali';
import { type IPricingService } from './Interfaces/Pricing.Service.Interfaces';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { ProductPricingEntity } from 'src/Domain/Entities/Mysql/ProductPricing.Entity';
import { UnitPricingEntity } from 'src/Domain/Entities/Mysql/UnitPricing.Entity';
import { FactorItemEntity } from 'src/Domain/Entities/Mysql/FactorItem.Entity';
import { FactorEntity } from 'src/Domain/Entities/Mysql/Factor.Entity';
import { CostPricingEntity } from 'src/Domain/Entities/Mysql/CostPricing.Entity';
import { ProductUnitDetailEntity } from 'src/Domain/Entities/Mysql/ProductUnitDetail.Entity';
import { ProductUnitRatioPricingEntity } from 'src/Domain/Entities/Mysql/ProductUnitRatioPricing.Entity';
import { ProductUnitPricingEntity } from 'src/Domain/Entities/Mysql/ProductUnitPricing.Entity';
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
} from '../../Domain/Models/Pricing.Service.Model';
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
} from '../../Domain/ViewModels/Pricing.Service.ViewModel';
import { HttpExceptionCustom } from 'src/Api/Exceptions/HttpExceptionCustom';
import { HttpExceptionMessageCustom } from 'src/Share/Constants/HttpExceptionMessageCustom';

@Injectable()
export class PricingService implements IPricingService {
  constructor(
    @InjectRepository(ProductMenuEntity, ConnectionNameMysql.global)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,

    @InjectRepository(ProductPricingEntity, ConnectionNameMysql.global)
    private readonly productPricingRepository: Repository<ProductPricingEntity>,

    @InjectRepository(UnitPricingEntity, ConnectionNameMysql.global)
    private readonly unitPricingRepository: Repository<UnitPricingEntity>,

    @InjectRepository(ProductUnitPricingEntity, ConnectionNameMysql.global)
    private readonly productUnitPricingRepository: Repository<ProductUnitPricingEntity>,

    @InjectRepository(ProductUnitRatioPricingEntity, ConnectionNameMysql.global)
    private readonly productUnitRatioPricingRepository: Repository<ProductUnitRatioPricingEntity>,

    @InjectRepository(ProductUnitDetailEntity, ConnectionNameMysql.global)
    private readonly productUnitDetailRepository: Repository<ProductUnitDetailEntity>,

    @InjectRepository(CostPricingEntity, ConnectionNameMysql.global)
    private readonly costPricingRepository: Repository<CostPricingEntity>,

    @InjectRepository(FactorEntity, ConnectionNameMysql.global)
    private readonly factorRepository: Repository<FactorEntity>,

    @InjectRepository(FactorItemEntity, ConnectionNameMysql.global)
    private readonly factorItemRepository: Repository<FactorItemEntity>,
  ) {}

  //#region unit

  async ReadUnitPricingList(
    Param: ReadUnitPricingListModel,
  ): Promise<ReadUnitPricingListViewModel[]> {
    return (
      await this.unitPricingRepository.find({
        select: { Guid: true, Name: true },
      })
    ).map((val) => ({ Id: val.Guid, Name: val.Name }));
  }

  async ReadUnitPricingDetail(
    Param: ReadUnitPricingDetailModel,
  ): Promise<ReadUnitPricingDetailViewModel> {
    const findUnitPricing = await this.unitPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findUnitPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UnitPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      Id: findUnitPricing.Guid,
      Name: findUnitPricing.Name,
    };
  }

  async CreateUnitPricing(
    Param: CreateUnitPricingModel,
  ): Promise<CreateUnitPricingViewModel> {
    const findUnitPricing = await this.unitPricingRepository.findOne({
      where: { Name: Param.Name },
    });

    if (findUnitPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UnitPricingIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.unitPricingRepository.create({ Name: Param.Name });

    await this.unitPricingRepository.save(newModel);

    return { Create: true };
  }

  async UpdateUnitPricing(
    Param: UpdateUnitPricingModel,
  ): Promise<UpdateUnitPricingViewModel> {
    const findUnitPricing = await this.unitPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findUnitPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UnitPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultUpdate = await this.unitPricingRepository.update(
      { Guid: Param.Id },
      {
        Name: Param.Name,
      },
    );

    return { Update: resultUpdate.affected > 0 };
  }

  async DeleteUnitPricing(
    Param: DeleteUnitPricingModel,
  ): Promise<DeleteUnitPricingViewModel> {
    const findUnitPricing = await this.unitPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findUnitPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UnitPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.unitPricingRepository.delete({
      Guid: Param.Id,
    });

    return { Delete: res.affected > 0 };
  }

  //#endregion

  //#region clean up ratio product unit

  private async CheckHaveRatioProductUnit() {
    const listProductPricing = await this.productPricingRepository.find();

    for (const productPricing of listProductPricing) {
      await this.ResetHaveRatioProductUnit(productPricing.Id);
    }
  }

  private async ResetHaveRatioProductUnit(Id: bigint) {
    const product = await this.productPricingRepository.findOne({
      relations: {
        ProductUnits: {
          UnitPricing: true,
          ProductUnitRatios1: { ProductUnitPricing2: { UnitPricing: true } },
          ProductUnitRatios2: { ProductUnitPricing1: { UnitPricing: true } },
        },
      },
      order: { ProductUnits: { Ratio: 'ASC' } },
      where: { Id },
    });

    const listF: { Id: bigint[]; Is: boolean }[] = [];

    for (const productUnit of product.ProductUnits) {
      for (const productUnitRatios of productUnit.ProductUnitRatios1) {
        listF.push({
          Id: [
            productUnit.UnitPricing.Id,
            productUnitRatios.ProductUnitPricing2.UnitPricing.Id,
          ],
          Is: productUnitRatios.IsRatio,
        });
      }

      for (const productUnitRatios of productUnit.ProductUnitRatios2) {
        listF.push({
          Id: [
            productUnit.UnitPricing.Id,
            productUnitRatios.ProductUnitPricing1.UnitPricing.Id,
          ],
          Is: productUnitRatios.IsRatio,
        });
      }
    }

    // find all product unit ratio with Id
    const findAllProductUnitRatio =
      await this.productUnitRatioPricingRepository.find({
        where: [
          {
            ProductUnitPricing1: { ProductPricing: { Id: product.Id } },
          },
          {
            ProductUnitPricing2: { ProductPricing: { Id: product.Id } },
          },
        ],
        relations: {
          ProductUnitPricing1: { ProductPricing: true },
          ProductUnitPricing2: { ProductPricing: true },
        },
      });

    const cleanList = this.RemoveDuplicatePairs(listF);

    for (const productItem of findAllProductUnitRatio) {
      await this.productUnitRatioPricingRepository.delete({
        Id: productItem.Id,
      });
    }

    const allUnitIds: bigint[] = [];
    for (const productItem of product.ProductUnits) {
      allUnitIds.push(productItem.UnitPricing.Id);
    }

    const allPossiblePairs: bigint[][] = [];
    for (let i = 0; i < allUnitIds.length; i++) {
      for (let j = i + 1; j < allUnitIds.length; j++) {
        const pair = [allUnitIds[i], allUnitIds[j]];
        allPossiblePairs.push(pair);
      }
    }

    const existingPairs = cleanList.map((item) =>
      JSON.stringify(item.Id.sort()),
    );

    for (const pair of allPossiblePairs) {
      const sortedPair = [...pair].sort();
      const pairString = JSON.stringify(sortedPair);

      if (!existingPairs.includes(pairString)) {
        cleanList.push({
          Id: pair,
          Is: false,
        });
      }
    }

    const product2 = await this.productPricingRepository.findOne({
      where: { Id },
    });

    for (const clean of cleanList) {
      const findUnitPricing1 = await this.unitPricingRepository.findOne({
        where: { Id: clean.Id[0] },
      });

      const findUnitPricing2 = await this.unitPricingRepository.findOne({
        where: { Id: clean.Id[1] },
      });

      const findProductUnit1 = await this.productUnitPricingRepository.findOne({
        where: {
          ProductPricing: product2,
          UnitPricing: findUnitPricing1,
        },
      });

      const findProductUnit2 = await this.productUnitPricingRepository.findOne({
        where: {
          ProductPricing: product2,
          UnitPricing: findUnitPricing2,
        },
      });

      if (findProductUnit1 && findProductUnit2) {
        const newpur = this.productUnitRatioPricingRepository.create({
          IsRatio: clean.Is,
          ProductUnitPricing1: findProductUnit1,
          ProductUnitPricing2: findProductUnit2,
        });

        await this.productUnitRatioPricingRepository.save(newpur);
      }
    }
  }

  private RemoveDuplicatePairs(arr: { Id: bigint[]; Is: boolean }[]) {
    const seen = new Set();
    const result: { Id: bigint[]; Is: boolean }[] = [];

    for (const item of arr) {
      const sortedIds = [...item.Id].sort();
      const key = sortedIds.join('|');

      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }

    return result;
  }

  //#endregion

  //#region product

  async ReadProductPricingList(
    Param: ReadProductPricingListModel,
  ): Promise<ReadProductPricingListViewModel> {
    await this.CheckHaveRatioProductUnit();

    const listProduct = await this.productMenuRepository.find({
      relations: { CategoryProductMenu: true },
    });

    const fistFactor = await this.factorRepository.findOne({
      where: {},
      order: { CreateDate: 'ASC' },
    });

    const fistDateFactor = fistFactor.CreateDate;
    const dateNow = new Date();

    const diffDays = moment(dateNow).diff(
      moment(fistDateFactor),
      'days',
    ) as number;

    const listFactor = await this.factorItemRepository.find({
      // select: { Guid: true },
    });

    //#region pricing product

    const findProductPricing = await this.productPricingRepository.find({
      relations: {
        ProductUnits: {
          UnitPricing: true,
          ProductUnitDetailParents: {
            ChildProductUnitDetail: { ProductPricing: true, UnitPricing: true },
            ParentProductUnitDetail: {
              ProductPricing: true,
              UnitPricing: true,
            },
          },
        },
      },
      order: {
        Name: 'ASC',
        ProductUnits: {
          UnitPricing: { Name: 'ASC' },
          ProductUnitDetailParents: {
            ChildProductUnitDetail: { ProductPricing: { Name: 'ASC' } },
          },
        },
      },
    });

    const unitLookup: Map<
      string,
      { Product: ProductPricingEntity; Unit: ProductUnitPricingEntity }
    > = new Map();

    for (const itemProductPricing of findProductPricing) {
      for (const itemProductUnit of itemProductPricing.ProductUnits) {
        unitLookup.set(itemProductUnit.Guid, {
          Product: itemProductPricing,
          Unit: itemProductUnit,
        });
      }
    }

    const GetBaseUnitCost = (productPricing: string): number => {
      const entry = unitLookup.get(productPricing);
      if (!entry) return 0;

      const { Product, Unit } = entry;

      const directCostPerBase = (Product.BuyPrice || 0) / Unit.Ratio;

      let componentsCostTotal = 0;

      if (Unit.ProductUnitDetailParents?.length > 0) {
        componentsCostTotal = Unit.ProductUnitDetailParents.reduce(
          (sum, detail) => {
            return (
              sum +
              GetBaseUnitCost(detail.ChildProductUnitDetail.Guid) *
                detail.Amount
            );
          },
          0,
        );
      }

      return (
        (directCostPerBase * Unit.Ratio + componentsCostTotal) / Unit.Ratio
      );
    };

    const pricingProduct = findProductPricing.map((ProductPricing) => ({
      Guid: ProductPricing.Guid,
      Name: ProductPricing.Name,
      BuyPrice: ProductPricing.BuyPrice,
      ProductUnit: ProductPricing.ProductUnits.map((item) => {
        const currentPricePerBase = GetBaseUnitCost(item.Guid);

        const details = item.ProductUnitDetailParents.map((detail) => {
          const childUnitId = detail.ChildProductUnitDetail.Guid;
          const childRatio = detail.ChildProductUnitDetail.Ratio || 1;

          const pricePerBaseUnit = GetBaseUnitCost(childUnitId);
          const childUnitTotalCost = pricePerBaseUnit * childRatio;

          return {
            Guid: detail.Guid,
            ProductName: detail.ChildProductUnitDetail.ProductPricing.Name,
            UnitName: detail.ChildProductUnitDetail.UnitPricing.Name,
            Amount: detail.Amount,
            BuyPrice: detail.ChildProductUnitDetail.ProductPricing.BuyPrice,
            Ratio: childRatio,
            PriceByUnit: pricePerBaseUnit,
            TotalPriceByUnit: pricePerBaseUnit * detail.Amount,
            ChildProductUnitId: detail.ChildProductUnitDetail.Guid,
            ParentProductUnitId: detail.ParentProductUnitDetail.Guid,
          };
        });

        return {
          ProductInMenu: item.ProductMenuId
            ? listProduct.find(
                (itemList) => itemList.Guid === item.ProductMenuId,
              ) || null
            : null,
          ProductMenuId: item.ProductMenuId,
          ProductUnitId: item.Guid,
          UnitName: item.UnitPricing.Name,
          UnitId: item.UnitPricing.Guid,
          Ratio: item.Ratio,
          Profit: item.Profit,
          SumDetail: details.reduce((sum, d) => sum + d.TotalPriceByUnit, 0),
          PriceByUnit: currentPricePerBase,
          TotalPriceForRatio: currentPricePerBase * item.Ratio + item.Profit,
          CountSell: item.CountSell,
          PriceByTotalPrice:
            (currentPricePerBase * item.Ratio + item.Profit) / item.Ratio,
          Detail: details,
        };
      }),
    }));

    //#endregion

    //#region cost

    const findCostPricing = await this.costPricingRepository.find();

    const sumCost = findCostPricing
      .map((item) => item.Price)
      .reduce((a, b) => a + (b || 0), 0);

    const AverageCost =
      (findCostPricing
        .map((item) => item.Price)
        .reduce((a, b) => a + (b || 0), 0) *
        12) /
      365.25;

    //#endregion

    //#region menu product

    const listProductInMenu = pricingProduct
      .map((item1) =>
        item1.ProductUnit.map((item2) => {
          if (item2.ProductInMenu) {
            const CountSell = listFactor.filter(
              (item3) => item3.ProductMenuId === item2.ProductMenuId,
            ).length;

            return {
              ProductIdInMenu: item2.ProductInMenu.Guid,
              ProductCategoryIdInMenu:
                item2.ProductInMenu.CategoryProductMenu.Name,
              ProductNumberIdInMenu: item2.ProductInMenu.Guid,
              NameInMenu: item2.ProductInMenu.Name,
              PriceInMenu: item2.ProductInMenu.Price,
              ProductIdInPricing: item1.Guid,
              NameInPricing: item1.Name,
              SumDetailPricing: item2.SumDetail,
              ProfitPricing: item2.Profit,
              PriceInPricing: item2.TotalPriceForRatio,
              ProductUnitId: item2.ProductUnitId,
              UnitPricing: item2.UnitName,
              RatioPricing: item2.Ratio,
              CountSell,
              AverageCountSell: CountSell / diffDays,
              Balance: 0,
            };
          }
        }),
      )
      .flat()
      .filter((item) => item);

    const sumCountSell = listProductInMenu
      .map((item) => item.CountSell)
      .reduce((a, b) => a + (b || 0), 0);

    const averageCountSell =
      listProductInMenu
        .map((item) => item.CountSell)
        .reduce((a, b) => a + (b || 0), 0) / diffDays;

    const base_balance =
      AverageCost / averageCountSell === Infinity
        ? 0
        : AverageCost / averageCountSell;

    listProductInMenu.forEach((item) => {
      item.Balance = (item.ProfitPricing - base_balance) * item.CountSell;
    });

    //#endregion

    pricingProduct.map((val) => {
      val.ProductUnit.map((value) => {
        // console.log(value);
        // if (value.ProductMenuId == null || value.ProductMenuId == undefined)
        // console.log(value);
      });
    });

    console.log(1);

    return {
      DayToWork: diffDays,
      Cost: {
        SumCost: sumCost,
        AverageCost,
        ItemCost: base_balance,
        List: findCostPricing.map((val) => ({
          Id: val.Guid,
          Name: val.Name,
          Price: val.Price,
        })),
      },
      ProductInMenu: {
        SumCountSell: sumCountSell,
        AverageCountSell: averageCountSell,
        SumBalance: listProductInMenu
          .map((item) => item.Balance)
          .reduce((a, b) => a + (b || 0), 0),
        List: listProductInMenu,
      },
      ProductInPricing: {
        List: pricingProduct.map((val) => ({
          Id: val.Guid,
          BuyPrice: val.BuyPrice,
          Name: val.Name,
          ProductUnit: val.ProductUnit.map((value) => ({
            ProductMenuId: value.ProductInMenu
              ? value.ProductInMenu.Guid
              : null,
            ProductUnitId: value.ProductUnitId,
            PriceInMenu: value.ProductInMenu ? value.ProductInMenu.Price : null,
            UnitId: value.UnitId,
            UnitName: value.UnitName,
            Ratio: value.Ratio,
            Profit: value.Profit,
            SumDetail: value.SumDetail,
            PriceByUnit: value.PriceByUnit,
            PriceByTotalPrice: value.PriceByTotalPrice,
            TotalPriceForRatio: value.TotalPriceForRatio,
            CountSell: value.CountSell,
            Detail: value.Detail.map((valueDetail) => ({
              Id: valueDetail.Guid,
              ProductName: valueDetail.ProductName,
              UnitName: valueDetail.UnitName,
              Amount: valueDetail.Amount,
              BuyPrice: valueDetail.BuyPrice,
              Ratio: valueDetail.Ratio,
              PriceByUnit: valueDetail.PriceByUnit,
              TotalPriceByUnit: valueDetail.TotalPriceByUnit,
              ChildProductUnitId: valueDetail.ChildProductUnitId,
              ParentProductUnitId: valueDetail.ParentProductUnitId,
            })),
          })),
        })),
      },
    };
  }

  async CreateProductPricing(
    Param: CreateProductPricingModel,
  ): Promise<CreateProductPricingViewModel> {
    const findProductPricing = await this.productPricingRepository.findOne({
      where: { Name: Param.Name },
    });

    if (findProductPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.ProductPricingIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.productPricingRepository.create({
      Name: Param.Name,
      BuyPrice: Param.Buy,
    });

    const modelCreate = await this.productPricingRepository.save(newModel);

    return { Create: true, Id: modelCreate.Guid };
  }

  async UpdateProductPricing(
    Param: UpdateProductPricingModel,
  ): Promise<UpdateProductPricingViewModel> {
    const findProductPricing = await this.productPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findProductPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.ProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const exist = await this.productPricingRepository.exists({
      where: { Guid: Not(Param.Id), Name: Param.Name },
    });

    if (exist) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.ProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.productPricingRepository.update(
      { Guid: Param.Id },
      { Name: Param.Name, BuyPrice: Param.Buy },
    );

    return { Update: res.affected > 0 };
  }

  async DeleteProductPricing(
    Param: DeleteProductPricingModel,
  ): Promise<DeleteProductPricingViewModel> {
    const findProductPricing = await this.productPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findProductPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.ProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.productPricingRepository.delete({ Guid: Param.Id });

    return { Delete: true };
  }

  //#endregion

  //#region Product Unit

  async CreateProductUnitPricing(
    Param: CreateProductUnitPricingModel,
  ): Promise<CreateProductUnitPricingViewModel> {
    const findProductPricing = await this.productPricingRepository.findOne({
      where: { Guid: Param.ProductPricingId },
    });

    const findUnitPricing = await this.unitPricingRepository.findOne({
      where: { Guid: Param.UnitPricingId },
    });

    const productUnit = await this.productUnitPricingRepository.findOne({
      where: {
        ProductPricing: findProductPricing,
        UnitPricing: findUnitPricing,
      },
    });

    if (productUnit) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.productUnitPricingRepository.create({
      CountSell: 0,
      ProductMenuId: Param.ProductMenuId,
      Profit: Param.Profit,
      Ratio: Param.Ratio,
      UnitPricing: findUnitPricing,
      ProductPricing: findProductPricing,
    });

    const modelCreate = await this.productUnitPricingRepository.save(newModel);

    return { Create: true, Id: modelCreate.Guid };
  }

  async UpdateProductUnitPricing(
    Param: UpdateProductUnitPricingModel,
  ): Promise<UpdateProductUnitPricingViewModel> {
    const findProductUnit = await this.productUnitPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    const findProductUnitPricing = await this.unitPricingRepository.findOne({
      where: { Guid: Param.UnitPricingId },
    });

    if (!findProductUnit) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!findProductUnitPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.productUnitPricingRepository.update(
      { Guid: Param.Id },
      {
        Ratio: Param.Ratio,
        ProductMenuId: Param.ProductMenuId === '' ? null : Param.ProductMenuId,
        Profit: Param.Profit,
        UnitPricing: findProductUnitPricing,
      },
    );

    return { Update: res.affected > 0 };
  }

  async DeleteProductUnitPricing(
    Param: DeleteProductUnitPricingModel,
  ): Promise<DeleteProductUnitPricingViewModel> {
    const productUnit = await this.productUnitPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!productUnit) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.productUnitPricingRepository.delete({ Guid: Param.Id });

    return { Delete: true };
  }

  //#endregion

  //#region Product Unit Ratio

  async UpdateProductUnitRatio(
    Param: UpdateProductUnitRatioModel,
  ): Promise<UpdateProductUnitRatioViewModel> {
    const findParentProductUnit1 =
      await this.productUnitPricingRepository.findOne({
        where: { Guid: Param.ProductUnitId1 },
      });

    const findParentProductUnit2 =
      await this.productUnitPricingRepository.findOne({
        where: { Guid: Param.ProductUnitId2 },
      });

    if (!findParentProductUnit1) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!findParentProductUnit2) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findProductUnitRatio =
      await this.productUnitRatioPricingRepository.findOne({
        where: {
          ProductUnitPricing1: findParentProductUnit1,
          ProductUnitPricing2: findParentProductUnit2,
        },
      });

    if (findProductUnitRatio) {
      await this.productUnitRatioPricingRepository.update(
        { Guid: findProductUnitRatio.Guid },
        {
          IsRatio: Param.IsRatio,
        },
      );
    } else {
      const newProductUnitRatio = this.productUnitRatioPricingRepository.create(
        {
          ProductUnitPricing1: findParentProductUnit1,
          ProductUnitPricing2: findParentProductUnit2,
          IsRatio: true,
        },
      );

      await this.productUnitRatioPricingRepository.save(newProductUnitRatio);
    }

    return { Update: true };
  }

  //#endregion

  //#region Detail Pricing Product

  async CreateDetailProductPricing(
    Param: CreateDetailProductPricingModel,
  ): Promise<CreateDetailProductPricingViewModel> {
    if (Param.ParentProductUnitDetailId === Param.ChildProductUnitDetailId) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findParentProductUnitDetail =
      await this.productUnitPricingRepository.findOne({
        where: { Guid: Param.ParentProductUnitDetailId },
      });

    const findChildProductUnitDetail =
      await this.productUnitPricingRepository.findOne({
        where: { Guid: Param.ChildProductUnitDetailId },
      });

    // if (!findChildProductUnitDetail) {
    //   throw new HttpExceptionCustom(
    //     HttpExceptionMessageCustom.CostProductPricingIsExist,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // const exist = await this.productUnitDetailRepository.exists({
    //   where: {
    //     ChildProductUnitDetail: findChildProductUnitDetail,
    //     ParentProductUnitDetail: findParentProductUnitDetail,
    //   },
    // });

    // if (exist) {
    //   throw new HttpExceptionCustom(
    //     HttpExceptionMessageCustom.CostProductPricingIsExist,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const newModel = this.productUnitDetailRepository.create({
      Amount: Param.Amount,
      ChildProductUnitDetail: findChildProductUnitDetail,
      ParentProductUnitDetail: findParentProductUnitDetail,
    });

    const modelCreate = await this.productUnitDetailRepository.save(newModel);

    return { Create: true, Id: modelCreate.Guid };
  }

  async UpdateDetailProductPricing(
    Param: UpdateDetailProductPricingModel,
  ): Promise<UpdateDetailProductPricingViewModel> {
    const findProductUnitDetail =
      await this.productUnitDetailRepository.findOne({
        where: { Guid: Param.Id },
        relations: { ParentProductUnitDetail: true },
      });

    if (!findProductUnitDetail) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      findProductUnitDetail.ParentProductUnitDetail.Guid ===
      Param.ChildProductUnitDetailId
    ) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findChildProductUnitDetail =
      await this.productUnitPricingRepository.findOne({
        where: { Guid: Param.ChildProductUnitDetailId },
      });

    if (!findChildProductUnitDetail) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.productUnitDetailRepository.update(
      { Guid: Param.Id },
      {
        Amount: Param.Amount,
        ChildProductUnitDetail: findChildProductUnitDetail,
      },
    );

    return { Update: true };
  }

  async DeleteDetailProductPricing(
    Param: DeleteDetailProductPricingModel,
  ): Promise<DeleteDetailProductPricingViewModel> {
    const findProductUnitDetail =
      await this.productUnitDetailRepository.findOne({
        where: { Guid: Param.Id },
      });

    if (!findProductUnitDetail) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.productUnitDetailRepository.delete({ Guid: Param.Id });

    return { Delete: true };
  }

  //#endregion

  //#region Cost Product Pricing

  async ReadCostProductPricingList(
    Param: ReadCostProductPricingListModel,
  ): Promise<ReadCostProductPricingListViewModel[]> {
    return (
      await this.costPricingRepository.find({
        select: { Guid: true, Name: true, Price: true },
      })
    ).map((val) => ({ Id: val.Guid, Name: val.Name, Price: val.Price }));
  }

  async ReadCostProductPricingDetail(
    Param: ReadCostProductPricingDetailModel,
  ): Promise<ReadCostProductPricingDetailViewModel> {
    const findCostProductPricing = await this.costPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findCostProductPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      Id: findCostProductPricing.Guid,
      Name: findCostProductPricing.Name,
      Price: findCostProductPricing.Price,
    };
  }

  async CreateCostProductPricing(
    Param: CreateCostProductPricingModel,
  ): Promise<CreateCostProductPricingViewModel> {
    const findCostProductPricing = await this.costPricingRepository.findOne({
      where: { Name: Param.Name },
    });

    if (findCostProductPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.costPricingRepository.create({
      Name: Param.Name,
      Price: Param.Price,
    });

    await this.costPricingRepository.save(newModel);

    return { Create: true };
  }

  async UpdateCostProductPricing(
    Param: UpdateCostProductPricingModel,
  ): Promise<UpdateCostProductPricingViewModel> {
    const findCostProductPricing = await this.costPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findCostProductPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultUpdate = await this.costPricingRepository.update(
      { Guid: Param.Id },
      { Name: Param.Name, Price: Param.Price },
    );

    return { Update: resultUpdate.affected > 0 };
  }

  async DeleteCostProductPricing(
    Param: DeleteCostProductPricingModel,
  ): Promise<DeleteCostProductPricingViewModel> {
    const findCostProductPricing = await this.costPricingRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findCostProductPricing) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.CostProductPricingNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.costPricingRepository.delete({ Guid: Param.Id });

    return { Delete: true };
  }

  //#endregion
}
