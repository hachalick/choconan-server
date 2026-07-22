import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Raw,
  Repository,
} from 'typeorm';
import moment from 'moment-jalaali';
import { IMenuService } from './Interfaces/Menu.Service.Interface';
import { CategoryProductMenuEntity } from 'src/Domain/Entities/Mysql/CategoryProductMenu.Entity';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { EconomicPackageEntity } from 'src/Domain/Entities/Mysql/EconomicPackage.Entity';
import { ContentEconomicPackageEntity } from 'src/Domain/Entities/Mysql/ContentEconomicPackage.Entity';
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
} from '../../Domain/Models/Menu.Service.Model';
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
} from '../../Domain/ViewModels/Menu.Service.ViewModel';
import { HttpExceptionCustom } from 'src/Api/Exceptions/HttpExceptionCustom';
import { HttpExceptionMessageCustom } from 'src/Share/Constants/HttpExceptionMessageCustom';
import { FactorItemEntity } from 'src/Domain/Entities/Mysql/FactorItem.Entity';

@Injectable()
export class MenuService implements IMenuService {
  constructor(
    @InjectRepository(CategoryProductMenuEntity, ConnectionNameMysql.global)
    private readonly CategoryProductMenuRepository: Repository<CategoryProductMenuEntity>,

    @InjectRepository(ProductMenuEntity, ConnectionNameMysql.global)
    private readonly ProductMenuRepository: Repository<ProductMenuEntity>,

    @InjectRepository(FactorItemEntity, ConnectionNameMysql.global)
    private readonly FactorItemEntityRepository: Repository<FactorItemEntity>,

    @InjectRepository(EconomicPackageEntity, ConnectionNameMysql.global)
    private readonly EconomicPackageRepository: Repository<EconomicPackageEntity>,

    @InjectRepository(ContentEconomicPackageEntity, ConnectionNameMysql.global)
    private readonly ContentEconomicPackageRepository: Repository<ContentEconomicPackageEntity>,
  ) {}

  //#region category menu

  async ReadMenuDetail(
    Param: ReadMenuDetailModel,
  ): Promise<ReadMenuDetailViewModel[]> {
    const res = await this.CategoryProductMenuRepository.find({
      relations: { Products: true },
      order: { Name: 'ASC', Products: { IsShowMenu: 'DESC', Name: 'ASC' } },
    });

    return res.map((cat) => ({
      Id: cat.Guid,
      Icon: cat.Icon,
      Name: cat.Name,
      IsShowMenu: cat.IsShowMenu,
      Products: cat.Products.map((pro) => ({
        Id: pro.Guid,
        IsShowMenu: pro.IsShowMenu,
        SrcImage: pro.SrcImage,
        Name: pro.Name,
        Description: pro.Description,
        Price: pro.Price,
        Waiting: pro.Waiting,
        SnapId: pro.SnapId,
        TapsiId: pro.TapsiId,
      })),
    }));
  }

