import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreateDashboardCapabilityUserDto,
  CreateRoleDto,
  CreateUserDto,
  DeleteDashboardCapabilityUserDto,
  UpdateProfileDto,
  UpdateUserDto,
} from '../DTOs/User.Controller.DTO';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { DashboardCapabilityGuard } from '../Decorators/DashboardCapability.Decorator';
import { EDashboardCapability } from 'src/Share/Enum/DashboardCapability.Enum';
import {
  CheckExistAccessTokenInHeaderGuard,
  CheckNotExpiresTokenGuard,
} from '../Guards/Auth.Guard';
import { UserService } from 'src/Application/Services/User.Service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  //#region User

  @Get('account')
  @ApiHeader({ name: 'access_token', required: true })
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadAccountDetail(@Headers('access_token') AccessToken: string) {
    return this.UserService.ReadAccountDetail({ Token: AccessToken });
  }

  @Put('account')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.EDIT_PROFILE)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateUserProfile(
    @Headers('access_token') AccessToken: string,
    @Body() body: UpdateProfileDto,
  ) {
    return this.UserService.UpdateUserProfile({
      Token: AccessToken,
      Family: body.Family,
      Name: body.Name,
    });
  }

  @Get('user')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_USER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadUserList(@Headers('access_token') AccessToken: string) {
    return this.UserService.ReadUserList({});
  }

  @Get('user/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_USER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadUserDetail(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.UserService.ReadUserDetail({ Id: id });
  }

  @Post('user')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.CREATE_USER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateUser(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateUserDto,
  ) {
    return this.UserService.CreateUser({
      NationalCode: body.NationalCode,
      Phone: body.Phone,
      Password: 'choconan.ir',
      Family: body.Family,
      Name: body.Family,
    });
  }

  @Put('user/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.UPDATE_USER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateUser(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.UserService.UpdateUser({
      Id: id,
      Family: body.Family,
      Name: body.Name,
      NationalCode: body.NationalCode,
      Phone: body.Phone,
      Profile: body.Profile,
    });
  }

  @Delete('user/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.DELETE_USER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteUser(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.UserService.DeleteUser({ Id: id });
  }

  //#endregion

  //#region Dashboard Capability

  @Get('dashboard-capability')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_USER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadDashboardCapabilityList(@Headers('access_token') AccessToken: string) {
    return this.UserService.ReadDashboardCapabilityList({});
  }

  //#endregion

  //#region Dashboard Capability User

  @Post('dashboard-capability-user')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.CREATE_USER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateDashboardCapabilityUser(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateDashboardCapabilityUserDto,
  ) {
    return this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: body.DashboardCapabilityId,
      UserId: body.UserId,
    });
  }

  @Delete('dashboard-capability-user')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.DELETE_USER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteDashboardCapabilityUser(
    @Headers('access_token') AccessToken: string,
    @Body() body: DeleteDashboardCapabilityUserDto,
  ) {
    return this.UserService.DeleteDashboardCapabilityUser({
      DashboardCapabilityId: body.DashboardCapabilityId,
      UserId: body.UserId,
    });
  }

  //#endregion

  //#region  Role

  @Get('role')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_ROLE)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadRoleList(@Headers('access_token') AccessToken: string) {
    return this.UserService.ReadRoleList({});
  }

  @Get('role/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_ROLE)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadRoleDetail(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.UserService.ReadRoleDetail({ Id: id });
  }

  @Post('role')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.CREATE_ROLE)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateRole(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateRoleDto,
  ) {
    return this.UserService.CreateRole({ Name: body.Name });
  }

  @Put('role/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.UPDATE_ROLE)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateRole(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateRoleDto,
  ) {
    return this.UserService.UpdateRole({ Id: id, Name: body.Name });
  }

  @Delete('role/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.DELETE_ROLE)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteRole(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.UserService.DeleteRole({ Id: id });
  }

  //#endregion
}
