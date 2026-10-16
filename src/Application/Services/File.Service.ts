import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { DataSource, Raw, Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import {
  DeleteFileImageModel,
  DownloadFileBackupExcelModel,
  DownloadFileMenuExcelModel,
  ReadFileImageListModel,
  UploadFileImageModel,
} from '../../Domain/Models/File.Service.Model.js';
import {
  DeleteFileImageViewModel,
  DownloadFileBackupExcelViewModel,
  DownloadFileMenuExcelViewModel,
  ReadFileImageListViewModel,
  UploadFileImageViewModel,
} from '../../Domain/ViewModels/File.Service.ViewModel.js';
import { IFileService } from './Interfaces/File.Service.Interface.js';
import { CategoryProductMenuEntity } from '../../Domain/Entities/Mysql/CategoryProductMenu.Entity.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { FileEntity } from '../../Domain/Entities/Mysql/File.Entity.js';
import { InnerRoute } from '../../Domain/Constants/InnerRoute.Constants.js';
import { HttpExceptionMessageCustom } from '../../Domain/Constants/HttpExceptionMessageCustom.js';
import { HttpExceptionCustom } from '../../Api/Exceptions/HttpExceptionCustom.js';
import { EntitiesMySqlGlobal } from '../../Persistence/Configuration/Sql/Entities.MysqlGlobal.js';

@Injectable()
export class FileService implements IFileService {
  constructor(
    @InjectRepository(CategoryProductMenuEntity, ConnectionNameMysql.global)
    private readonly CategoryProductMenuRepository: Repository<CategoryProductMenuEntity>,

    @InjectRepository(FileEntity, ConnectionNameMysql.global)
    private readonly FileRepository: Repository<FileEntity>,

    @InjectDataSource(ConnectionNameMysql.global)
    private readonly dataSource: DataSource,
  ) {}

  async DownloadFileBackupExcel(
    Param: DownloadFileBackupExcelModel,
  ): Promise<DownloadFileBackupExcelViewModel> {
    const wb = XLSX.utils.book_new();

    for (const entityModel of EntitiesMySqlGlobal) {
      const repository = this.dataSource.getRepository(entityModel);

      const countRows = await repository.count();
      const allRows: any[] = [];

      for (let rowIndex = 0; rowIndex < countRows; rowIndex++) {
        const [rowEntity] = await repository.find({
          take: 1,
          skip: rowIndex,
        });

        if (rowEntity) {
          allRows.push(rowEntity);
        }
      }

      if (!allRows.length) continue;

      const metadata = this.dataSource.getMetadata(entityModel);
      const sheetName = (metadata.tableName || metadata.name).substring(0, 31);

      const ws = XLSX.utils.json_to_sheet(allRows);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    }

    const buffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'buffer',
    });

    return { Download: buffer };
  }

  async DownloadFileMenuExcel(
    Param: DownloadFileMenuExcelModel,
  ): Promise<DownloadFileMenuExcelViewModel> {
    const wb = XLSX.utils.book_new();

    const productMenu = (
      await this.CategoryProductMenuRepository.find({
        relations: { Products: true },
        order: { Name: 'ASC', Products: { Name: 'ASC' } },
      })
    )
      .map((p) =>
        p.Products.map((c) => ({
          category: p.Name,
          name: c.Name,
          price: c.Price,
        })),
      )
      .flat()
      .map((p) => ({ دسته: p.category, 'نام محصول': p.name, قیمت: p.price }));

    const wsProductMenu = XLSX.utils.json_to_sheet(productMenu);

    wsProductMenu['!freeze'] = { ySplit: 1 };

    wsProductMenu['A1'].s = { font: { bold: true } };
    wsProductMenu['B1'].s = { font: { bold: true } };
    wsProductMenu['C1'].s = { font: { bold: true } };

    XLSX.utils.book_append_sheet(wb, wsProductMenu, 'منو');

    const buffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'buffer',
    });

    return { Download: buffer };
  }

  // async uploadFileExcel({ file }: { file: Express.Multer.File }) {
  //   const allMenu: TCategoriesMenu = [];
  //   const workbook = readExcel(file.buffer, { type: 'buffer' });
  //   const sheet_name_list = workbook.SheetNames;
  //   for (let i = 0; i < sheet_name_list.length; i++) {
  //     const data: TProductsMenu = utilsExcel.sheet_to_json(
  //       workbook.Sheets[sheet_name_list[i]],
  //       {
  //         blankrows: true,
  //         defval: null,
  //       },
  //     );
  //     allMenu.push({
  //       category: sheet_name_list[i],
  //       icon: '/default.jpg',
  //       products: data,
  //     });
  //   }
  //   const pastCategory = await this.CategoryProductMenuRepository.find();
  //   for (const item of pastCategory) {
  //     await this.CategoryProductMenuRepository.delete({
  //       category_product_id: item.category_product_id,
  //     });
  //   }
  //   for (const item of allMenu) {
  //     const { category_id } = await this.MenuService.addCategoryMenu({
  //       category: item.category,
  //       icon: item.icon,
  //     });
  //     for (const itemProduct of item.products) {
  //       const {
  //         available,
  //         description,
  //         id,
  //         meta_description,
  //         meta_title,
  //         name,
  //         price,
  //         src,
  //         waiting,
  //         snap,
  //         tapsi,
  //       } = itemProduct;
  //       await this.MenuService.addProductMenu({
  //         available,
  //         description,
  //         id,
  //         meta_description,
  //         meta_title,
  //         name,
  //         category_id,
  //         price,
  //         src,
  //         waiting,
  //         snap,
  //         tapsi,
  //       });
  //     }
  //   }
  //   return { change: true };
  // }

  async ReadFileImageList(
    Param: ReadFileImageListModel,
  ): Promise<ReadFileImageListViewModel[]> {
    const res = await this.FileRepository.find({
      where: [
        {
          Direction: Raw((alias) => `${alias} LIKE :jpg`, {
            jpg: '%.jpg',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :JPG`, {
            JPG: '%.JPG',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :Jpg`, {
            Jpg: '%.Jpg',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :jpeg`, {
            jpeg: '%.jpeg',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :JPEG`, {
            JPEG: '%.JPEG',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :Jpeg`, {
            Jpeg: '%.Jpeg',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :png`, {
            png: '%.png',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :PNG`, {
            PNG: '%.PNG',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :Png`, {
            Png: '%.Png',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :webp`, {
            webp: '%.webp',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :WEBP`, {
            WEBP: '%.WEBP',
          }),
        },
        {
          Direction: Raw((alias) => `${alias} LIKE :Webp`, {
            Webp: '%.Webp',
          }),
        },
      ],
    });

    return res.map((val) => ({
      Id: val.Guid,
      Direction: val.Direction,
      Url: `${InnerRoute.BASE_URL}${val.Direction}`,
    }));
  }

  async UploadFileImage(
    Param: UploadFileImageModel,
  ): Promise<UploadFileImageViewModel> {
    const currentDate = new Date();
    const originalName = Param.File.originalname;
    const cleanName = originalName
      .replace(/\s/g, '')
      .replace(/[^a-zA-Z0-9.]/g, '');
    const extension = cleanName.split('.').pop();
    const fileNameWithoutExt = cleanName.replace(`.${extension}`, '');
    const fileName = `${currentDate.getTime()}_${fileNameWithoutExt}.${extension}`;
    const dirPath = join('File', 'Image');
    const fullDirPath = join(process.cwd(), 'public', dirPath);

    if (!existsSync(fullDirPath)) {
      mkdirSync(fullDirPath, { recursive: true });
    }

    const filePath = join(fullDirPath, fileName);
    const relativePath = `/${dirPath.replace(/\\/g, '/')}/${fileName}`;

    // if (
    //   ['jpg', 'jpeg', 'png', 'webp'].includes(extension?.toLowerCase() || '')
    // ) {
    //   await sharp(Param.File.buffer)
    //     .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    //     .jpeg({ quality: 80 })
    //     .toFile(filePath);
    // } else {
    //   writeFileSync(filePath, Param.File.buffer);
    // }

    writeFileSync(filePath, Param.File.buffer);

    const newModel = this.FileRepository.create({ Direction: relativePath });

    await this.FileRepository.save(newModel);

    return {
      Upload: true,
    };
  }

  async DeleteFileImage(
    Param: DeleteFileImageModel,
  ): Promise<DeleteFileImageViewModel> {
    const res = await this.FileRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!res) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      unlinkSync(join(process.cwd(), 'public', res.Direction));
      await this.FileRepository.delete({ Guid: Param.Id });
    } catch (error) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      Delete: true,
    };
  }
}
