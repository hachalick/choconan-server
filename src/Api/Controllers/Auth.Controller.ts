import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  LoginOtpDto,
  LoginPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
} from '../../Domain/DTOs/Auth.Controller.DTO.js';
import {
  CheckExistAccessTokenInHeaderGuard,
  CheckNotExpiresTokenGuard,
} from '../Guards/Auth.Guard.js';
import { DashboardCapabilityGuard } from '../Decorators/DashboardCapability.Decorator.js';
import { AuthService } from '../../Application/Services/Auth.Service.js';
import { EDashboardCapability } from '../../Domain/Enum/DashboardCapability.Enum.js';
import { LoginUserOtpViewModel } from '../../Domain/ViewModels/Auth.Service.ViewModel.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Get('set-default')
  SetSeedDb() {
    return this.AuthService.SetSeedDb({});
  }

  @Post('login/password')
  LoginUserPassword(@Body() body: LoginPasswordDto) {
    return this.AuthService.LoginUserPassword({
      NationalCode: body.NationalCode,
      Password: body.Password,
      Phone: body.Phone,
    });
  }

  @Post('login/otp')
  @ApiResponse({
    type: LoginUserOtpViewModel,
  })
  LoginUserOtp(@Body() body: LoginOtpDto) {
    return this.AuthService.LoginUserOtp({
      NationalCode: body.NationalCode,
      Otp: body.Otp,
      Phone: body.Phone,
    });
  }

  @Put('refresh-token')
  CreateRefreshToken(@Body() body: RefreshTokenDto) {
    return this.AuthService.CreateRefreshToken({
      RefreshToken: body.RefreshToken,
    });
  }

  @Put('password')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.EDIT_PASSWORD)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdatePasswordUser(
    @Headers('access_token') AccessToken: string,
    @Body() body: ResetPasswordDto,
  ) {
    return this.AuthService.UpdatePasswordUser({
      AccessToken: AccessToken,
      Password: body.Password,
    });
  }
}
