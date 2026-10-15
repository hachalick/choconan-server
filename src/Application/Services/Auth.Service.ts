import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthService } from './Interfaces/Auth.Service.Interface.js';
import { JwtService } from './Jwt.Service.js';
import { ServiceService } from './Service.Service.js';
import { UserService } from './User.Service.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';
import {
  CreateRefreshTokenViewModel,
  LoginUserOtpViewModel,
  LoginUserPasswordViewModel,
  SetSeedDbViewModel,
  UpdatePasswordUserViewModel,
} from '../../Domain/ViewModels/Auth.Service.ViewModel.js';
import {
  CreateRefreshTokenModel,
  LoginUserOtpModel,
  LoginUserPasswordModel,
  SetSeedDbModel,
  UpdatePasswordUserModel,
} from '../../Domain/Models/Auth.Service.Model.js';
import { OtpEntity } from '../../Domain/Entities/Mysql/Otp.Entity.js';
import { Repository } from 'typeorm';
import { DashboardCapabilityEntity } from '../../Domain/Entities/Mysql/DashboardCapability.Entity.js';
import { RoleEntity } from '../../Domain/Entities/Mysql/Role.Entity.js';
import { EDashboardCapability } from '../../Domain/Enum/DashboardCapability.Enum.js';
import {
  ApplicationConfigurationKeys,
  ApplicationConfigurationValues,
} from '../../Persistence/Configuration/Parameter/Application.Configuration.js';
import { Hashing } from '../../Share/Utils/Hashing.js';
import { Random } from '../../Share/Utils/Random.js';
import { HttpExceptionMessageCustom } from '../../Domain/Constants/HttpExceptionMessageCustom.js';
import { HttpExceptionCustom } from '../../Api/Exceptions/HttpExceptionCustom.js';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly ConfigService: ConfigService,
    private readonly JwtService: JwtService,
    private readonly UserService: UserService,
    private readonly ServiceService: ServiceService,

    @InjectRepository(UserEntity, ConnectionNameMysql.global)
    private readonly UserRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity, ConnectionNameMysql.global)
    private readonly RoleRepository: Repository<RoleEntity>,

    @InjectRepository(DashboardCapabilityEntity, ConnectionNameMysql.global)
    private readonly DashboardCapabilityRepository: Repository<DashboardCapabilityEntity>,

    @InjectRepository(OtpEntity, ConnectionNameMysql.global)
    private readonly OtpRepository: Repository<OtpEntity>,
  ) {}

  async SetSeedDb(Param: SetSeedDbModel): Promise<SetSeedDbViewModel> {
    const NationalCode = '98';

    //#region CreateUser and addUser

    await this.UserService.CreateUser({
      Password: '1234',
      NationalCode,
      Phone: '9353790881',
    });
    await this.UserService.CreateRole({ Name: 'پشتیبان' });

    const findRole = await this.RoleRepository.findOne({
      where: { Name: 'پشتیبان' },
    });

    if (!findRole) throw new Error();

    const findUser = await this.UserRepository.findOne({
      where: { NationalCode, Phone: '9353790881' },
    });

    if (!findUser) throw new Error();

    await this.UserService.CreateRoleUser({
      RoleId: findRole.Guid,
      UserId: findUser.Guid,
    });

    //#endregion

    //#region createDashboardCapability

    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_ACCOUNTING_ENTER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_ACCOUNTING_EXIT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_BLOG,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_ECONOMIC_PACKAGE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_FACTOR,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_IMAGE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_MENU_CATEGORY,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_MENU_PRODUCT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_ORDER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_ORDER_LOCATION,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_WAREHOUSE_ENTER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_WAREHOUSE_EXIT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_USER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_ACCOUNTING_EXIT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_BLOG,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_ECONOMIC_PACKAGE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_FACTOR,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_IMAGE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_MENU_CATEGORY,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_MENU_PRODUCT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_ORDER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_ORDER_LOCATION,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_WAREHOUSE_ENTER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_WAREHOUSE_EXIT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_USER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.EDIT_PASSWORD,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.EDIT_PROFILE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_ACCOUNTING_ENTER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_ACCOUNTING_EXIT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_ALL_ONLINE_SHOP,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_USER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_BLOG,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_ECONOMIC_PACKAGE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_FACTOR,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_IMAGE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_MENU_CATEGORY,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_MENU_PRODUCT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_ORDER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_ORDER_LOCATION,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_SNAP_ONLINE_SHOP,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_TAPSI_ONLINE_SHOP,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_WAREHOUSE_ENTER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_WAREHOUSE_EXIT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_ACCOUNTING_EXIT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_BLOG,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_ECONOMIC_PACKAGE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_FACTOR,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_MENU_CATEGORY,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_MENU_PRODUCT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_ORDER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_ORDER_LOCATION,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_USER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_WAREHOUSE_ENTER,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_WAREHOUSE_EXIT,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_ROLE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_ROLE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_ROLE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_ROLE,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.READ_PRODUCT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_PRODUCT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_PRODUCT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_PRODUCT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_PRODUCT_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_PRODUCT_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_PRODUCT_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_DETAIL_PRODUCT_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_DETAIL_PRODUCT_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_DETAIL_PRODUCT_UNIT_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.CREATE_COST_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.UPDATE_COST_PRICING,
    });
    await this.UserService.CreateDashboardCapability({
      Name: EDashboardCapability.DELETE_COST_PRICING,
    });

    //#endregion

    //#region DashboardCapabilityId:

    let dashboardCapability: DashboardCapabilityEntity | null;

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_ACCOUNTING_ENTER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_ACCOUNTING_EXIT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_BLOG,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_ECONOMIC_PACKAGE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_FACTOR,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_IMAGE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_MENU_CATEGORY,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_MENU_PRODUCT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_ORDER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_ORDER_LOCATION,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_WAREHOUSE_ENTER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_WAREHOUSE_EXIT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_USER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_ACCOUNTING_EXIT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_BLOG,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_ECONOMIC_PACKAGE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_FACTOR,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_IMAGE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_MENU_CATEGORY,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_MENU_PRODUCT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_ORDER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_ORDER_LOCATION,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_WAREHOUSE_ENTER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_WAREHOUSE_EXIT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_USER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.EDIT_PASSWORD,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.EDIT_PROFILE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_ACCOUNTING_ENTER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_ACCOUNTING_EXIT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_ALL_ONLINE_SHOP,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_USER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_BLOG,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_ECONOMIC_PACKAGE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_FACTOR,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_IMAGE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_MENU_CATEGORY,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_MENU_PRODUCT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_ORDER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_ORDER_LOCATION,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_SNAP_ONLINE_SHOP,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_TAPSI_ONLINE_SHOP,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_WAREHOUSE_ENTER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_WAREHOUSE_EXIT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_ACCOUNTING_EXIT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_BLOG,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_ECONOMIC_PACKAGE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_FACTOR,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_FACTOR,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_MENU_CATEGORY,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_MENU_PRODUCT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_ORDER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_ORDER_LOCATION,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_USER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_WAREHOUSE_ENTER,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_WAREHOUSE_EXIT,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_ROLE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_ROLE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_ROLE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_ROLE,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.READ_PRODUCT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_PRODUCT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_PRODUCT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_PRODUCT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_PRODUCT_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_PRODUCT_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_PRODUCT_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_DETAIL_PRODUCT_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_DETAIL_PRODUCT_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_DETAIL_PRODUCT_UNIT_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.CREATE_COST_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.UPDATE_COST_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    // ------------------------------------------

    dashboardCapability = await this.DashboardCapabilityRepository.findOne({
      where: {
        Name: EDashboardCapability.DELETE_COST_PRICING,
      },
    });

    if (!dashboardCapability) throw new Error();

    await this.UserService.CreateDashboardCapabilityUser({
      DashboardCapabilityId: dashboardCapability.Guid,
      UserId: findUser.Guid,
    });

    //#endregion

    return {
      Create: true,
    };
  }

  async LoginUserPassword(
    Param: LoginUserPasswordModel,
  ): Promise<LoginUserPasswordViewModel> {
    const key =
      this.ConfigService.get<string>(
        `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.TOKEN_HASH_PASSWORD}`,
      ) || '';
    const hashPass = Hashing.Password(Param.Password, key);
    const otp = Random.Otp(6);
    const currentDate = new Date();
    const expireOtp = new Date(currentDate.getTime() + 1000 * 60 * 2);

    const findOtp = await this.OtpRepository.findOne({
      where: { Phone: Param.Phone, NationalCode: Param.NationalCode },
    });

    const findUser = await this.UserRepository.findOne({
      where: { Phone: Param.Phone, NationalCode: Param.NationalCode },
      relations: { RoleUsers: true },
    });

    if (findOtp) {
      await this.OtpRepository.update(
        { Id: findOtp.Id },
        { ExpireDate: expireOtp, Otp: otp, IsUse: false },
      );
    } else {
      const newModel = this.OtpRepository.create({
        ExpireDate: expireOtp,
        Otp: otp,
        Phone: Param.Phone,
        NationalCode: Param.NationalCode,
        IsUse: false,
      });

      await this.OtpRepository.save(newModel);
    }

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.NOT_FOUND,
      );
    } else if (findUser.Password !== hashPass) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.ServiceService.SendSmsOtp({
      Otp: otp,
      Phone: `0${Param.Phone}`,
    });

    return { Create: true };
  }

  async LoginUserOtp(Param: LoginUserOtpModel): Promise<LoginUserOtpViewModel> {
    const findUser = await this.UserRepository.findOne({
      where: { Phone: Param.Phone, NationalCode: Param.NationalCode },
    });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    const findOtp = await this.OtpRepository.findOne({
      where: { NationalCode: Param.NationalCode, Phone: Param.Phone },
    });

    if (!findOtp) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.NOT_FOUND,
      );
    } else if (
      findOtp.Otp !== Param.Otp ||
      findOtp.ExpireDate < new Date() ||
      findOtp.IsUse === true
    ) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.OtpRepository.update({ Id: findOtp.Id }, { IsUse: true });

    const AccessToken = await this.JwtService.CreateAccessToken({
      Phone: Param.Phone,
      NationalCode: Param.NationalCode,
    });

    const RefreshToken = await this.JwtService.CreateRefreshToken({
      Phone: Param.Phone,
      NationalCode: Param.NationalCode,
    });

    return { AccessToken, RefreshToken };
  }

  async UpdatePasswordUser(
    Param: UpdatePasswordUserModel,
  ): Promise<UpdatePasswordUserViewModel> {
    const key =
      this.ConfigService.get<string>(
        `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.TOKEN_HASH_PASSWORD}`,
      ) || '';

    const payload = await this.JwtService.VerifyAccessToken(Param.AccessToken);

    const findUser = await this.UserRepository.findOne({
      where: { Phone: payload.Phone, NationalCode: payload.NationalCode },
    });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.UserRepository.update(
      { NationalCode: payload.NationalCode, Phone: payload.Phone },
      { Password: Hashing.Password(Param.Password, key) },
    );

    return { Update: true };
  }

  async CreateRefreshToken(
    Param: CreateRefreshTokenModel,
  ): Promise<CreateRefreshTokenViewModel> {
    const Payload = await this.JwtService.VerifyRefreshToken(
      Param.RefreshToken,
    );

    const findUser = await this.UserRepository.findOne({
      where: { Phone: Payload.Phone, NationalCode: Payload.NationalCode },
    });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.PresentTableNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    const AccessToken = await this.JwtService.CreateAccessToken({
      Phone: findUser.Phone,
      NationalCode: findUser.NationalCode,
    });

    const RefreshToken = await this.JwtService.CreateRefreshToken({
      Phone: findUser.Phone,
      NationalCode: findUser.NationalCode,
    });

    return { Create: true, AccessToken, RefreshToken };
  }
}
