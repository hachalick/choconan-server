import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  Between,
  IsNull,
  LessThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { type IAppService } from './Interfaces/App.Service.Interface.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { FactorEntity } from '../../Domain/Entities/Mysql/Factor.Entity.js';
import { FactorItemEntity } from '../../Domain/Entities/Mysql/FactorItem.Entity.js';
import {
  ReadLastVideoCategoryDetailViewModel,
  ReadVideoCategoryDetailViewModel,
  ReadVideoCategoryListViewModel,
  UpdateProgramViewModel,
} from '../../Domain/ViewModels/App.Service.ViewModel.js';
import {
  ReadLastVideoCategoryDetailModel,
  ReadVideoCategoryDetailModel,
  ReadVideoCategoryListModel,
  UpdateProgramModel,
} from '../../Domain/Models/App.Service.Model.js';
import { ProductMenuEntity } from '../../Domain/Entities/Mysql/ProductMenu.Entity.js';
import { HttpExceptionCustom } from '../../Api/Exceptions/HttpExceptionCustom.js';
import { HttpExceptionMessageCustom } from '../../Domain/Constants/HttpExceptionMessageCustom.js';

@Injectable()
export class AppService implements IAppService {
  constructor(
    @InjectRepository(FactorEntity, ConnectionNameMysql.global)
    private readonly factorRepository: Repository<FactorEntity>,

    @InjectRepository(FactorItemEntity, ConnectionNameMysql.global)
    private readonly factorItemRepository: Repository<FactorItemEntity>,

    @InjectRepository(ProductMenuEntity, ConnectionNameMysql.global)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
  ) {}

  async ReadVideoCategoryList(
    Param: ReadVideoCategoryListModel,
  ): Promise<ReadVideoCategoryListViewModel[]> {
    return [
      {
        Id: '0c77d935-28ad-4901-8e70-52a6d150f501',
        Category: 'aparat',
        Videos: [
          {
            Id: '3ee7ddd7-2afe-4c83-9c69-9d92a53d5300',
            Name: 'رول دارچینی کافه شوکونان',
            IFram:
              'https://www.aparat.com/video/video/embed/videohash/bpm65f9/vt/frame',
          },
        ],
      },
    ];
  }

  async ReadVideoCategoryDetail(
    Param: ReadVideoCategoryDetailModel,
  ): Promise<ReadVideoCategoryDetailViewModel> {
    if (Param.Id !== '0c77d935-28ad-4901-8e70-52a6d150f501') {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.VideoCategoryNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      Id: '0c77d935-28ad-4901-8e70-52a6d150f501',
      Category: 'aparat',
      Videos: [
        {
          Id: '3ee7ddd7-2afe-4c83-9c69-9d92a53d5300',
          Name: 'رول دارچینی کافه شوکونان',
          IFram:
            'https://www.aparat.com/video/video/embed/videohash/bpm65f9/vt/frame',
        },
      ],
    };
  }

  async ReadLastVideoCategoryDetail(
    Param: ReadLastVideoCategoryDetailModel,
  ): Promise<ReadLastVideoCategoryDetailViewModel> {
    if (Param.Id !== '0c77d935-28ad-4901-8e70-52a6d150f501') {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.VideoCategoryNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      Id: '3ee7ddd7-2afe-4c83-9c69-9d92a53d5300',
      Name: 'رول دارچینی کافه شوکونان',
      IFram:
        'https://www.aparat.com/video/video/embed/videohash/bpm65f9/vt/frame',
    };
  }

