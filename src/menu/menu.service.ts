import { Injectable } from '@nestjs/common';
import { CategoryProductMenuEntity } from '../modules/entity/mysql/CategoryProduct.entity';
import { ProductMenuEntity } from '../modules/entity/mysql/Product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EconomicPackageEntity } from 'src/modules/entity/mysql/EconomicPackage.entity';
import { ContentEconomicPackageEntity } from 'src/modules/entity/mysql/ContentEconomicPackage.entity';
import * as moment from 'moment-jalaali';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(CategoryProductMenuEntity)
    private readonly categoryProductMenuRepository: Repository<CategoryProductMenuEntity>,
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
    @InjectRepository(EconomicPackageEntity)
    private readonly economicPackageRepository: Repository<EconomicPackageEntity>,
    @InjectRepository(ContentEconomicPackageEntity)
    private readonly contentEconomicPackageRepository: Repository<ContentEconomicPackageEntity>,
  ) {}

  //#region get menu

  async getAllMenu() {
    return await this.categoryProductMenuRepository.find({
      relations: { products: true },
      order: { category: 'ASC', products: { available: 'DESC', id: 'ASC' } },
    });
  }

  async getCategoryMenu({ category }: { category: string }) {
    return await this.categoryProductMenuRepository.findOne({
      relations: { products: true },
      where: { category },
      order: { category: 'ASC', products: { available: 'DESC', id: 'ASC' } },
    });
  }

  async getOneProductMenu({
    category,
    id,
  }: {
    category: string;
    id: number;
  }): Promise<TIdProductMenu> {
    const res = await this.categoryProductMenuRepository.findOne({
      relations: { products: true },
      where: { category, products: [{ id }] },
      order: { category: 'ASC', products: { available: 'DESC', id: 'ASC' } },
    });
    return res.products.pop();
  }

  //#endregion

  //#region search

  async searchProductMenu({
    query,
    weight_meta_title = 1.5,
    weight_meta_description = 1.1,
    weight_name = 1.3,
    weight_description = 1,
  }: {
    query: string;
    weight_meta_title?: number;
    weight_meta_description?: number;
    weight_name?: number;
    weight_description?: number;
  }) {
    const allProductMenu = await this.productMenuRepository.find({
      relations: { categoryProductMenu: true },
    });
    const listSearch: TIdProductsSearchMenu = [];
    for (let i in allProductMenu) {
      const {
        available,
        description,
        id,
        meta_description,
        meta_title,
        name,
        price,
        product_id,
        src,
        waiting,
        categoryProductMenu,
        snap,
        tapsi,
      } = allProductMenu[i];
      const weight_product = {
        meta_title: 0,
        meta_description: 0,
        name: 0,
        description: 0,
      };
      weight_product['meta_title'] = meta_title
        ? [...meta_title.matchAll(new RegExp(`.*${query}.*`, 'g'))].length *
          weight_meta_title
        : 0;
      weight_product['meta_description'] = meta_description
        ? [...meta_description.matchAll(new RegExp(`.*${query}.*`, 'g'))]
            .length * weight_meta_description
        : 0;
      weight_product['name'] = name
        ? [...name.matchAll(new RegExp(`.*${query}.*`, 'g'))].length *
          weight_name
        : 0;
      weight_product['description'] = description
        ? [...description.matchAll(new RegExp(`.*${query}.*`, 'g'))].length *
          weight_description
        : 0;
      const rank =
        weight_product.description +
        weight_product.meta_description +
        weight_product.meta_title +
        weight_product.name;
      rank &&
        listSearch.push({
          rank,
          available,
          description,
          id,
          meta_description,
          meta_title,
          name,
          price,
          product_id,
          src,
          waiting,
          category: categoryProductMenu.category,
          snap,
          tapsi,
        });
    }
    listSearch.sort((a, b) => b.rank - a.rank);
    return listSearch;
  }

  //#endregion

  //#region category menu

  async addCategoryMenu({
    category,
    icon,
  }: {
    category: string;
    icon: string;
  }) {
    const newCategory = this.categoryProductMenuRepository.create({
      category,
      icon,
    });
    const res = await this.categoryProductMenuRepository.save(newCategory);
    return { add: true, category_id: res.category_product_id };
  }

  async updateCategoryMenu({
    category_id,
    category,
    icon,
  }: {
    category_id: string;
    category: string;
    icon: string;
  }) {
    await this.categoryProductMenuRepository.update(
      { category_product_id: category_id },
      { category, icon },
    );
    return { update: true };
  }

  async deleteCategoryMenu({ category_id }: { category_id: string }) {
    const data = await this.categoryProductMenuRepository.delete({
      category_product_id: category_id,
    });
    return { delete: true };
  }

  //#endregion

  //#region product menu

  async addProductMenu({
    description,
    id,
    meta_description,
    name,
    price,
    src,
    waiting,
    available,
    category_id,
    meta_title,
    snap,
    tapsi,
  }: TProductMenu & { category_id: string }) {
    const findCategory = await this.categoryProductMenuRepository.findOne({
      where: { category_product_id: category_id },
    });
    if (!findCategory) return { add: false };
    const newProduct = this.productMenuRepository.create({
      available,
      description,
      id,
      meta_description,
      name,
      price,
      src,
      waiting,
      meta_title,
      categoryProductMenu: findCategory,
      snap,
      tapsi,
    });
    await this.productMenuRepository.save(newProduct);
    return { add: true };
  }

  async updateProductMenu({
    available,
    description,
    id,
    meta_description,
    meta_title,
    name,
    price,
    product_id,
    src,
    waiting,
    snap,
    tapsi,
  }: TProductMenu & { product_id: string }) {
    await this.productMenuRepository.update(
      {
        product_id,
      },
      {
        available,
        description,
        id,
        meta_description,
        meta_title,
        name,
        price,
        src,
        waiting,
        snap,
        tapsi,
      },
    );
    return { update: true };
  }

  async deleteProductMenu({ product_id }: { product_id: string }) {
    await this.productMenuRepository.delete({
      product_id,
    });
    return { delete: true };
  }

  //#endregion

  //#region economic package

  async getOneEconomicPackage({
    economic_package_id,
  }: {
    economic_package_id: string;
  }) {
    const res = await this.economicPackageRepository
      .createQueryBuilder('economicPackage')
      .leftJoinAndSelect(
        'economicPackage.contentEconomicPackage',
        'contentEconomicPackage',
      )
      .leftJoinAndSelect('contentEconomicPackage.productMenu', 'productMenu')
      .where('economicPackage.economic_package_id = :economic_package_id', {
        economic_package_id,
      })
      .getOne();
    res.start_day = moment(res.start_day, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
    res.end_day = moment(res.end_day, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
    return res;
  }

  async getEconomicPackage({ all }: { all?: string | undefined }) {
    if (all === undefined) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      const currentDay = String(currentDate.getDate()).padStart(2, '0');
      const currentHours = currentDate.toTimeString().split(' ')[0];
      const currentNow = `${currentYear}-${currentMonth}-${currentDay}`;
      const res = (
        await this.economicPackageRepository
          .createQueryBuilder('economicPackage')
          .where('economicPackage.start_day <= :currentNow', { currentNow })
          .andWhere('economicPackage.end_day >= :currentNow', { currentNow })
          .andWhere('economicPackage.start_hours <= :currentHours', {
            currentHours,
          })
          .andWhere('economicPackage.end_hours >= :currentHours', {
            currentHours,
          })
          .andWhere('economicPackage.is_active = :is_active', {
            is_active: true,
          })
          .leftJoinAndSelect(
            'economicPackage.contentEconomicPackage',
            'contentEconomicPackage',
          )
          .leftJoinAndSelect(
            'contentEconomicPackage.productMenu',
            'productMenu',
          )
          .getMany()
      ).map((val) => {
        val.start_day = moment(val.start_day, 'YYYY-MM-DD').format(
          'jYYYY/jMM/jDD',
        );
        val.end_day = moment(val.end_day, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
        return {
          ...val,
        };
      });
      console.log(res);
      return res;
    } else if (all === 'a') {
      const res = (
        await this.economicPackageRepository
          .createQueryBuilder('economicPackage')
          .leftJoinAndSelect(
            'economicPackage.contentEconomicPackage',
            'contentEconomicPackage',
          )
          .leftJoinAndSelect(
            'contentEconomicPackage.productMenu',
            'productMenu',
          )
          .getMany()
      ).map((val) => {
        val.start_day = moment(val.start_day, 'YYYY-MM-DD').format(
          'jYYYY/jMM/jDD',
        );
        val.end_day = moment(val.end_day, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
        return {
          ...val,
        };
      });
      return res;
    }
  }

  async addEconomicPackage({
    title,
    src,
    start_day,
    end_day,
    start_hours,
    end_hours,
    price,
    is_active,
  }: TEconomicPackage) {
    start_day = moment(start_day, 'jYYYY/jM/jD').format('YYYY-MM-DD');
    end_day = moment(end_day, 'jYYYY/jM/jD').format('YYYY-MM-DD');
    const newEconomicPackage = this.economicPackageRepository.create({
      end_day,
      end_hours,
      is_active,
      price,
      start_day,
      start_hours,
      title,
      src,
    });
    return await this.economicPackageRepository.save(newEconomicPackage);
  }

  async updateEconomicPackage({
    end_day,
    end_hours,
    is_active,
    price,
    start_day,
    start_hours,
    title,
    economic_package_id,
    src,
  }: TEconomicPackage & { economic_package_id: string }) {
    const findEconomicPackage = this.economicPackageRepository.findOne({
      where: { economic_package_id },
    });
    if (findEconomicPackage) {
      start_day = moment(start_day, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
      end_day = moment(end_day, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
      await this.economicPackageRepository.update(
        { economic_package_id },
        {
          end_day,
          end_hours,
          is_active,
          price,
          start_day,
          start_hours,
          title,
          src,
        },
      );
    }
    return { update: true };
  }

  async deleteEconomicPackage({
    economic_package_id,
  }: {
    economic_package_id: string;
  }) {
    await this.economicPackageRepository.delete({ economic_package_id });
    return { delete: true };
  }

  //#endregion

  //#region content economic package

  async addContentEconomicPackage({
    economic_package_id,
    product_id,
    count,
  }: {
    economic_package_id: string;
    product_id: string;
    count: number;
  }) {
    const productMenu = await this.productMenuRepository.findOne({
      where: { product_id },
    });
    const economicPackage = await this.economicPackageRepository.findOne({
      where: { economic_package_id },
    });
    const findContent = await this.contentEconomicPackageRepository.findOne({
      where: { productMenu, economicPackage },
    });
    if (!findContent) {
      const newContentEconomicPackage =
        this.contentEconomicPackageRepository.create({
          economicPackage,
          productMenu,
          count,
        });
      const res = await this.contentEconomicPackageRepository.save(
        newContentEconomicPackage,
      );
      return {
        content_economic_package_id: res.content_economic_package_id,
        count: res.count,
        productMenu: res.productMenu,
      };
    }
  }

  async deleteContentEconomicPackage({
    content_economic_package_id,
  }: {
    content_economic_package_id: string;
  }) {
    await this.contentEconomicPackageRepository.delete({
      content_economic_package_id,
    });
    return { delete: true };
  }

  //#endregion
}
