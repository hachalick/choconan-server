import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignJWT, jwtVerify } from 'jose';
import {
  ApplicationConfigurationKeys,
  ApplicationConfigurationValues,
} from 'src/Share/Configuration/Parameter/Application.Configuration';
import { IJwtService } from './Interfaces/Jwt.Service.Interface';
import {
  PayloadAccessTokenModel,
  PayloadRefreshTokenModel,
} from '../../Domain/Models/Jwt.Service.Model';
import {
  PayloadAccessTokenViewModel,
  PayloadRefreshTokenViewModel,
} from '../../Domain/ViewModels/Jwt.Service.ViewModel';
import { z } from 'zod';

const PayloadAccessTokenSchema = z.object({
  NationalCode: z.string(),
  Phone: z.string(),
  iss: z.string().optional(),
  sub: z.string().optional(),
  aud: z.union([z.string(), z.array(z.string())]).optional(),
  jti: z.string().optional(),
  nbf: z.number().optional(),
  exp: z.number().optional(),
  iat: z.number().optional(),
});

const PayloadRefreshTokenSchema = z.object({
  NationalCode: z.string(),
  Phone: z.string(),
  iss: z.string().optional(),
  sub: z.string().optional(),
  aud: z.union([z.string(), z.array(z.string())]).optional(),
  jti: z.string().optional(),
  nbf: z.number().optional(),
  exp: z.number().optional(),
  iat: z.number().optional(),
});

@Injectable()
export class JwtService implements IJwtService {
  protected secretAccess: Uint8Array;
  protected secretRefresh: Uint8Array;

  constructor(private configService: ConfigService) {
    const token_AccessToken = this.configService.get<string>(
      `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.KEY_ACCESS_TOKEN}`,
    );
    const token_refresh_token = this.configService.get<string>(
      `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.KEY_REFRESH_TOKEN}`,
    );
    this.secretAccess = new TextEncoder().encode(token_AccessToken);
    this.secretRefresh = new TextEncoder().encode(token_refresh_token);
  }

  async CreateRefreshToken(Param: PayloadAccessTokenModel): Promise<string> {
    const time = this.configService.get<string>(
      `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.KEY_TIME_REFRESH_TOKEN}`,
    );
    const token = await new SignJWT({ ...Param })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('refresh')
      .setIssuer('example.com')
      .setAudience('user')
      .setExpirationTime(time)
      .setIssuedAt()
      .sign(this.secretRefresh);
    return token;
  }

  private isPayloadRefreshTokenViewModel(payload: unknown): boolean {
    try {
      PayloadRefreshTokenSchema.parse(payload);
      return true;
    } catch (error) {
      return false;
    }
  }

  async VerifyRefreshToken(
    token: string,
  ): Promise<PayloadRefreshTokenViewModel> {
    const { payload } = await jwtVerify(token, this.secretRefresh);

    if (!this.isPayloadRefreshTokenViewModel(payload)) {
      throw new Error('Invalid payload type');
    }

    return payload as PayloadRefreshTokenViewModel;
  }

  async CreateAccessToken(Param: PayloadRefreshTokenModel): Promise<string> {
    const time = this.configService.get<string>(
      `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.KEY_TIME_ACCESS_TOKEN}`,
    );
    const token = await new SignJWT({ ...Param })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('access')
      .setIssuer('example.com')
      .setAudience('user')
      .setExpirationTime(time)
      .setIssuedAt()
      .sign(this.secretAccess);
    return token;
  }

  private isPayloadAccessTokenViewModel(payload: unknown): boolean {
    try {
      PayloadAccessTokenSchema.parse(payload);
      return true;
    } catch (error) {
      return false;
    }
  }

  async VerifyAccessToken(token: string): Promise<PayloadAccessTokenViewModel> {
    const { payload } = await jwtVerify(token, this.secretAccess);

    if (!this.isPayloadAccessTokenViewModel(payload)) {
      throw new Error('Invalid payload type');
    }

    return payload as PayloadAccessTokenViewModel;
  }
}
