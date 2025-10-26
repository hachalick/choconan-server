import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  CheckDashboardCapabilityGuard,
  CheckNotExpiresTokenGuard,
} from 'src/auth/auth.guard';
import { UploadFileDto } from 'src/menu/menu.dto';
import { FileService } from './file.service';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('excel-menu')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'فایل اکسل برای آپلود',
    type: UploadFileDto,
  })
  uploadFileExcel(
    @Query('token') token: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1500,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadFileExcel({ file });
  }

  @Get('get-images')
  getImages() {
    return this.fileService.getImages();
  }

  @Post('image-product')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'عکس محصول برای آپلود',
    type: UploadFileDto,
  })
  uploadImageProduct(
    @Query('token') token: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /image\/(jpg|jpeg|png|webp|Jpg|Jpeg|Png|Webp|JPG|JPEG|PNG|WEBP)/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadImage({ file, dir_img: 'product' });
  }

  @Post('image')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'عکس برای آپلود',
    type: UploadFileDto,
  })
  uploadImage(
    @Query('token') token: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /image\/(jpg|jpeg|png|Jpg|Jpeg|Png|JPG|JPEG|PNG)/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadImage({ file });
  }

  @Delete('image/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteImage(
    @Query('token') token: string,
    @Param('id') id: string,
  ) {
    return this.fileService.deleteImage({ id });
  }
}
