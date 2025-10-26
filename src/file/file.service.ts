import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync, unlink, unlinkSync } from 'fs';
import { join } from 'path';
import { MenuService } from 'src/menu/menu.service';
import { CategoryProductMenuEntity } from 'src/modules/entity/mysql/CategoryProduct.entity';
import { ImageEntity } from 'src/modules/entity/mysql/Image.entity';
import { EMessageHttpException } from 'src/modules/enum/message-http-exception.enum';
import { Repository } from 'typeorm';
import { utils as utilsExcel, read as readExcel } from 'xlsx';

@Injectable()
export class FileService {
  constructor(
    private readonly menuService: MenuService,
    @InjectRepository(CategoryProductMenuEntity)
    private readonly categoryProductMenuRepository: Repository<CategoryProductMenuEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

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
    for (let i in pastCategory) {
      await this.categoryProductMenuRepository.delete({
        category_product_id: pastCategory[i].category_product_id,
      });
    }
    for (let i in allMenu) {
      const { category_id } = await this.menuService.addCategoryMenu({
        category: allMenu[i].category,
        icon: allMenu[i].icon,
      });
      for (let j in allMenu[i].products) {
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
        } = allMenu[i].products[j];
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
        where: { dir: dirFile.replaceAll('\\', '/') },
      });
      const pathFile = join(process.cwd(), 'public', dirFile);
      writeFileSync(pathFile, file.buffer);
      !findImage &&
        (await this.imageRepository.save(
          this.imageRepository.create({ dir: '/' + dirFile.replaceAll('\\', '/') }),
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
    // else {
    //   throw new HttpException(
    //     EMessageHttpException.IMAGE_NOT_DELETE,
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }
}
