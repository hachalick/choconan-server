import {
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { type Response } from 'express';
import {
  CheckExistAccessTokenInHeaderGuard,
  CheckNotExpiresTokenGuard,
} from 'src/Api/Guards/Auth.Guard';
import { Multer } from 'multer';
import { UploadFileDto } from '../DTOs/File.Controller.DTO';
import { DashboardCapabilityGuard } from '../Decorators/DashboardCapability.Decorator';
import { EDashboardCapability } from 'src/Share/Enum/DashboardCapability.Enum';
import { FileService } from 'src/Application/Services/File.Service';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Get('download/excel/menu')
  async DownloadFileMenuExcel(@Res() res: Response) {
    const buffer = await this.FileService.DownloadFileMenuExcel(res);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
    res.end(buffer.Download);
  }

  @Get('image')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_IMAGE)
  ReadFileImageList(@Headers('access_token') AccessToken: string) {
    return this.FileService.ReadFileImageList({});
  }

  @Post('image')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.CREATE_IMAGE)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'آپلود تصویر' })
  @ApiBody({
    description: 'عکس محصول برای آپلود',
    type: UploadFileDto,
  })
  // @ApiResponse((new UploadFileImageViewModel() = { Upload: true }))
  UploadFileImage(
    @Headers('access_token') AccessToken: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /image\/(jpg|jpeg|png|webp|Jpg|Jpeg|Png|Webp|JPG|JPEG|PNG|WEBP)/,
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
    return this.FileService.UploadFileImage({ File: file });
  }

  @Delete('image/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.DELETE_IMAGE)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteFileImage(
    @Headers('access_token') AccessToken: string,
    @Param('id') id: string,
  ) {
    return this.FileService.DeleteFileImage({ Id: id });
  }
}
