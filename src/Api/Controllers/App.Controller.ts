import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/Application/Services/App.Service';

@ApiTags('App')
@Controller('app')
export class AppController {
  constructor(private readonly AppService: AppService) {}

  @Get('video')
  ReadVideoCategoryList() {
    return this.AppService.ReadVideoCategoryList({});
  }

  @Get('video/:id')
  ReadVideoCategoryDetail(@Param('id', ParseUUIDPipe) id: string) {
    return this.AppService.ReadVideoCategoryDetail({ Id: id });
  }

  @Get('video/last/:id')
  ReadLastVideoCategoryDetail(@Param('id', ParseUUIDPipe) id: string) {
    return this.AppService.ReadLastVideoCategoryDetail({ Id: id });
  }

  @Get('update/:id')
  UpdateProgram(@Param('id', ParseIntPipe) id: number) {
    return this.AppService.UpdateProgram({ Version: id });
  }
}