  private async LinkProductIdFactorItemsToMenu() {
    const listProductIdFactorItems = await this.factorItemRepository
      .createQueryBuilder('factor_item')
      .select('DISTINCT factor_item.ProductMenuId', 'ProductMenuId')
      .where('factor_item.ProductMenuId IS NOT NULL')
      .getRawMany();

    for (const item of listProductIdFactorItems) {
      const productMenuId = item.ProductMenuId;

      if (!productMenuId) continue;

      const exist = await this.productMenuRepository.exists({
        where: { Guid: productMenuId },
      });

      if (!exist) {
        await this.factorItemRepository.update(
          { ProductMenuId: productMenuId },
          { ProductMenuId: '' },
        );
      }
    }

    const listFactorItemBefore = await this.factorItemRepository.find({
      where: [{ ProductMenuId: IsNull() }, { ProductMenuId: '' }],
    });

    for (const itemFactorItem of listFactorItemBefore) {
      const product = await this.productMenuRepository.findOne({
        where: { Name: itemFactorItem.ProductName },
      });

      if (product) {
        await this.factorItemRepository.update(
          { Id: itemFactorItem.Id },
          {
            ProductMenuId: product.Guid,
          },
        );
      } else if (
        itemFactorItem.ProductName === '' ||
        itemFactorItem.ProductCount === 0 ||
        itemFactorItem.ProductPrice === 0
      ) {
        await this.factorItemRepository.delete({ Id: itemFactorItem.Id });
      }
    }

    const listFactorItemAfter = await this.factorItemRepository.find({
      where: [{ ProductMenuId: IsNull() }, { ProductMenuId: '' }],
    });

    return listFactorItemAfter;
  }

  private async SortAllFactorNumber() {
    const firstFactor = await this.factorRepository.findOne({
      order: { FactorDate: 'ASC' },
      where: {},
    });

    if (!firstFactor) throw new Error();

    const firstDate = new Date(firstFactor.FactorDate);
    const startFirstDay = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      firstDate.getDate(),
      0,
      0,
      0,
      0,
    );