  async ReadMenuCategoryDetail(
    Param: ReadMenuCategoryDetailModel,
  ): Promise<ReadMenuCategoryDetailViewModel> {
    const res = await this.CategoryProductMenuRepository.findOne({
      relations: { Products: true },
      where: { Guid: Param.Id },
      order: { Name: 'ASC', Products: { IsShowMenu: 'DESC', Name: 'ASC' } },
    });

    if (!res) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      Id: res.Guid,
      Icon: res.Icon,
      Name: res.Name,
      IsShowMenu: res.IsShowMenu,
      MetaTitle: res.MetaTitle,
      Description: res.Description,
      MetaDescription: res.MetaDescription,
      Products: res.Products.map((pro) => ({
        Id: pro.Guid,
        IsShowMenu: pro.IsShowMenu,
        SrcImage: pro.SrcImage,
        Name: pro.Name,
        Description: pro.Description,
        Price: pro.Price,
        Waiting: pro.Waiting,
        SnapId: pro.SnapId,
        TapsiId: pro.TapsiId,
      })),
    };
  }

  async ReadSearchMenuDetail(
    Param: ReadSearchMenuDetailModel,
  ): Promise<ReadSearchMenuDetailViewModel[]> {
    const res = await this.ProductMenuRepository.find({
      relations: { CategoryProductMenu: true },
      where: [
        {
          Name: Raw((alias) => `${alias} LIKE :text`, {
            text: `%${Param.Text}%`,
          }),
        },
        {
          Description: Raw((alias) => `${alias} LIKE :text`, {
            text: `%${Param.Text}%`,
          }),
        },
        {
          MetaTitle: Raw((alias) => `${alias} LIKE :text`, {
            text: `%${Param.Text}%`,
          }),
        },
        {
          MetaDescription: Raw((alias) => `${alias} LIKE :text`, {
            text: `%${Param.Text}%`,
          }),
        },
        {
          CategoryProductMenu: {
            Name: Raw((alias) => `${alias} LIKE :text`, {
              text: `%${Param.Text}%`,
            }),
          },
        },
        {
          CategoryProductMenu: {
            Description: Raw((alias) => `${alias} LIKE :text`, {
              text: `%${Param.Text}%`,
            }),
          },
        },
        {
          CategoryProductMenu: {
            MetaTitle: Raw((alias) => `${alias} LIKE :text`, {
              text: `%${Param.Text}%`,
            }),
          },
        },
        {
          CategoryProductMenu: {
            MetaDescription: Raw((alias) => `${alias} LIKE :text`, {
              text: `%${Param.Text}%`,
            }),
          },
        },
      ],
    });

    return res.map((val) => ({
      Id: val.Guid,
      Description: val.Description,
      IsShowMenu: val.IsShowMenu,
      Name: val.Name,
      Price: val.Price,
      SnapId: val.SnapId,
      SrcImage: val.SrcImage,
      TapsiId: val.TapsiId,
      Waiting: val.Waiting,
    }));
  }

  async CreateMenuCategory(
    Param: CreateMenuCategoryModel,
  ): Promise<CreateMenuCategoryViewModel> {
    const newModel = this.CategoryProductMenuRepository.create({
      Icon: Param.Icon,
      Description: Param.Description,
      MetaDescription: Param.MetaDescription,
      Name: Param.Name,
      MetaTitle: Param.MetaTitle,
      IsShowMenu: Param.IsShowMenu,
    });

    await this.CategoryProductMenuRepository.save(newModel);

    return { Create: true };
  }

  async UpdateMenuCategory(
    Param: UpdateMenuCategoryModel,
  ): Promise<UpdateMenuCategoryViewModel> {
    const find = await this.CategoryProductMenuRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!find) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.CategoryProductMenuRepository.update(
      { Guid: Param.Id },
      {
        Icon: Param.Icon,
        IsShowMenu: Param.IsShowMenu,
        MetaDescription: Param.MetaDescription,
        MetaTitle: Param.MetaTitle,
        Description: Param.Description,
        Name: Param.Name,
      },
    );

    return { Update: res.affected > 0 };
  }

  async DeleteMenuCategory(
    Param: DeleteMenuCategoryModel,
  ): Promise<DeleteMenuCategoryViewModel> {
    const find = await this.CategoryProductMenuRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!find) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.CategoryProductMenuRepository.delete({
      Guid: Param.Id,
    });

    return { Delete: res.affected > 0 };
  }

  //#endregion

  //#region product menu

  async ReadMenuProductDetail(
    Param: ReadMenuProductDetailModel,
  ): Promise<ReadMenuProductDetailViewModel> {
    const res = await this.ProductMenuRepository.findOne({
      where: { Guid: Param.Id },
      relations: { CategoryProductMenu: true },
    });

    if (!res) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      Id: res.Guid,
      CategoryId: res.CategoryProductMenu.Guid,
      CategoryName: res.CategoryProductMenu.Name,
      MetaTitle: res.MetaTitle,
      MetaDescription: res.MetaDescription,
      Description: res.Description,
      IsShowMenu: res.IsShowMenu,
      Name: res.Name,
      Price: res.Price,
      SnapId: res.SnapId,
      SrcImage: res.SrcImage,
      TapsiId: res.TapsiId,
      Waiting: res.Waiting,
    };
  }

  async CreateMenuProduct(
    Param: CreateMenuProductModel,
  ): Promise<CreateMenuProductViewModel> {
    const findCategory = await this.CategoryProductMenuRepository.findOne({
      where: { Guid: Param.CategoryId },
    });

    if (!findCategory) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.ProductMenuRepository.create({
      CategoryProductMenu: findCategory,
      Name: Param.Name,
      Description: Param.Description,
      MetaTitle: Param.MetaTitle,
      MetaDescription: Param.MetaDescription,
      SnapId: Param.SnapId,
      TapsiId: Param.TapsiId,
      Price: Param.Price,
      Waiting: Param.Waiting,
      SrcImage: Param.SrcImage,
      IsShowMenu: Param.IsShowMenu,
    });

    await this.ProductMenuRepository.save(newModel);

    return { Create: true };
  }

  async UpdateMenuProduct(
    Param: UpdateMenuProductModel,
  ): Promise<UpdateMenuProductViewModel> {
    const findCategory = await this.CategoryProductMenuRepository.findOne({
      where: { Guid: Param.CategoryId },
    });

    if (!findCategory) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findProduct = await this.ProductMenuRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findProduct) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.ProductMenuRepository.update(
      { Guid: Param.Id },
      {
        CategoryProductMenu: findCategory,
        Name: Param.Name,
        Description: Param.Description,
        MetaTitle: Param.MetaTitle,
        MetaDescription: Param.MetaDescription,
        SnapId: Param.SnapId,
        TapsiId: Param.TapsiId,
        Price: Param.Price,
        Waiting: Param.Waiting,
        SrcImage: Param.SrcImage,
        IsShowMenu: Param.IsShowMenu,
      },
    );

    return { Update: res.affected > 0 };
  }

  async DeleteMenuProduct(
    Param: DeleteMenuProductModel,
  ): Promise<DeleteMenuProductViewModel> {
    const findProduct = await this.ProductMenuRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findProduct) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.FactorItemEntityRepository.update(
      {
        ProductMenuId: findProduct.Guid,
      },
      { ProductMenuId: '' },
    );

    await this.ProductMenuRepository.delete({
      Guid: Param.Id,
    });

    return { Delete: true };
  }

  //#endregion

  //#region economic package

  async ReadEconomicPackageList(
    Param: ReadEconomicPackageListModel,
  ): Promise<ReadEconomicPackageListViewModel[]> {
    let whereCondition: FindOptionsWhere<EconomicPackageEntity> = {};

    if (Param.IsActiveNow) {
      const currentDate = new Date();

      whereCondition = {
        StartDate: LessThanOrEqual(currentDate),
        EndDate: MoreThanOrEqual(currentDate),
      };
    }

    const res = await this.EconomicPackageRepository.find({
      where: whereCondition,
      relations: { ContentEconomicPackages: { ProductMenu: true } },
    });

    return res.map((pack) => ({
      Id: pack.Guid,
      IsShowMenu: pack.IsShowMenu,
      Price: pack.Price,
      SrcImage: pack.SrcImage,
      Title: pack.Title,
      StartDate: moment(pack.StartDate, 'YYYY-MM-DD').format('jYYYY/jMM/jDD'),
      EndDate: moment(pack.EndDate, 'YYYY-MM-DD').format('jYYYY/jMM/jDD'),
      EconomicPackageItems: pack.ContentEconomicPackages.map((mid) => ({
        Id: mid.ProductMenu.Guid,
        Count: mid.Count,
        IsShowMenu: mid.ProductMenu.IsShowMenu,
        Name: mid.ProductMenu.Name,
        Price: mid.ProductMenu.Price,
        SrcImage: mid.ProductMenu.SrcImage,
      })),
    }));
  }

  async ReadEconomicPackageDetail(
    Param: ReadEconomicPackageDetailModel,
  ): Promise<ReadEconomicPackageDetailViewModel> {
    const findEconomicPackage = await this.EconomicPackageRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findEconomicPackage) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      Id: findEconomicPackage.Guid,
      IsShowMenu: findEconomicPackage.IsShowMenu,
      Price: findEconomicPackage.Price,
      SrcImage: findEconomicPackage.SrcImage,
      Title: findEconomicPackage.Title,
      StartDate: moment(findEconomicPackage.StartDate, 'YYYY-MM-DD').format(
        'jYYYY/jMM/jDD',
      ),
      EndDate: moment(findEconomicPackage.EndDate, 'YYYY-MM-DD').format(
        'jYYYY/jMM/jDD',
      ),
      EconomicPackageItems: findEconomicPackage.ContentEconomicPackages.map(
        (mid) => ({
          Id: mid.ProductMenu.Guid,
          ProductId: mid.ProductMenu.Guid,
          Count: mid.Count,
          IsShowMenu: mid.ProductMenu.IsShowMenu,
          Name: mid.ProductMenu.Name,
          Price: mid.ProductMenu.Price,
          SrcImage: mid.ProductMenu.SrcImage,
        }),
      ),
    };
  }

  async CreateEconomicPackage(
    Param: CreateEconomicPackageModel,
  ): Promise<CreateEconomicPackageViewModel> {
    const newModel = this.EconomicPackageRepository.create({
      Title: Param.Title,
      Price: Param.Price,
      IsShowMenu: Param.IsShowMenu,
      SrcImage: Param.SrcImage,
      StartDate: moment(Param.StartDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      EndDate: moment(Param.EndDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
    });

    await this.EconomicPackageRepository.save(newModel);

    return { Create: true };
  }

  async UpdateEconomicPackage(
    Param: UpdateEconomicPackageModel,
  ): Promise<UpdateEconomicPackageViewModel> {
    const findEconomicPackage = await this.EconomicPackageRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findEconomicPackage) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.EconomicPackageRepository.update(
      { Guid: Param.Id },
      {
        Title: Param.Title,
        Price: Param.Price,
        IsShowMenu: Param.IsShowMenu,
        SrcImage: Param.SrcImage,
        StartDate: moment(Param.StartDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        EndDate: moment(Param.EndDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      },
    );

    return { Update: res.affected > 0 };
  }

  async DeleteEconomicPackage(
    Param: DeleteEconomicPackageModel,
  ): Promise<DeleteEconomicPackageViewModel> {
    const findEconomicPackage = await this.EconomicPackageRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findEconomicPackage) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.EconomicPackageRepository.delete({
      Guid: Param.Id,
    });

    return { Delete: res.affected > 0 };
  }

  //#endregion

  //#region content economic package

  async CreateContentEconomicPackage(
    Param: CreateContentEconomicPackageModel,
  ): Promise<CreateContentEconomicPackageViewModel> {
    const findProductMenu = await this.ProductMenuRepository.findOne({
      where: { Guid: Param.ProductId },
    });

    if (!findProductMenu) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findEconomicPackage = await this.EconomicPackageRepository.findOne({
      where: { Guid: Param.EconomicPackageId },
    });

    if (!findEconomicPackage) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findContent = await this.ContentEconomicPackageRepository.findOne({
      where: {
        EconomicPackage: findEconomicPackage,
        ProductMenu: findProductMenu,
      },
    });

    if (findContent) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.ContentEconomicPackageRepository.create({
      EconomicPackage: findEconomicPackage,
      ProductMenu: findProductMenu,
      Count: Param.Count,
    });

    await this.ContentEconomicPackageRepository.save(newModel);

    return { Create: true };
  }

  async DeleteContentEconomicPackage(
    Param: DeleteContentEconomicPackageModel,
  ): Promise<DeleteContentEconomicPackageViewModel> {
    const findProductMenu = await this.ProductMenuRepository.findOne({
      where: { Guid: Param.ProductId },
    });

    if (!findProductMenu) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findEconomicPackage = await this.EconomicPackageRepository.findOne({
      where: { Guid: Param.EconomicPackageId },
    });

    if (!findEconomicPackage) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findContent = await this.ContentEconomicPackageRepository.findOne({
      where: {
        EconomicPackage: findEconomicPackage,
        ProductMenu: findProductMenu,
      },
    });

    if (!findContent) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.ContentEconomicPackageRepository.delete({
      Guid: findContent.Guid,
    });

    return { Delete: true };
  }

  //#endregion
}
