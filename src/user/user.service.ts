import { Injectable } from '@nestjs/common';
import { DashboardCapabilityUser } from './../modules/entity/mysql/DashboardCapabilityUser';
import { RoleUserEntity } from './../modules/entity/mysql/RoleUser.entity';
import { RoleEntity } from './../modules/entity/mysql/Role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { Not, Repository } from 'typeorm';
import { DashboardCapability } from 'src/modules/entity/mysql/DashboardCapability';
import { ConfigService } from '@nestjs/config';
import { hashPassword } from 'src/modules/utils/hash';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(DashboardCapability)
    private readonly dashboardCapabilityRepository: Repository<DashboardCapability>,
    @InjectRepository(RoleUserEntity)
    private readonly roleUserRepository: Repository<RoleUserEntity>,
    @InjectRepository(DashboardCapabilityUser)
    private readonly dashboardUserRepository: Repository<DashboardCapabilityUser>,
  ) {}

  async getAccount({ token }: { token: string }) {
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string;
    const phone = prop.phone as string;
    const user = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: {
        rolesUser: { role: true },
        dashboardCapabilityUser: { dashboard_capability: true },
      },
    });
    return {
      name: user.name,
      family: user.family,
      profile: user.profile,
      role: user.rolesUser.map((val) => val.role.role_name),
      access: user.dashboardCapabilityUser.map(
        (val) => val.dashboard_capability.dashboard_capability,
      ),
    };
  }

  async getAllUser() {
    return (
      await this.userRepository.find({
        relations: {
          rolesUser: { role: true },
          dashboardCapabilityUser: { dashboard_capability: true },
        },
        where: { phone: Not('9353790881'), national_code: '98' },
      })
    ).map((user) => ({
      user_id: user.user_id,
      name: user.name,
      family: user.family,
      phone: user.phone,
      national_code: user.national_code,
      profile: user.profile,
      role: user.rolesUser.map((val) => val.role.role_name),
      access: user.dashboardCapabilityUser.map(
        (val) => val.dashboard_capability.dashboard_capability,
      ),
    }));
  }

  async getUserById(user_id: string) {
    try {
      const existUser = await this.userRepository.findOne({
        relations: {
          rolesUser: { role: true },
          dashboardCapabilityUser: { dashboard_capability: true },
        },
        where: { user_id },
      });
      return {
        user_id: existUser.user_id,
        name: existUser.name,
        family: existUser.family,
        phone: existUser.phone,
        national_code: existUser.national_code,
        profile: existUser.profile,
        update_account: existUser.update_at,
        create_account: existUser.create_at,
        role: existUser.rolesUser.map((val) => val.role.role_name),
        access: existUser.dashboardCapabilityUser.map(
          (val) => val.dashboard_capability.dashboard_capability,
        ),
      };
    } catch (ex) {
      return undefined;
    }
  }

  async createUser({
    password,
    national_code,
    phone,
    name,
    family,
  }: {
    password: string;
    national_code: string;
    phone: string;
    name?: string;
    family?: string;
  }) {
    const key = this.configService.get('App.token_hash_password');
    const hashPass = hashPassword(password, key);

    national_code = national_code === '' ? '98' : national_code;

    const exiAccount = await this.userRepository.findOne({
      where: {
        phone,
        national_code,
      },
    });
    if (!!!exiAccount) {
      // create a account
      try {
        const newAccount = this.userRepository.create({
          password: hashPass,
          phone,
          national_code,
          name,
          family,
        });
        const resultCreate = await this.userRepository.save(newAccount);
        return { create: true, user_id: resultCreate.user_id };
      } catch (error) {}
    }
    return { create: false };
  }

  async updateUserById(
    user_id: string,
    user: {
      phone: string;
      national_code: string;
      name: string;
      family: string;
    },
  ) {
    const exiAccount = await this.userRepository.findOne({
      where: {
        user_id,
      },
    });
    if (!!exiAccount) {
      const resultUpdate = await this.userRepository.update(
        { user_id },
        {
          phone: user.phone,
          national_code: user.national_code,
          name: user.name,
          family: user.family,
        },
      );
      return { update: resultUpdate.affected > 0 ? true : false };
    }
    return { update: false };
  }

  async deleteUserById(user_id: string) {
    const exiAccount = await this.userRepository.findOne({
      where: {
        user_id,
      },
    });
    if (!!exiAccount) {
      const resultDelete = await this.userRepository.delete({ user_id });
      return { delete: resultDelete.affected > 0 ? true : false };
    }
    return { delete: false };
  }

  async getDashboardCapability() {
    const result = await this.dashboardCapabilityRepository.find({
      order: { dashboard_capability: 'ASC' },
    });
    return result.map((val) => val.dashboard_capability);
  }

  async addDashboardCapabilityToUserByMobile({
    capability_name,
    national_code,
    phone,
  }: {
    capability_name: string;
    national_code: string;
    phone: string;
  }) {
    const user = await this.userRepository.findOne({
      where: { phone, national_code },
    });
    const dashboardCapability =
      await this.dashboardCapabilityRepository.findOne({
        where: { dashboard_capability: capability_name },
      });
    const exiDashboardCapability = await this.dashboardUserRepository.findOne({
      where: { user, dashboard_capability: dashboardCapability },
    });
    if (!exiDashboardCapability) {
      const newDashboardCapability = this.dashboardUserRepository.create({
        dashboard_capability: dashboardCapability,
        user,
      });
      await this.dashboardUserRepository.save(newDashboardCapability);
    }
  }

  async addDashboardCapabilityToUserById(
    user_id: string,
    dashboard_capability: string,
    admin: boolean = false,
  ) {
    const dashboardCapability =
      await this.dashboardCapabilityRepository.findOne({
        where: { dashboard_capability },
      });

    const user = await this.userRepository.findOne({ where: { user_id } });

    if (user.phone === '9353790881' && user.national_code === '98' && !admin) {
      return { add: false };
    }

    if (dashboardCapability && user) {
      const exiDashboardCapability = await this.dashboardUserRepository.findOne(
        {
          where: { user, dashboard_capability: dashboardCapability },
        },
      );

      if (!!!exiDashboardCapability) {
        const newDashboardCapability = this.dashboardUserRepository.create({
          dashboard_capability: dashboardCapability,
          user,
        });

        await this.dashboardUserRepository.save(newDashboardCapability);
        return { add: true };
      }
    }
    return { add: false };
  }

  async removeDashboardCapabilityToUser(
    user_id: string,
    dashboard_capability: string,
    admin: boolean = false,
  ) {
    const dashboardCapability =
      await this.dashboardCapabilityRepository.findOne({
        where: { dashboard_capability },
      });

    const user = await this.userRepository.findOne({ where: { user_id } });

    if (user.phone === '9353790881' && user.national_code === '98' && !admin) {
      return { add: false };
    }

    if (dashboardCapability && user) {
      const exiDashboardCapability = await this.dashboardUserRepository.findOne(
        {
          where: { user, dashboard_capability: dashboardCapability },
        },
      );

      if (!!exiDashboardCapability) {
        const newDashboardCapability =
          await this.dashboardUserRepository.findOne({
            where: {
              dashboard_capability: dashboardCapability,
              user,
            },
          });
        await this.dashboardUserRepository.delete(newDashboardCapability);
        return { remove: true };
      }
    }
    return { remove: false };
  }

  async createDashboardCapability(capability_name: string) {
    const exiDashboardCapability =
      await this.dashboardCapabilityRepository.findOne({
        where: { dashboard_capability: capability_name },
      });
    if (!exiDashboardCapability) {
      const newDashboardCapability = this.dashboardCapabilityRepository.create({
        dashboard_capability: capability_name,
      });
      await this.dashboardCapabilityRepository.save(newDashboardCapability);
    }
  }

  async addRoleUser({
    role_name,
    national_code,
    phone,
  }: {
    role_name: string;
    national_code: string;
    phone: string;
  }) {
    const account = await this.userRepository.findOne({
      where: { phone, national_code },
    });
    const role = await this.roleRepository.findOne({
      where: { role_name },
    });
    const exiRoleUser = await this.roleUserRepository.findOne({
      where: { user: account, role: role },
    });
    if (!exiRoleUser) {
      const newRoleUser = this.roleUserRepository.create({
        user: account,
        role: role,
      });
      await this.roleUserRepository.save(newRoleUser);
    }
  }

  async getAllRole() {
    return this.roleRepository.find({
      order: { role_name: 'ASC' },
      where: { role_name: Not('پشتیبان') },
      select: { role_id: true, role_name: true },
    });
  }

  async getRoleById(role_id: string) {
    return this.roleRepository.findOne({
      where: { role_id },
    });
  }

  async createRole(role_name: string) {
    const existRole = await this.roleRepository.findOne({
      where: { role_name },
    });

    if (!!!existRole) {
      const newRoleRepository = this.roleRepository.create({ role_name });
      await this.roleRepository.save(newRoleRepository);
      return { create: true };
    }
    return { create: false };
  }

  async updateRole({
    role_id,
    role_name,
  }: {
    role_id: string;
    role_name: string;
  }) {
    const existRole = await this.roleRepository.find({
      where: { role_id },
    });
    if (existRole) {
      await this.roleRepository.update({ role_id }, { role_name });
    }
    return { update: true };
  }

  async deleteRole(role_id: string) {
    await this.roleRepository.delete({ role_id });
    return { delete: true };
  }

  async getAllAccess() {
    return this.dashboardCapabilityRepository.find({
      order: { dashboard_capability: 'ASC' },
    });
  }

  async updateProfile({
    family,
    name,
    token,
  }: {
    family: string;
    name: string;
    token: string;
  }) {
    try {
      const prop = await this.jwtService.verifyAccessToken(token);
      const national_code = prop.national_code as string;
      const phone = prop.phone as string;
      await this.userRepository.update(
        { national_code, phone },
        { name, family },
      );
      return { update: true };
    } catch (error) {
      return { update: false };
    }
  }
}
