import {
  PayloadAccessTokenModel,
  PayloadRefreshTokenModel,
} from '../../../Domain/Models/Jwt.Service.Model';
import {
  PayloadAccessTokenViewModel,
  PayloadRefreshTokenViewModel,
} from '../../../Domain/ViewModels/Jwt.Service.ViewModel';

export interface IJwtService {
  CreateRefreshToken(Param: PayloadAccessTokenModel): Promise<string>;

  CreateAccessToken(Param: PayloadRefreshTokenModel): Promise<string>;

  VerifyRefreshToken(token: string): Promise<PayloadRefreshTokenViewModel>;

  VerifyAccessToken(token: string): Promise<PayloadAccessTokenViewModel>;
}
