import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { IUserService } from './Interfaces/User.Service.Interface';
import {
  CreateDashboardCapabilityModel,
  CreateDashboardCapabilityUserModel,
  CreateRoleModel,
  CreateRoleUserModel,
  CreateUserModel,
  DeleteDashboardCapabilityUserModel,
  DeleteRoleModel,
  DeleteRoleUserModel,
  DeleteUserModel,
  ReadAccountDetailModel,
  ReadDashboardCapabilityDetailModel,
  ReadDashboardCapabilityListModel,
  ReadRoleDetailModel,
  ReadRoleListModel,
  ReadUserDetailModel,
  ReadUserListModel,
  UpdateRoleModel,
  UpdateUserModel,
  UpdateUserProfileModel,
} from '../../Domain/Models/User.Service.Model';
import {
  CreateDashboardCapabilityUserViewModel,
  CreateDashboardCapabilityViewModel,
  CreateRoleUserViewModel,
  CreateRoleViewModel,
  CreateUserViewModel,
  DeleteDashboardCapabilityUserViewModel,
  DeleteRoleUserViewModel,
  DeleteRoleViewModel,
  DeleteUserViewModel,
  ReadAccountDetailViewModel,
  ReadDashboardCapabilityDetailViewModel,
  ReadDashboardCapabilityListViewModel,
  ReadRoleDetailViewModel,
  ReadRoleListViewModel,
  ReadUserDetailViewModel,
  ReadUserListViewModel,
  UpdateRoleViewModel,
  UpdateUserProfileViewModel,
  UpdateUserViewModel,
} from '../../Domain/ViewModels/User.Service.ViewModel';
import { HttpExceptionCustom } from 'src/Api/Exceptions/HttpExceptionCustom';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { UserEntity } from 'src/Domain/Entities/Mysql/User.Entity';
import { RoleEntity } from 'src/Domain/Entities/Mysql/Role.Entity';
import { DashboardCapabilityUserEntity } from 'src/Domain/Entities/Mysql/DashboardCapabilityUser.Entity';
import { RoleUserEntity } from 'src/Domain/Entities/Mysql/RoleUser.Entity';
import { DashboardCapabilityEntity } from 'src/Domain/Entities/Mysql/DashboardCapability.Entity';
import { HttpExceptionMessageCustom } from 'src/Share/Constants/HttpExceptionMessageCustom';
import { Hashing } from 'src/Share/Utils/Hashing';
import {
  ApplicationConfigurationKeys,
  ApplicationConfigurationValues,
} from 'src/Share/Configuration/Parameter/Application.Configuration';
import { JwtService } from './Jwt.Service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly ConfigService: ConfigService,

    @InjectRepository(UserEntity, ConnectionNameMysql.global)
    private readonly UserRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity, ConnectionNameMysql.global)
    private readonly RoleRepository: Repository<RoleEntity>,

    @InjectRepository(DashboardCapabilityEntity, ConnectionNameMysql.global)
    private readonly DashboardCapabilityRepository: Repository<DashboardCapabilityEntity>,

    @InjectRepository(RoleUserEntity, ConnectionNameMysql.global)
    private readonly RoleUserRepository: Repository<RoleUserEntity>,

    @InjectRepository(DashboardCapabilityUserEntity, ConnectionNameMysql.global)
    private readonly DashboardCapabilityUserRepository: Repository<DashboardCapabilityUserEntity>,
  ) {}

  //#region User

  async ReadUserList(
    Param: ReadUserListModel,
  ): Promise<ReadUserListViewModel[]> {
    const res = await this.UserRepository.find({
      relations: {
        RoleUsers: { Role: true },
        DashboardCapabilityUser: { DashboardCapability: true },
      },
      where: { Phone: Not('9353790881'), NationalCode: '98' },
    });

    return res.map((user) => ({
      Id: user.Guid,
      Name: user.Name,
      Family: user.Family,
      Phone: user.Phone,
      NationalCode: user.NationalCode,
      Profile: user.Profile,
      Role: user.RoleUsers.map((val) => val.Role.Name),
      Access: user.DashboardCapabilityUser.map(
        (val) => val.DashboardCapability.Name,
      ),
    }));
  }

  async ReadAccountDetail(
    Param: ReadAccountDetailModel,
  ): Promise<ReadAccountDetailViewModel> {
    const { NationalCode, Phone } = await this.JwtService.VerifyAccessToken(
      Param.Token,
    );
    const findUser = await this.UserRepository.findOne({
      where: { Phone, NationalCode },
      relations: {
        RoleUsers: { Role: true },
        DashboardCapabilityUser: { DashboardCapability: true },
      },
    });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      Id: findUser.Guid,
      Name: findUser.Name,
      Family: findUser.Family,
      Profile: findUser.Profile,
      Role: findUser.RoleUsers.map((val) => val.Role.Name),
      Access: findUser.DashboardCapabilityUser.map(
        (val) => val.DashboardCapability.Name,
      ),
    };
  }

  async ReadUserDetail(
    Param: ReadUserDetailModel,
  ): Promise<ReadUserDetailViewModel> {
    const findUser = await this.UserRepository.findOne({
      relations: {
        RoleUsers: { Role: true },
        DashboardCapabilityUser: { DashboardCapability: true },
      },
      where: { Guid: Param.Id },
    });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      Id: findUser.Guid,
      Name: findUser.Name,
      Family: findUser.Family,
      Phone: findUser.Phone,
      NationalCode: findUser.NationalCode,
      Profile: findUser.Profile,
      Role: findUser.RoleUsers.map((val) => val.Role.Name),
      Access: findUser.DashboardCapabilityUser.map(
        (val) => val.DashboardCapability.Name,
      ),
    };
  }

  async CreateUser(Param: CreateUserModel): Promise<CreateUserViewModel> {
    const key = this.ConfigService.get<string>(
      `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.TOKEN_HASH_PASSWORD}`,
    );

    Param.NationalCode = Param.NationalCode === '' ? '98' : Param.NationalCode;

    const findUser = await this.UserRepository.findOne({
      where: {
        Phone: Param.Phone,
        NationalCode: Param.NationalCode,
      },
    });

    if (findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    // create a account
    const newModel = this.UserRepository.create({
      Password: Hashing.Password(Param.Password, key),
      Phone: Param.Phone,
      NationalCode: Param.NationalCode,
      Name: Param.Name,
      Family: Param.Family,
    });

    await this.UserRepository.save(newModel);

    return { Create: true };
  }

  async UpdateUser(Param: UpdateUserModel): Promise<UpdateUserViewModel> {
    const findUser = await this.UserRepository.findOne({
      where: {
        Guid: Param.Id,
      },
    });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    const resultUpdate = await this.UserRepository.update(
      { Guid: Param.Id },
      {
        Phone: Param.Phone,
        NationalCode: Param.NationalCode,
        Name: Param.Name,
        Family: Param.Family,
      },
    );

    return { Update: resultUpdate.affected > 0 };
  }

  async UpdateUserProfile(
    Param: UpdateUserProfileModel,
  ): Promise<UpdateUserProfileViewModel> {
    const prop = await this.JwtService.VerifyAccessToken(Param.Token);

    if (!prop.NationalCode || !prop.Phone) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.UserRepository.update(
      { NationalCode: prop.NationalCode, Phone: prop.Phone },
      { Name: Param.Name, Family: Param.Family },
    );

    return { Update: true };
  }

  async DeleteUser(Param: DeleteUserModel): Promise<DeleteUserViewModel> {
    const findUser = await this.UserRepository.findOne({
      where: {
        Guid: Param.Id,
      },
    });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    const resultDelete = await this.UserRepository.delete({ Guid: Param.Id });

    return { Delete: resultDelete.affected > 0 };
  }

  //#endregion

  //#region Dashboard Capability

  async ReadDashboardCapabilityList(
    Param: ReadDashboardCapabilityListModel,
  ): Promise<ReadDashboardCapabilityListViewModel[]> {
    return (
      await this.DashboardCapabilityRepository.find({
        order: { Name: 'ASC' },
        select: { Guid: true, Name: true },
      })
    ).map((val) => ({
      Id: val.Guid,
      DashboardCapability: val.Name,
    }));
  }

  async ReadDashboardCapabilityDetail(
    Param: ReadDashboardCapabilityDetailModel,
  ): Promise<ReadDashboardCapabilityDetailViewModel> {
    const findDashboardCapability =
      await this.DashboardCapabilityRepository.findOne({
        where: { Guid: Param.Id },
      });

    if (!findDashboardCapability) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      Id: findDashboardCapability.Guid,
      DashboardCapability: findDashboardCapability.Name,
    };
  }

  async CreateDashboardCapability(
    Param: CreateDashboardCapabilityModel,
  ): Promise<CreateDashboardCapabilityViewModel> {
    const findDashboardCapability =
      await this.DashboardCapabilityRepository.findOne({
        where: { Name: Param.Name },
      });

    if (findDashboardCapability) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.DashboardCapabilityIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.DashboardCapabilityRepository.create({
      Name: Param.Name,
    });

    await this.DashboardCapabilityRepository.save(newModel);

    return { Create: true };
  }

  //#endregion

  //#region Dashboard Capability User

  async CreateDashboardCapabilityUser(
    Param: CreateDashboardCapabilityUserModel,
  ): Promise<CreateDashboardCapabilityUserViewModel> {
    const findUser = await this.UserRepository.findOne({
      where: { Guid: Param.UserId },
    });

    const findDashboardCapability =
      await this.DashboardCapabilityRepository.findOne({
        where: { Guid: Param.DashboardCapabilityId },
      });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!findDashboardCapability) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.DashboardCapabilityNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    const findDashboardCapabilityUser =
      await this.DashboardCapabilityUserRepository.findOne({
        where: { User: findUser, DashboardCapability: findDashboardCapability },
      });

    if (findDashboardCapabilityUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.DashboardCapabilityUserIsExist,
        HttpStatus.NOT_FOUND,
      );
    }

    const newDashboardCapabilityUser =
      this.DashboardCapabilityUserRepository.create({
        DashboardCapability: findDashboardCapability,
        User: findUser,
      });

    await this.DashboardCapabilityUserRepository.save(
      newDashboardCapabilityUser,
    );

    return { Create: true };
  }

  async DeleteDashboardCapabilityUser(
    Param: DeleteDashboardCapabilityUserModel,
  ): Promise<DeleteDashboardCapabilityUserViewModel> {
    const findUser = await this.UserRepository.findOne({
      where: { Guid: Param.UserId },
    });

    const findDashboardCapability =
      await this.DashboardCapabilityRepository.findOne({
        where: { Guid: Param.DashboardCapabilityId },
      });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!findDashboardCapability) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.DashboardCapabilityNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    const findDashboardCapabilityUser =
      await this.DashboardCapabilityUserRepository.findOne({
        where: { User: findUser, DashboardCapability: findDashboardCapability },
      });

    if (!findDashboardCapabilityUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.DashboardCapabilityUserNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    const resultDelete = await this.DashboardCapabilityUserRepository.delete({
      DashboardCapability: findDashboardCapability,
      User: findUser,
    });

    return { Delete: resultDelete.affected > 0 };
  }

  //#endregion

  //#region Role

  async ReadRoleList(
    Param: ReadRoleListModel,
  ): Promise<ReadRoleListViewModel[]> {
    return (
      await this.RoleRepository.find({
        order: { Name: 'ASC' },
        where: { Name: Not('پشتیبان') },
        select: { Guid: true, Name: true },
      })
    ).map((val) => ({ Id: val.Guid, Name: val.Name }));
  }

  async ReadRoleDetail(
    Param: ReadRoleDetailModel,
  ): Promise<ReadRoleDetailViewModel> {
    const findRole = await this.RoleRepository.findOne({
      where: { Guid: Param.Id },
    });

    if (!findRole) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.RoleNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return { Id: findRole.Guid, Name: findRole.Name };
  }

  async CreateRole(Param: CreateRoleModel): Promise<CreateRoleViewModel> {
    const findRole = await this.RoleRepository.findOne({
      where: { Name: Param.Name },
    });

    if (findRole) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.RoleIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.RoleRepository.create({ Name: Param.Name });
    await this.RoleRepository.save(newModel);

    return { Create: true };
  }

  async UpdateRole(Param: UpdateRoleModel): Promise<UpdateRoleViewModel> {
    const findRole = await this.RoleRepository.find({
      where: { Guid: Param.Id },
    });

    if (!findRole) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.RoleNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const repeatRole = await this.RoleRepository.find({
      where: { Name: Param.Name },
    });

    if (!repeatRole) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.RoleIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultUpdate = await this.RoleRepository.update(
      { Guid: Param.Id },
      { Name: Param.Name },
    );

    return { Update: resultUpdate.affected > 0 };
  }

  async DeleteRole(Param: DeleteRoleModel): Promise<DeleteRoleViewModel> {
    const findRole = await this.RoleRepository.find({
      where: { Guid: Param.Id },
    });

    if (!findRole) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.RoleNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.RoleRepository.delete({ Guid: Param.Id });

    return { Delete: true };
  }

  //#endregion

  //#region Role User

  async CreateRoleUser(
    Param: CreateRoleUserModel,
  ): Promise<CreateRoleUserViewModel> {
    const findUser = await this.UserRepository.findOne({
      where: { Guid: Param.UserId },
    });

    const findRole = await this.RoleRepository.findOne({
      where: { Guid: Param.RoleId },
    });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!findRole) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.RoleNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findRoleUser = await this.RoleUserRepository.findOne({
      where: { User: findUser, Role: findRole },
    });

    if (findRoleUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.RoleUserIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.RoleUserRepository.create({
      User: findUser,
      Role: findRole,
    });

    await this.RoleUserRepository.save(newModel);

    return { Create: true };
  }

  async DeleteRoleUser(
    Param: DeleteRoleUserModel,
  ): Promise<DeleteRoleUserViewModel> {
    const findUser = await this.UserRepository.findOne({
      where: { Guid: Param.UserId },
    });

    const findRole = await this.RoleRepository.findOne({
      where: { Guid: Param.RoleId },
    });

    if (!findUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!findRole) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.RoleNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    const findRoleUser = await this.RoleUserRepository.findOne({
      where: { User: findUser, Role: findRole },
    });

    if (!findRoleUser) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.RoleUserIsExist,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newModel = this.RoleUserRepository.create({
      User: findUser,
      Role: findRole,
    });

    await this.RoleUserRepository.save(newModel);

    return { Delete: true };
  }

  //#endregion
}
