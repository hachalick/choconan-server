import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('video')
  getAllVideo() {
    return this.appService.getAllVideo();
  }

  @Get('video/:category')
  getCategoryVideo(@Param('category') category: string) {
    return this.appService.getCategoryVideo({ category });
  }

  @Get('last-video/:category')
  getCategoryLastVideo(@Param('category') category: string) {
    return this.appService.getCategoryLastVideo({ category });
  }

  @Get('update/:id')
  update(@Param('id', ParseIntPipe) id: number) {
    return this.appService.update(id);
  }
}
