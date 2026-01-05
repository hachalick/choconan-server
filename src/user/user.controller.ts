import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateRoleDto,
  createUserDto,
  UpdateDashboardCapabilityDto,
  updateProfileDto,
  UpdateUserDto,
} from './user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  CheckDashboardCapabilityGuard,
  CheckExistAccountGuard,
  CheckNotExpiresTokenGuard,
} from 'src/auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('account')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  getAccount(@Headers('access_token') access_token: string) {
    return this.userService.getAccount({ token: access_token });
  }

  @Put('account')
  @UseGuards(CheckNotExpiresTokenGuard)
  updateProfile(@Headers('access_token') access_token: string, @Body() body: updateProfileDto) {
    const { family, name } = body;
    return this.userService.updateProfile({
      family,
      name,
      token: access_token,
    });
  }

  @Get('user')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  getAllUser(@Headers('access_token') access_token: string) {
    return this.userService.getAllUser();
  }

  @Get('user/:user_id')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  getUserById(
    @Headers('access_token') access_token: string,
    @Param('user_id') user_id: string,
  ) {
    return this.userService.getUserById(user_id);
  }

  @Post('user')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  createUser(@Headers('access_token') access_token: string, @Body() body: createUserDto) {
    const { national_code, phone, family, name } = body;
    return this.userService.createUser({
      national_code,
      phone,
      password: 'choconan.ir',
      family,
      name,
    });
  }

  @Put('user/:user_id')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  updateUserById(
    @Headers('access_token') access_token: string,
    @Param('user_id') user_id: string,
    @Body() body: UpdateUserDto,
  ) {
    const { family, name, national_code, phone } = body;
    return this.userService.updateUserById(user_id, {
      family,
      name,
      national_code,
      phone,
    });
  }

  @Delete('user/:user_id')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  deleteUserById(
    @Headers('access_token') access_token: string,
    @Param('user_id') user_id: string,
  ) {
    return this.userService.deleteUserById(user_id);
  }

  @Get('dashboard-capability')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  getDashboardCapability(@Headers('access_token') access_token: string) {
    return this.userService.getDashboardCapability();
  }

  @Post('dashboard-capability')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  addDashboardCapabilityToUser(
    @Headers('access_token') access_token: string,
    @Body() body: UpdateDashboardCapabilityDto,
  ) {
    return this.userService.addDashboardCapabilityToUserById(
      body.user_id,
      body.dashboard_capability,
    );
  }

  @Delete('dashboard-capability')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  removeDashboardCapabilityToUser(
    @Headers('access_token') access_token: string,
    @Body() body: UpdateDashboardCapabilityDto,
  ) {
    return this.userService.removeDashboardCapabilityToUser(
      body.user_id,
      body.dashboard_capability,
    );
  }

  @Get('role')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  getAllRole(@Headers('access_token') access_token: string) {
    return this.userService.getAllRole();
  }

  @Get('role/:role_id')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  getRoleById(
    @Headers('access_token') access_token: string,
    @Param('role_id') role_id: string,
  ) {
    return this.userService.getRoleById(role_id);
  }

  @Post('role')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  createRole(@Headers('access_token') access_token: string, @Body() body: CreateRoleDto) {
    return this.userService.createRole(body.role_name);
  }

  @Put('role/:role_id')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  updateRole(
    @Headers('access_token') access_token: string,
    @Param('role_id') role_id: string,
    @Body() body: CreateRoleDto,
  ) {
    return this.userService.updateRole({ role_id, role_name: body.role_name });
  }

  @Delete('role/:role_id')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  deleteRole(@Headers('access_token') access_token: string, @Param('role_id') role_id: string) {
    return this.userService.deleteRole(role_id);
  }

  @Get('access')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckDashboardCapabilityGuard)
  getAllAccess(@Headers('access_token') access_token: string) {
    return this.userService.getAllAccess();
  }
}
