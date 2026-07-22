import { Body, Controller, Get, Post } from '@nestjs/common';
import { WelcomeUserDto } from '../DTOs/Service.Controller.DTO';
import { ApiTags } from '@nestjs/swagger';
import { ServiceService } from 'src/Application/Services/Service.Service';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('sms/welcome-user')
  SendSmsOtp(@Body() body: WelcomeUserDto) {
    return this.serviceService.SendSmsOtp({ Otp: body.Otp, Phone: body.Phone });
  }

  @Get('crawler/menu-snap')
  ReadMenuSnapFood() {
    return this.serviceService.ReadMenuSnapFood();
  }

  @Get('crawler/menu-tapsi')
  ReadMenuTapsiFood() {
    return this.serviceService.ReadMenuTapsiFood();
  }
}
