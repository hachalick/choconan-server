import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import {
  LoginPasswordDto,
  resetPasswordDto,
  LoginOtpDto,
} from './auth.dto';
import {
  CheckNotExpiresTokenGuard,
  LoginOtpGuard,
  LoginPasswordGuard,
  ExistTokenInParamGuard,
  ResetPasswordGuard,
  SignUpGuard,
} from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('set-default')
  setDefaultDg() {
    return this.authService.setDefaultDb();
  }

  @Post('login-password')
  @UseGuards(LoginPasswordGuard)
  loginPassword(@Body() body: LoginPasswordDto) {
    const { national_code, password, phone } = body;
    return this.authService.loginPassword({ national_code, password, phone });
  }

  @Post('login-otp')
  @UseGuards(LoginOtpGuard)
  loginOtp(@Body() body: LoginOtpDto) {
    const { national_code, phone, otp } = body;
    return this.authService.loginOtp({ national_code, phone, otp });
  }

  @Get('refresh-token/:token')
  @UseGuards(ExistTokenInParamGuard)
  refreshToken(@Param('token') token: string) {
    return this.authService.refreshToken({ token });
  }

  @Put('update-password')
  @UseGuards(ResetPasswordGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updatePassword(
    @Query('token') token: string,
    @Body() body: resetPasswordDto,
  ) {
    const { new_password } = body;
    return this.authService.updatePassword({
      new_password,
      token,
    });
  }
}
