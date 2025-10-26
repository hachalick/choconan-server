import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WelcomeUserDto } from './service.dto';
import { ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('sms/welcome-user')
  sendSmsWelcomeUser(@Body() welcomeUserDto: WelcomeUserDto) {
    const { fullname, phone } = welcomeUserDto;
    return this.serviceService.sendSmsWelcomeUser({ fullname, phone });
  }

  @Get('crawler/menu-snap')
  getCrawlerMenuSnapFood() {
    return this.serviceService.getCrawlerMenuSnapFood();
  }

  @Get('crawler/menu-tapsi')
  getCrawlerMenuTapsiFood() {
    return this.serviceService.getCrawlerMenuTapsiFood();
  }
}
