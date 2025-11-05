import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { OtpEntity } from 'src/modules/entity/mysql/Otp.entity';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { EDashboardCapability } from 'src/modules/enum/dashboard-capability.enum';
import { EMessageHttpException } from 'src/modules/enum/message-http-exception.enum';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { hashPassword } from 'src/modules/utils/hash';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

@Injectable()
export class SignUpGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { national_code, phone }: { national_code: string; phone: string } =
      request.body;
    if (national_code === undefined && phone === undefined) {
      return true;
    }
    const find = await this.userRepository.findOne({
      where: { national_code, phone },
    });
    if (find) {
      throw new HttpException(
        EMessageHttpException.USER_FOUND,
        HttpStatus.BAD_GATEWAY,
      );
    }
    return true;
  }
}

@Injectable()
export class LoginPasswordGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { national_code, phone }: { national_code: string; phone: string } =
      request.body;
    if (national_code === undefined && phone === undefined) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_GATEWAY,
      );
    }
    return true;
  }
}

@Injectable()
export class LoginOtpGuard implements CanActivate {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      national_code,
      phone,
      otp,
    }: { national_code: string; phone: string; otp: string } = request.body;
    if (national_code === undefined && phone === undefined) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_GATEWAY,
      );
    } else {
      const resOtp = await this.otpRepository.findOne({
        where: { national_code, phone },
      });
      if (!otp) {
        throw new HttpException(
          EMessageHttpException.USER_NOT_FOUND,
          HttpStatus.BAD_GATEWAY,
        );
      } else if (resOtp.otp !== otp) {
        console.log(resOtp.otp, otp);
        throw new HttpException(
          EMessageHttpException.OTP_FILED,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class ResetPasswordGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      old_password,
      new_password,
    }: {
      old_password: string;
      new_password: string;
    } = request.body;
    const { token }: { token?: string } = request.query;
    if (new_password === undefined && old_password === undefined) {
      return true;
    }
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string | undefined;
    const phone = prop.phone as string | undefined;
    const find = await this.userRepository.findOne({
      where: { national_code, phone },
    });
    if (!find) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_GATEWAY,
      );
    }
    const key = this.configService.get('App.token_hash_password');
    const hashPass = hashPassword(old_password, key);
    if (hashPass !== find.password) {
      throw new HttpException(
        EMessageHttpException.PASSWORD_INCORRECT,
        HttpStatus.BAD_GATEWAY,
      );
    }
    return true;
  }
}

