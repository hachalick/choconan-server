import { Injectable } from '@nestjs/common';
import { readFile as readFileExcel, utils as utilsExcel } from 'xlsx';
import { allCategoryVideos } from './modules/constants/videos';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMenuEntity } from './modules/entity/mysql/Product.entity';
import { Between, In, IsNull, Not, Repository } from 'typeorm';
import { FactorItemEntity } from './modules/entity/mysql/FactorItem.entity';
import { FactorEntity } from './modules/entity/mysql/Factor.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
    @InjectRepository(FactorEntity)
    private readonly factorRepository: Repository<FactorEntity>,
    @InjectRepository(FactorItemEntity)
    private readonly factorItemRepository: Repository<FactorItemEntity>,
  ) {}

  getAllVideo() {
    const allMenu = [];
    const sheet_name_list = allCategoryVideos.map((val) => val.category);
    const workbook = readFileExcel('src/modules/assets/excel/video.xlsx');
    for (let i = 0; i < sheet_name_list.length; i++) {
      const data: TProductsMenu = utilsExcel.sheet_to_json(
        workbook.Sheets[sheet_name_list[i]],
      );
      allMenu.push({
        category: sheet_name_list[i],
        products: data,
      });
    }
    return allMenu;
  }

  getCategoryVideo({ category }: { category: string }) {
    const categoryAvailable = allCategoryVideos.find(
      (c) => c.category === category,
    );
    if (!categoryAvailable) return {};
    const workbook = readFileExcel('src/modules/assets/excel/video.xlsx');
    const data: TProductsMenu = utilsExcel.sheet_to_json(
      workbook.Sheets[category],
    );
    const res = {
      category,
      products: data,
    };
    return res;
  }

  getCategoryLastVideo({ category }: { category: string }) {
    const categoryAvailable = allCategoryVideos.find(
      (c) => c.category === category,
    );
    if (!categoryAvailable) return {};
    const workbook = readFileExcel('src/modules/assets/excel/video.xlsx');
    const data: TProductsMenu = utilsExcel.sheet_to_json(
      workbook.Sheets[category],
    );
    return data.pop();
  }

  private async syncFactorToMenu() {
    const listFactorItemBefore = await this.factorItemRepository.find({
      where: [{ product_menu_id: IsNull() }, { product_menu_id: '' }],
    });

    for (const itemFactorItem of listFactorItemBefore) {
      const product = await this.productMenuRepository.findOne({
        where: { name: itemFactorItem.product_name },
      });

      if (product) {
        await this.factorItemRepository.update(itemFactorItem.factor_item_id, {
          product_menu_id: product.product_id,
        });
      } else if (
        itemFactorItem.product_name === '' ||
        itemFactorItem.product_count === 0 ||
        itemFactorItem.product_price === 0
      ) {
        await this.factorItemRepository.delete(itemFactorItem.factor_item_id);
      }
    }

    const listFactorItemAfter = await this.factorItemRepository.find({
      where: [{ product_menu_id: IsNull() }, { product_menu_id: '' }],
    });

    return listFactorItemAfter;
  }

  private async syncSortAllFactorNumber() {
    const nowFullDate = new Date();

    const nowYear = nowFullDate.getFullYear();
    const nowMonth = nowFullDate.getMonth() + 1;
    const nowDay = nowFullDate.getDate() + 1;

    const startToday = new Date(
      `${nowYear}/${nowMonth}/${nowDay} 00:00:00`,
    ).getTime();

    const firsFactor = await this.factorRepository.findOne({
      order: { create_at: 'ASC' },
      where: {},
    });

    const firstFactorYear = firsFactor.create_at.getFullYear();
    const firstFactorMonth = firsFactor.create_at.getMonth() + 1;
    const firstFactorDay = firsFactor.create_at.getDate() + 1;

    const startFirstDay = new Date(
      `${firstFactorYear}/${firstFactorMonth}/${firstFactorDay} 00:00:00`,
    ).getTime();

    for (
      let day = startFirstDay;
      day <= startToday;
      day += 1000 * 60 * 60 * 24
    ) {
      const listFactor = await this.factorRepository.find({
        where: {
          create_at: Between(
            new Date(day - 1000 * 60 * 60 * 24),
            new Date(day),
          ),
        },
        order: { create_at: 'ASC' },
      });

      let counter = 1;
      for (const factor of listFactor) {
        await this.factorRepository.update(factor.factor_id, {
          factor_number: counter,
        });
        counter++;
      }
    }
  }

  async update(id: number) {
    switch (id) {
      case 1:
        return await this.syncFactorToMenu();
      case 2:
        return await this.syncSortAllFactorNumber();
    }
  }
}
