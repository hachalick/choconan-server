import { Injectable } from '@nestjs/common';
import { readFile as readFileExcel, utils as utilsExcel } from 'xlsx';
import { allCategoryVideos } from './modules/constants/videos';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMenuEntity } from './modules/entity/mysql/Product.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { FactorItemEntity } from './modules/entity/mysql/FactorItem.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
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
      }
    }

    const listFactorItemAfter = await this.factorItemRepository.find({
      where: [{ product_menu_id: IsNull() }, { product_menu_id: '' }],
    });

    return listFactorItemAfter;
  }

  async update(id: number) {
    if (id === 1) {
      return await this.syncFactorToMenu();
    }
  }
}
