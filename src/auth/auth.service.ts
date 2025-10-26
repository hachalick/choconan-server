import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from 'src/modules/entity/mysql/Otp.entity';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { EDashboardCapability } from 'src/modules/enum/dashboard-capability.enum';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { createOtp } from 'src/modules/utils/createOtp';
import { hashPassword } from 'src/modules/utils/hash';
import { ServiceService } from 'src/service/service.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly serviceService: ServiceService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
  ) {}

  async setDefaultDb() {
    const key = this.configService.get('App.token_hash_password');
    const password = hashPassword('1234', key);
    const national_code = '98';

    //#region createUser and addUser

    await this.userService.createRole('پشتیبان');
    await this.userService.createUser({
      password,
      national_code,
      phone: '9353790881',
    });
    await this.userService.addRoleUser({
      national_code,
      phone: '9353790881',
      role_name: 'پشتیبان',
    });

    //#endregion

    //#region createDashboardCapability

    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_ACCOUNTING_ENTER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_ACCOUNTING_EXIT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_BLOG,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_ECONOMIC_PACKAGE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_FACTOR,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_IMAGE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_MENU_CATEGORY,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_MENU_PRODUCT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_ORDER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_ORDER_LOCATION,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_WAREHOUSE_ENTER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_WAREHOUSE_EXIT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_USER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_ACCOUNTING_EXIT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_BLOG,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_ECONOMIC_PACKAGE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_FACTOR,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_IMAGE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_MENU_CATEGORY,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_MENU_PRODUCT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_ORDER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_ORDER_LOCATION,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_WAREHOUSE_ENTER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_WAREHOUSE_EXIT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_USER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.EDIT_PASSWORD,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.EDIT_PROFILE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_ACCOUNTING_ENTER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_ACCOUNTING_EXIT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_ALL_ONLINE_SHOP,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_USER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_BLOG,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_ECONOMIC_PACKAGE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_FACTOR,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_IMAGE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_MENU_CATEGORY,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_MENU_PRODUCT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_ORDER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_ORDER_LOCATION,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_SNAP_ONLINE_SHOP,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_TAPSI_ONLINE_SHOP,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_WAREHOUSE_ENTER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_WAREHOUSE_EXIT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_ACCOUNTING_EXIT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_BLOG,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_ECONOMIC_PACKAGE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_FACTOR,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_MENU_CATEGORY,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_MENU_PRODUCT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_ORDER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_ORDER_LOCATION,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_USER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_WAREHOUSE_ENTER,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_WAREHOUSE_EXIT,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.CREATE_ROLE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.DELETE_ROLE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.UPDATE_ROLE,
    );
    await this.userService.createDashboardCapability(
      EDashboardCapability.READ_ROLE,
    );

    //#endregion

    //#region addDashboardCapabilityToUserByMobile

    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_ACCOUNTING_ENTER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_ACCOUNTING_EXIT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_BLOG,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_ECONOMIC_PACKAGE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_FACTOR,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_IMAGE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_MENU_CATEGORY,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_MENU_PRODUCT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_ORDER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_ORDER_LOCATION,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_WAREHOUSE_ENTER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_WAREHOUSE_EXIT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_USER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_ACCOUNTING_EXIT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_BLOG,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_ECONOMIC_PACKAGE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_FACTOR,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_IMAGE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_MENU_CATEGORY,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_MENU_PRODUCT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_ORDER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_ORDER_LOCATION,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_WAREHOUSE_ENTER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_WAREHOUSE_EXIT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_USER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.EDIT_PASSWORD,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.EDIT_PROFILE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_ACCOUNTING_ENTER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_ACCOUNTING_EXIT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_ALL_ONLINE_SHOP,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_USER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_BLOG,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_ECONOMIC_PACKAGE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_FACTOR,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_IMAGE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_MENU_CATEGORY,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_MENU_PRODUCT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_ORDER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_ORDER_LOCATION,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_SNAP_ONLINE_SHOP,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_TAPSI_ONLINE_SHOP,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_WAREHOUSE_ENTER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_WAREHOUSE_EXIT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_ACCOUNTING_EXIT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_BLOG,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_ECONOMIC_PACKAGE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_FACTOR,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_MENU_CATEGORY,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_MENU_PRODUCT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_ORDER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_ORDER_LOCATION,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_USER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_WAREHOUSE_ENTER,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_WAREHOUSE_EXIT,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.CREATE_ROLE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.DELETE_ROLE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.UPDATE_ROLE,
    });
    await this.userService.addDashboardCapabilityToUserByMobile({
      national_code,
      phone: '9353790881',
      capability_name: EDashboardCapability.READ_ROLE,
    });

    //#endregion

    return {
      initial: true,
    };
  }

  async loginPassword({
    national_code,
    phone,
    password,
  }: {
    national_code: string;
    phone: string;
    password: string;
  }) {
    const key = this.configService.get('App.token_hash_password');
    const hashPass = hashPassword(password, key);
    const otp = createOtp(6);
    console.log(otp);
    const account = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: { rolesUser: true },
    });
    if (account) {
      if (account.password === hashPass) {
        const existOtp = await this.otpRepository.findOne({
          where: { national_code, phone },
        });
        if (existOtp) {
          await this.otpRepository.update(
            {
              national_code,
              phone,
            },
            { otp, use: false },
          );
          await this.serviceService.sendSmsOtp({ phone, otp });
        } else {
          const newOtp = this.otpRepository.create({
            national_code,
            otp,
            phone,
            use: false,
          });
          await this.otpRepository.save(newOtp);
          await this.serviceService.sendSmsOtp({ phone, otp });
        }
        return { login: true };
      } else {
        return { login: false };
      }
    } else {
      this.userService.createUser({
        national_code,
        phone,
        password,
      });
      this.userService.addRoleUser({
        national_code,
        phone,
        role_name: '',
      });
      const existOtp = await this.otpRepository.findOne({
        where: { national_code, phone },
      });
      if (existOtp) {
        await this.otpRepository.update(
          {
            national_code,
            phone,
          },
          { otp, use: false },
        );
      } else {
        const newOtp = this.otpRepository.create({
          national_code,
          otp,
          phone,
          use: false,
        });
        await this.otpRepository.save(newOtp);
      }
      await this.serviceService.sendSmsOtp({ phone, otp });
      return { login: true };
    }
  }

  async loginOtp({
    national_code,
    phone,
    otp,
  }: {
    national_code: string;
    phone: string;
    otp: string;
  }) {
    const account = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: { rolesUser: true },
    });
    if (account) {
      const findOtp = await this.otpRepository.findOne({
        where: { national_code, phone },
      });
      if (findOtp.otp === String(otp) && findOtp.use === false) {
        await this.otpRepository.update(
          { national_code, phone },
          { use: true },
        );
        const access_token = await this.jwtService.createAccessToken({
          phone,
          national_code,
          process: account.rolesUser.length,
        });
        const refresh_token = await this.jwtService.createRefreshToken({
          phone,
          national_code,
        });
        return { login: true, access_token, refresh_token };
      } else {
        return { login: false };
      }
    } else {
      return { login: false };
    }
  }

  async updatePassword({
    new_password,
    token,
  }: {
    new_password: string;
    token: string;
  }) {
    const key = this.configService.get('App.token_hash_password');
    const hashPass = hashPassword(new_password, key);
    try {
      const prop = await this.jwtService.verifyAccessToken(token);
      const national_code = prop.national_code as string | undefined;
      const phone = prop.phone as string | undefined;
      await this.userRepository.update(
        { phone, national_code },
        { password: hashPass },
      );
      return { update: true };
    } catch (error) {
      return { update: false };
    }
  }

  async refreshToken({ token }: { token: string }) {
    const payload = await this.jwtService.verifyRefreshToken(token);
    const phone = payload.phone as string;
    const national_code = payload.national_code as string;
    const account = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: { rolesUser: true },
    });
    const access_token = await this.jwtService.createAccessToken({
      phone,
      national_code,
      process: account.rolesUser.length,
    });
    const refresh_token = await this.jwtService.createRefreshToken({
      phone,
      national_code,
    });
    return { refresh: true, access_token, refresh_token };
  }
}
