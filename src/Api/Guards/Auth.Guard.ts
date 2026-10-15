import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { JOSEError } from 'jose/errors';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { HttpExceptionMessageCustom } from '../../Domain/Constants/HttpExceptionMessageCustom.js';
import { HttpExceptionCustom } from '../Exceptions/HttpExceptionCustom.js';
import { JwtService } from '../../Application/Services/Jwt.Service.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { EDashboardCapability } from '../../Domain/Enum/DashboardCapability.Enum.js';
import { DASHBOARD_CAPABILITY_KEY } from '../Decorators/DashboardCapability.Decorator.js';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

@Injectable()
export class CheckExistAccessTokenInHeaderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const AccessToken = request.headers['access_token'] as string;

    if (!AccessToken) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.TokenNotFound,
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}

@Injectable()
export class CheckIsExpiresTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const AccessToken = request.headers['access_token'] as string;

    if (AccessToken) {
      try {
        await this.jwtService.VerifyAccessToken(AccessToken);
      } catch (error) {
        if (error instanceof JOSEError && error.message === 'expired_token') {
          return true;
        }
      }
    }

    throw new HttpExceptionCustom(
      HttpExceptionMessageCustom.TokenIsNotExpires,
      HttpStatus.BAD_REQUEST,
    );
  }
}

@Injectable()
export class CheckNotExpiresTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const AccessToken = request.headers['access_token'] as string;

    if (AccessToken) {
      try {
        await this.jwtService.VerifyAccessToken(AccessToken);
      } catch {
        throw new HttpExceptionCustom(
          HttpExceptionMessageCustom.TokenIsExpires,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return true;
  }
}

@Injectable()
export class DashboardCapabilityGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,

    @InjectRepository(UserEntity, ConnectionNameMysql.global)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this.reflector.get<{
      tokenKey: string;
      capability: EDashboardCapability;
    }>(DASHBOARD_CAPABILITY_KEY, context.getHandler());

    if (!metadata) {
      return true;
    }

    const { tokenKey, capability } = metadata;
    const request = context.switchToHttp().getRequest();

    const token = request.headers[tokenKey.toLowerCase()];

    if (!token) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.AccessDenied,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = await this.jwtService.VerifyAccessToken(token);

    const user = await this.UserRepository.findOne({
      relations: { DashboardCapabilityUser: { DashboardCapability: true } },
      where: {
        NationalCode: payload.NationalCode,
        Phone: payload.Phone,
      },
    });

    if (!user) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserNotFound,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const hasCapability = user.DashboardCapabilityUser?.some(
      (dcu) => dcu.DashboardCapability?.Name === (capability as string),
    );

    if (!hasCapability) {
      throw new HttpExceptionCustom(
        HttpExceptionMessageCustom.UserAccessDenied,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