@Injectable()
export class ExistTokenInParamGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.params;
    if (!token)
      throw new HttpException(
        EMessageHttpException.TOKEN_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    else {
      try {
        await this.jwtService.verifyRefreshToken(token);
      } catch (error) {
        throw new HttpException(
          EMessageHttpException.LOGIN_AGAIN,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class CheckIsExpiresTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    if (!token)
      throw new HttpException(
        EMessageHttpException.TOKEN_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    else {
      try {
        await this.jwtService.verifyAccessToken(token);
        throw new HttpException(
          EMessageHttpException.TOKEN_IS_NOT_EXPIRES,
          HttpStatus.BAD_REQUEST,
        );
      } catch (error) {
        return true;
      }
    }
  }
}

@Injectable()
export class CheckNotExpiresTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    if (!token)
      throw new HttpException(
        EMessageHttpException.TOKEN_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    else {
      try {
        await this.jwtService.verifyAccessToken(token);
      } catch (error) {
        throw new HttpException(
          EMessageHttpException.LOGIN_AGAIN,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class CheckSupportRoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string | undefined;
    const phone = prop.phone as string | undefined;
    if (!national_code && !phone) {
      throw new HttpException(
        EMessageHttpException.LOGIN_AGAIN,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: { rolesUser: { role: true } },
    });
    if (!user) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const roleUser = user.rolesUser.find(
        (a) => a.role.role_name === 'پشتیبان',
      );
      if (!roleUser) {
        throw new HttpException(
          EMessageHttpException.ACCESS_DENIED,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class CheckExistAccountGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string | undefined;
    const phone = prop.phone as string | undefined;
    if (!national_code && !phone) {
      throw new HttpException(
        EMessageHttpException.LOGIN_AGAIN,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({
      where: { phone, national_code },
    });
    if (!user) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}

@Injectable()
export class CheckDashboardCapabilityGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token }: { token?: string } = request.query;
    const prop = await this.jwtService.verifyAccessToken(token);
    const national_code = prop.national_code as string | undefined;
    const phone = prop.phone as string | undefined;
    if (!national_code && !phone) {
      throw new HttpException(
        EMessageHttpException.LOGIN_AGAIN,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({
      where: { phone, national_code },
      relations: {
        rolesUser: { role: true },
        dashboardCapabilityUser: { dashboard_capability: true },
      },
    });
    if (!user) {
      throw new HttpException(
        EMessageHttpException.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const route = request.route.path as string;
      const method = (request.method as string).toLowerCase();
      let isAccess = false;

      isAccess =
        isAccess ||
        (route.startsWith('/service/sms/welcome-user') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.SEND_SMS_WELCOME));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/table/') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_ORDER_LOCATION));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/table/') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_ORDER_LOCATION));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/status-table/accept/') &&
          method === 'put' &&
          this.isAccess(user, EDashboardCapability.UPDATE_ORDER_LOCATION));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/status-table/') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_ORDER_LOCATION));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/order') &&
          method === 'get' &&
          this.isAccess(user, EDashboardCapability.CREATE_ORDER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/order') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_ORDER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/order/') &&
          method === 'put' &&
          this.isAccess(user, EDashboardCapability.UPDATE_ORDER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/order/') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_ORDER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/order-item/') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_ORDER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/order-item/') &&
          method === 'put' &&
          this.isAccess(user, EDashboardCapability.UPDATE_ORDER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/order/order-item/') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_ORDER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/user') &&
          method === 'get' &&
          this.isAccess(user, EDashboardCapability.READ_USER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/user') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.READ_USER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/user') &&
          method === 'put' &&
          this.isAccess(user, EDashboardCapability.READ_USER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/user') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.READ_USER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/dashboard-capability') &&
          method === 'get' &&
          this.isAccess(user, EDashboardCapability.READ_USER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/dashboard-capability') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.READ_USER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/dashboard-capability') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.READ_USER));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/role') &&
          method === 'get' &&
          this.isAccess(user, EDashboardCapability.READ_ROLE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/role') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_ROLE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/role') &&
          method === 'put' &&
          this.isAccess(user, EDashboardCapability.UPDATE_ROLE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/user/role') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_ROLE));

      if (isAccess) return isAccess;

      // isAccess =
      //   isAccess ||
      //   (route.startsWith('/user/access') &&
      //     method === 'get' &&
      //     this.isAccess(user, EDashboardCapability.READ_));

      // if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/category-menu') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_MENU_CATEGORY));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/category-menu/') &&
          method === 'put' &&
          this.isAccess(user, EDashboardCapability.UPDATE_MENU_CATEGORY));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/category-menu/') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_MENU_CATEGORY));

      if (isAccess) return isAccess;

      console.log(route)

      isAccess =
        isAccess ||
        (route.startsWith('/menu/product-menu/') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_MENU_PRODUCT));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/product-menu/') &&
          method === 'put' &&
          this.isAccess(user, EDashboardCapability.UPDATE_MENU_PRODUCT));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/product-menu/') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_MENU_PRODUCT));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/economic-package') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_ECONOMIC_PACKAGE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/economic-package/') &&
          method === 'put' &&
          this.isAccess(user, EDashboardCapability.UPDATE_ECONOMIC_PACKAGE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/economic-package/') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_ECONOMIC_PACKAGE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/content-economic-package') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_ECONOMIC_PACKAGE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/menu/content-economic-package/') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_ECONOMIC_PACKAGE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/file/excel-menu') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_IMAGE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/file/image') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_IMAGE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/file/image-product') &&
          method === 'post' &&
          this.isAccess(user, EDashboardCapability.CREATE_IMAGE));

      if (isAccess) return isAccess;

      isAccess =
        isAccess ||
        (route.startsWith('/file/image/') &&
          method === 'delete' &&
          this.isAccess(user, EDashboardCapability.DELETE_IMAGE));

      if (isAccess) return isAccess;

      if (!isAccess) {
        throw new HttpException(
          EMessageHttpException.ACCESS_DENIED,
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }
    return true;
  }

  private isAccess(
    user: UserEntity,
    dashboard_capability: EDashboardCapability,
  ) {
    return !!user.dashboardCapabilityUser.find(
      (val) =>
        val.dashboard_capability.dashboard_capability === dashboard_capability,
    );
  }
}
