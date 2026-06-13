import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync, unlink, unlinkSync } from 'fs';
import { join } from 'path';
import { MenuService } from 'src/menu/menu.service';
import { CategoryProductMenuEntity } from 'src/modules/entity/mysql/CategoryProduct.entity';
import { ImageEntity } from 'src/modules/entity/mysql/Image.entity';
import { EMessageHttpException } from 'src/modules/enum/message-http-exception.enum';
import { Repository } from 'typeorm';
import {
  utils as utilsExcel,
  read as readExcel,
  writeFileXLSX,
  WorkBook,
  WorkSheet,
} from 'xlsx';
import * as XLSX from 'xlsx';
import { Response } from 'express';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { TCategoriesMenu, TProductsMenu } from 'src/modules/types/fetch.type';

@Injectable()
export class FileService {
  constructor(
    private readonly menuService: MenuService,
    @InjectRepository(CategoryProductMenuEntity)
    private readonly categoryProductMenuRepository: Repository<CategoryProductMenuEntity>,
    @InjectRepository(ProductMenuEntity)
    private readonly productMenuRepository: Repository<ProductMenuEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async downloadFileExcelMenu(res: Response) {
    const wb = XLSX.utils.book_new();

    const productMenu = (
      await this.categoryProductMenuRepository.find({
        where: {},
        relations: { products: true },
      })
    )
      .map((p) =>
        p.products.map((c) => ({
          category: p.category,
          name: c.name,
          price: c.price,
        })),
      )
      .flat()
      .map((p) => ({ دسته: p.category, 'نام محصول': p.name, قیمت: p.price }));

    const wsProductMenu = XLSX.utils.json_to_sheet(productMenu);

    wsProductMenu['!freeze'] = { ySplit: 1 };

    wsProductMenu['A1'].s = { font: { bold: true } };
    wsProductMenu['B1'].s = { font: { bold: true } };
    wsProductMenu['C1'].s = { font: { bold: true } };

    XLSX.utils.book_append_sheet(wb, wsProductMenu, 'ProductMenu');

    const buffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'buffer',
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

    res.end(buffer);
  }

  async uploadFileExcel({ file }: { file: Express.Multer.File }) {
    const allMenu: TCategoriesMenu = [];
    const workbook = readExcel(file.buffer, { type: 'buffer' });
    const sheet_name_list = workbook.SheetNames;
    for (let i = 0; i < sheet_name_list.length; i++) {
      const data: TProductsMenu = utilsExcel.sheet_to_json(
        workbook.Sheets[sheet_name_list[i]],
        {
          blankrows: true,
          defval: null,
        },
      );
      allMenu.push({
        category: sheet_name_list[i],
        icon: '/default.jpg',
        products: data,
      });
    }
    const pastCategory = await this.categoryProductMenuRepository.find();
    for (const item of pastCategory) {
      await this.categoryProductMenuRepository.delete({
        category_product_id: item.category_product_id,
      });
    }
    for (const item of allMenu) {
      const { category_id } = await this.menuService.addCategoryMenu({
        category: item.category,
        icon: item.icon,
      });
      for (const itemProduct of item.products) {
        const {
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
        } = itemProduct;
        await this.menuService.addProductMenu({
          available,
          description,
          id,
          meta_description,
          meta_title,
          name,
          category_id,
          price,
          src,
          waiting,
          snap,
          tapsi,
        });
      }
    }
    return { change: true };
  }

  async getImages() {
    return await this.imageRepository.find();
  }

  async uploadImage({
    file,
    dir_img,
  }: {
    file: Express.Multer.File;
    dir_img?: string | undefined;
  }) {
    try {
      const dirFile = dir_img
        ? join(dir_img, `${file.originalname}`)
        : join(`${file.originalname}`);
      const findImage = await this.imageRepository.findOne({
        where: { dir: '/' + dirFile.replaceAll('\\', '/') },
      });
      const pathFile = join(process.cwd(), 'public', dirFile);
      const uint8Array = new Uint8Array(file.buffer);
      writeFileSync(pathFile, uint8Array);
      !findImage &&
        (await this.imageRepository.save(
          this.imageRepository.create({
            dir: '/' + dirFile.replaceAll('\\', '/'),
          }),
        ));
      return {
        upload: true,
      };
    } catch (error) {
      throw new HttpException(
        EMessageHttpException.IMAGE_NOT_UPLOADED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteImage({ id }: { id: string }) {
    const findImage = await this.imageRepository.findOne({
      where: { image_id: id },
    });
    if (findImage) {
      try {
        unlinkSync(join(process.cwd(), 'public', findImage.dir));
      } catch (error) {}
      await this.imageRepository.delete(id);
      return {
        delete: true,
      };
    }
  }
}