    const now = new Date();
    const startToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );

    const currentDay = new Date(startFirstDay);

    while (currentDay.getTime() <= startToday.getTime()) {
      const nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);

      const listFactor = await this.factorRepository.find({
        where: {
          FactorDate: And(MoreThanOrEqual(currentDay), LessThan(nextDay)),
        },
        order: { FactorDate: 'ASC' },
      });

      console.log(
        `d ${currentDay.toISOString().slice(0, 10)}: total f ${listFactor.length}`,
      );

      let counter = 1;
      const updates = listFactor.map((factor) => ({
        Id: factor.Id,
        FactorNumber: counter++,
      }));

      for (const update of updates) {
        await this.factorRepository.update(
          { Id: update.Id },
          { FactorNumber: update.FactorNumber },
        );
      }

      currentDay.setDate(currentDay.getDate() + 1);
    }
  }

  // private async MoveDataFromOldToNew() {
  //   //#region move

  //   //#region present factor

  //   const listPresentFactor = await this.presentOrderTableOldRepository.find(
  //     {},
  //   );

  //   for (const item of listPresentFactor) {
  //     const existModel = await this.presentFactorRepository.exists({
  //       where: { Guid: item.present_order_table_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.presentFactorRepository.create({
  //       Guid: item.present_order_table_id,
  //       Location: `میز ${item.table}`,
  //     });

  //     await this.costPricingRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('present factor moved');

  //   //#region cost

  //   const listOldCost = await this.costPricingOldRepository.find();

  //   for (const item of listOldCost) {
  //     const existModel = await this.costPricingRepository.exists({
  //       where: { Guid: item.cost_pricing_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.costPricingRepository.create({
  //       Guid: item.cost_pricing_id,
  //       Name: item.name,
  //       Price: item.price * 1000,
  //     });

  //     await this.costPricingRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('cost moved');

  //   //#region file

  //   const listOldImage = await this.imageOldRepository.find();

  //   for (const item of listOldImage) {
  //     const existModel = await this.fileRepository.exists({
  //       where: { Guid: item.image_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.fileRepository.create({
  //       Guid: item.image_id,
  //       Direction: item.dir,
  //     });

  //     await this.fileRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('file moved');

  //   //#region otp

  //   const listOldOtp = await this.otpOldRepository.find();

  //   for (const item of listOldOtp) {
  //     const existModel = await this.otpRepository.exists({
  //       where: { Guid: item.otp_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.otpRepository.create({
  //       Guid: item.otp_id,
  //       NationalCode: item.national_code,
  //       Phone: item.phone,
  //       Otp: item.otp,
  //       CreateDate: item.create_at,
  //       UpdateDate: item.update_at,
  //       IsUse: item.use,
  //     });

  //     await this.otpRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('otp moved');

  //   //#region user

  //   const listOldUser = await this.userOldRepository.find({});

  //   for (const item of listOldUser) {
  //     const existModel = await this.userRepository.exists({
  //       where: { Guid: item.user_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.userRepository.create({
  //       CreateDate: item.create_at,
  //       Family: item.family,
  //       Guid: item.user_id,
  //       Name: item.name,
  //       NationalCode: item.national_code,
  //       Password: item.password,
  //       Phone: item.phone,
  //       Profile: item.profile,
  //       UpdateDate: item.update_at,
  //     });

  //     await this.userRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('user moved');

  //   //#region role

  //   const listOldRole = await this.roleOldRepository.find({});

  //   for (const item of listOldRole) {
  //     const existModel = await this.roleRepository.exists({
  //       where: { Guid: item.role_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.roleRepository.create({
  //       Guid: item.role_id,
  //       Name: item.role_name,
  //     });

  //     await this.roleRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('role moved');

  //   //#region role user

  //   const listOldRoleUser = await this.roleUserOldRepository.find({
  //     relations: { role: true, user: true },
  //   });

  //   for (const item of listOldRoleUser) {
  //     const existModel = await this.roleUserRepository.exists({
  //       where: { Guid: item.role_user_id },
  //     });
  //     if (existModel) continue;

  //     const roleEntity = await this.roleRepository.findOne({
  //       where: { Guid: item.role.role_id },
  //     });

  //     const userEntity = await this.userRepository.findOne({
  //       where: { Guid: item.user.user_id },
  //     });

  //     const newModel = this.roleUserRepository.create({
  //       Guid: item.role_user_id,
  //       Role: roleEntity,
  //       User: userEntity,
  //     });

  //     await this.roleUserRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('role user moved');

  //   //#region dashboard capability

  //   const listOldDashboardCapability =
  //     await this.dashboardCapabilityOldRepository.find({});

  //   for (const item of listOldDashboardCapability) {
  //     const existModel = await this.dashboardCapabilityRepository.exists({
  //       where: { Guid: item.dashboard_capability_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.dashboardCapabilityRepository.create({
  //       Guid: item.dashboard_capability_id,
  //       Name: item.dashboard_capability,
  //     });

  //     await this.dashboardCapabilityRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('dashboard capability moved');

  //   //#region dashboard capability user

  //   const listOldDashboardCapabilityUser =
  //     await this.dashboardCapabilityUserOldRepository.find({
  //       relations: { dashboard_capability: true, user: true },
  //     });

  //   for (const item of listOldDashboardCapabilityUser) {
  //     const existModel = await this.dashboardCapabilityUserRepository.exists({
  //       where: { Guid: item.dashboard_capability_id },
  //     });
  //     if (existModel) continue;

  //     const userEntity = await this.userRepository.findOne({
  //       where: { Guid: item.user.user_id },
  //     });

  //     const dashboardCapabilityEntity =
  //       await this.dashboardCapabilityRepository.findOne({
  //         where: { Guid: item.dashboard_capability.dashboard_capability_id },
  //       });

  //     const newModel = this.dashboardCapabilityUserRepository.create({
  //       Guid: item.dashboard_capability_id,
  //       DashboardCapability: dashboardCapabilityEntity,
  //       User: userEntity,
  //     });

  //     await this.dashboardCapabilityUserRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('dashboard capability user moved');

  //   //#region factor

  //   const listOldFactor = await this.factorOldRepository.find({});

  //   for (const item of listOldFactor) {
  //     const existModel = await this.factorRepository.exists({
  //       where: { Guid: item.factor_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.factorRepository.create({
  //       CreateDate: item.create_at,
  //       FactorDate: item.create_at,
  //       UpdateDate: item.update_at,
  //       CustomerMobile: item.customer_mobile,
  //       FactorNumber: item.factor_number,
  //       Guid: item.factor_id,
  //       IsPay: item.pay_status,
  //       Tax: item.tax,
  //       Location: item.location,
  //     });

  //     await this.factorRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('factor moved');

  //   //#region factor items

  //   const listOldFactorItem = await this.factorItemOldRepository.find({
  //     relations: { factorEntity: true },
  //   });

  //   for (const item of listOldFactorItem) {
  //     const existModel = await this.factorItemRepository.exists({
  //       where: { Guid: item.factor_item_id },
  //     });
  //     if (existModel) continue;

  //     const factorEntity = await this.factorRepository.findOne({
  //       where: { Guid: item.factorEntity.factor_id },
  //     });

  //     const newModel = this.factorItemRepository.create({
  //       Guid: item.factor_item_id,
  //       ProductMenuId: item.product_menu_id,
  //       ProductCount: item.product_count,
  //       ProductDiscount: item.product_discount * 1000,
  //       ProductName: item.product_name,
  //       ProductPrice: item.product_price * 1000,
  //       Factor: factorEntity,
  //     });

  //     await this.factorItemRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('factor items moved');

  //   //#region unit pricing

  //   const listOldUnitPricing = await this.unitOldRepository.find({});

  //   for (const item of listOldUnitPricing) {
  //     const existModel = await this.unitPricingRepository.exists({
  //       where: { Guid: item.unit_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.unitPricingRepository.create({
  //       Guid: item.unit_id,
  //       Name: item.unit_name,
  //     });

  //     await this.unitPricingRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('unit pricing moved');

  //   //#region product pricing

  //   const listOldProductPricing = await this.productPricingOldRepository.find(
  //     {},
  //   );

  //   for (const item of listOldProductPricing) {
  //     const existModel = await this.productPricingRepository.exists({
  //       where: { Guid: item.product_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.productPricingRepository.create({
  //       Guid: item.product_id,
  //       BuyPrice: item.buy * 1000,
  //       Name: item.name,
  //     });

  //     await this.productPricingRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('product pricing moved');

  //   //#region product unit pricing

  //   const listOldProductUnitPricing = await this.productUnitOldRepository.find({
  //     relations: {
  //       product: true,
  //       unit: true,
  //     },
  //   });

  //   for (const item of listOldProductUnitPricing) {
  //     const existModel = await this.productUnitPricingRepository.exists({
  //       where: { Guid: item.product_unit_id },
  //     });
  //     if (existModel) continue;

  //     const unitEntity = await this.unitPricingRepository.findOne({
  //       where: { Guid: item.unit.unit_id },
  //     });

  //     const productEntity = await this.productPricingRepository.findOne({
  //       where: { Guid: item.product.product_id },
  //     });

  //     const newModel = this.productUnitPricingRepository.create({
  //       CountSell: item.count_sell,
  //       Guid: item.product_unit_id,
  //       ProductMenuId: item.product_menu_id,
  //       Profit: item.profit * 1000,
  //       Ratio: item.ratio,
  //       ProductPricing: productEntity,
  //       UnitPricing: unitEntity,
  //     });

  //     await this.productUnitPricingRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('product unit pricing moved');

  //   //#region product unit ratio pricing

  //   const listOldProductUnitRatioPricing =
  //     await this.productUnitRatioOldRepository.find({
  //       relations: { ParentProductUnit1: true, ParentProductUnit2: true },
  //     });

  //   for (const item of listOldProductUnitRatioPricing) {
  //     const existModel = await this.productUnitRatioRepository.exists({
  //       where: { Guid: item.product_unit_ratio_id },
  //     });
  //     if (existModel) continue;

  //     const productUnitPricing1 =
  //       await this.productUnitPricingRepository.findOne({
  //         where: { Guid: item.ParentProductUnit1.product_unit_id },
  //       });

  //     const productUnitPricing2 =
  //       await this.productUnitPricingRepository.findOne({
  //         where: { Guid: item.ParentProductUnit2.product_unit_id },
  //       });

  //     const newModel = this.productUnitRatioRepository.create({
  //       Guid: item.product_unit_ratio_id,
  //       IsRatio: item.is_ratio,
  //       ProductUnitPricing1: productUnitPricing1,
  //       ProductUnitPricing2: productUnitPricing2,
  //     });

  //     await this.productUnitRatioRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('product unit ratio pricing moved');

  //   //#region product unit detail pricing

  //   const listOldProductUnitDetailPricing =
  //     await this.productUnitDetailOldRepository.find({
  //       relations: {
  //         ParentProductUnitDetail: true,
  //         ChildProductUnitDetail: true,
  //       },
  //     });

  //   for (const item of listOldProductUnitDetailPricing) {
  //     const existModel = await this.productUnitDetailRepository.exists({
  //       where: { Guid: item.product_unit_detail_id },
  //     });
  //     if (existModel) continue;

  //     const ChildProductUnitPricing =
  //       await this.productUnitPricingRepository.findOne({
  //         where: { Guid: item.ChildProductUnitDetail.product_unit_id },
  //       });

  //     const ParentProductUnitPricing =
  //       await this.productUnitPricingRepository.findOne({
  //         where: { Guid: item.ParentProductUnitDetail.product_unit_id },
  //       });

  //     const newModel = this.productUnitDetailRepository.create({
  //       Guid: item.product_unit_detail_id,
  //       Amount: item.amount,
  //       ParentProductUnitDetail: ParentProductUnitPricing,
  //       ChildProductUnitDetail: ChildProductUnitPricing,
  //     });

  //     await this.productUnitDetailRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('product unit detail pricing moved');

  //   //#region category product menu

  //   const listOldCategoryProductMenu =
  //     await this.categoryProductMenuOldRepository.find({});

  //   for (const item of listOldCategoryProductMenu) {
  //     const existModel = await this.categoryProductMenuRepository.exists({
  //       where: { Guid: item.category_product_id },
  //     });
  //     if (existModel) continue;

  //     const newModel = this.categoryProductMenuRepository.create({
  //       Guid: item.category_product_id,
  //       Icon: item.icon,
  //       Name: item.category,
  //       Description: '',
  //       IsShowMenu: true,
  //       MetaTitle: '',
  //       MetaDescription: '',
  //     });

  //     await this.categoryProductMenuRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('category product menu moved');

  //   //#region product menu

  //   const listOldProductMenu = await this.productMenuOldRepository.find({
  //     relations: { categoryProductMenu: true },
  //   });

  //   for (const item of listOldProductMenu) {
  //     const existModel = await this.productMenuRepository.exists({
  //       where: { Guid: item.product_id },
  //     });
  //     if (existModel) continue;

  //     const categoryEntity = await this.categoryProductMenuRepository.findOne({
  //       where: { Guid: item.categoryProductMenu.category_product_id },
  //     });

  //     const newModel = this.productMenuRepository.create({
  //       CategoryProductMenu: categoryEntity,
  //       Guid: item.product_id,
  //       Name: item.name,
  //       Description: '',
  //       IsShowMenu: item.available,
  //       MetaDescription: item.meta_description,
  //       MetaTitle: item.meta_title,
  //       SnapId: item.snap,
  //       TapsiId: item.tapsi,
  //       Waiting: item.waiting,
  //       Price: item.price * 1000,
  //       SrcImage: item.src,
  //     });

  //     await this.productMenuRepository.save(newModel);
  //   }

  //   //#endregion

  //   console.log('product menu moved');

  //   //#endregion

  //   //--------------------------------------

  //   //#region remove

  //   //#region present factor

  //   for (const item of listPresentFactor) {
  //     const existModel = await this.presentOrderTableOldRepository.exists({
  //       where: { present_order_table_id: item.present_order_table_id },
  //     });
  //     if (!existModel) continue;

  //     await this.presentOrderTableOldRepository.delete({
  //       present_order_table_id: item.present_order_table_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('present factor removed');

  //   //#region cost

  //   for (const item of listOldCost) {
  //     const existModel = await this.costPricingOldRepository.exists({
  //       where: { cost_pricing_id: item.cost_pricing_id },
  //     });
  //     if (!existModel) continue;

  //     await this.costPricingOldRepository.delete({
  //       cost_pricing_id: item.cost_pricing_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('cost removed');

  //   //#region file

  //   for (const item of listOldImage) {
  //     const existModel = await this.imageOldRepository.exists({
  //       where: { image_id: item.image_id },
  //     });
  //     if (!existModel) continue;

  //     await this.imageOldRepository.delete({ image_id: item.image_id });
  //   }

  //   //#endregion

  //   console.log('file removed');

  //   //#region otp

  //   for (const item of listOldOtp) {
  //     const existModel = await this.otpOldRepository.exists({
  //       where: { otp_id: item.otp_id },
  //     });
  //     if (!existModel) continue;

  //     await this.otpOldRepository.delete({ otp_id: item.otp_id });
  //   }

  //   //#endregion

  //   console.log('otp removed');

  //   //#region factor items

  //   for (const item of listOldFactorItem) {
  //     const existModel = await this.factorItemOldRepository.exists({
  //       where: { factor_item_id: item.factor_item_id },
  //     });
  //     if (!existModel) continue;

  //     await this.factorItemOldRepository.delete({
  //       factor_item_id: item.factor_item_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('factor items removed');

  //   //#region factor

  //   for (const item of listOldFactor) {
  //     const existModel = await this.factorOldRepository.exists({
  //       where: { factor_id: item.factor_id },
  //     });
  //     if (!existModel) continue;

  //     await this.factorOldRepository.delete({ factor_id: item.factor_id });
  //   }

  //   //#endregion

  //   console.log('factor removed');

  //   //#region product menu

  //   await this.contentEconomicPackageOldRepository.deleteAll();
  //   await this.economicPackageOldRepository.deleteAll();

  //   for (const item of listOldProductMenu) {
  //     const existModel = await this.productMenuOldRepository.exists({
  //       where: { product_id: item.product_id },
  //     });
  //     if (!existModel) continue;

  //     await this.productMenuOldRepository.delete({
  //       product_id: item.product_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('product menu removed');

  //   //#region category product menu

  //   for (const item of listOldCategoryProductMenu) {
  //     const existModel = await this.categoryProductMenuOldRepository.exists({
  //       where: { category_product_id: item.category_product_id },
  //     });
  //     if (!existModel) continue;

  //     await this.categoryProductMenuOldRepository.delete({
  //       category_product_id: item.category_product_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('category product menu removed');

  //   //#region user

  //   for (const item of listOldUser) {
  //     const existModel = await this.userOldRepository.exists({
  //       where: { user_id: item.user_id },
  //     });
  //     if (!existModel) continue;

  //     await this.userOldRepository.delete({ user_id: item.user_id });
  //   }

  //   //#endregion

  //   console.log('user removed');

  //   //#region role

  //   for (const item of listOldRole) {
  //     const existModel = await this.roleOldRepository.exists({
  //       where: { role_id: item.role_id },
  //     });
  //     if (!existModel) continue;

  //     await this.roleOldRepository.delete({ role_id: item.role_id });
  //   }

  //   //#endregion

  //   console.log('role removed');

  //   //#region product unit detail pricing

  //   for (const item of listOldProductUnitDetailPricing) {
  //     const existModel = await this.productUnitDetailOldRepository.exists({
  //       where: { product_unit_detail_id: item.product_unit_detail_id },
  //     });
  //     if (!existModel) continue;

  //     await this.productUnitDetailOldRepository.delete({
  //       product_unit_detail_id: item.product_unit_detail_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('product unit detail pricing removed');

  //   //#region product unit ratio pricing

  //   for (const item of listOldProductUnitRatioPricing) {
  //     const existModel = await this.productUnitRatioOldRepository.exists({
  //       where: { product_unit_ratio_id: item.product_unit_ratio_id },
  //     });
  //     if (!existModel) continue;

  //     await this.productUnitRatioOldRepository.delete({
  //       product_unit_ratio_id: item.product_unit_ratio_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('product unit ratio pricing removed');

  //   //#region product unit pricing

  //   for (const item of listOldProductUnitPricing) {
  //     const existModel = await this.productUnitOldRepository.exists({
  //       where: { product_unit_id: item.product_unit_id },
  //     });
  //     if (!existModel) continue;

  //     await this.productUnitOldRepository.delete({
  //       product_unit_id: item.product_unit_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('product unit pricing removed');

  //   //#region unit pricing

  //   for (const item of listOldUnitPricing) {
  //     const existModel = await this.unitOldRepository.exists({
  //       where: { unit_id: item.unit_id },
  //     });
  //     if (!existModel) continue;

  //     await this.unitOldRepository.delete({ unit_id: item.unit_id });
  //   }

  //   //#endregion

  //   console.log('unit pricing removed');

  //   //#region product pricing

  //   for (const item of listOldProductPricing) {
  //     const existModel = await this.productPricingOldRepository.exists({
  //       where: { product_id: item.product_id },
  //     });
  //     if (!existModel) continue;

  //     await this.productPricingOldRepository.delete({
  //       product_id: item.product_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('product pricing removed');

  //   //#region role user

  //   for (const item of listOldRoleUser) {
  //     const existModel = await this.roleUserOldRepository.exists({
  //       where: { role_user_id: item.role_user_id },
  //     });
  //     if (!existModel) continue;

  //     await this.roleUserOldRepository.delete({
  //       role_user_id: item.role_user_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('role user removed');

  //   //#region dashboard capability user

  //   for (const item of listOldDashboardCapabilityUser) {
  //     const existModel = await this.dashboardCapabilityUserOldRepository.exists(
  //       {
  //         where: { dashboard_capability_id: item.dashboard_capability_id },
  //       },
  //     );
  //     if (!existModel) continue;

  //     await this.dashboardCapabilityUserOldRepository.delete({
  //       dashboard_capability_id: item.dashboard_capability_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('dashboard capability user removed');

  //   //#region dashboard capability

  //   for (const item of listOldDashboardCapability) {
  //     const existModel = await this.dashboardCapabilityOldRepository.exists({
  //       where: { dashboard_capability_id: item.dashboard_capability_id },
  //     });
  //     if (!existModel) continue;

  //     await this.dashboardCapabilityOldRepository.delete({
  //       dashboard_capability_id: item.dashboard_capability_id,
  //     });
  //   }

  //   //#endregion

  //   console.log('dashboard capability removed');

  //   //#endregion
  // }

  async UpdateProgram(
    Param: UpdateProgramModel,
  ): Promise<UpdateProgramViewModel> {
    let res;

    switch (Param.Version) {
      case 1:
        res = await this.LinkProductIdFactorItemsToMenu();
        break;
      case 2:
        res = await this.SortAllFactorNumber();
        break;
      // case 3:
      //   res = await this.MoveDataFromOldToNew();
      //   break;
    }

    return { Update: true, Result: res };
  }
}
