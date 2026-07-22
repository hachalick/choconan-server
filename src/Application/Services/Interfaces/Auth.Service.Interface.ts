import {
  CreateRefreshTokenModel,
  LoginUserOtpModel,
  LoginUserPasswordModel,
  SetSeedDbModel,
  UpdatePasswordUserModel,
} from '../../../Domain/Models/Auth.Service.Model';
import {
  CreateRefreshTokenViewModel,
  LoginUserOtpViewModel,
  LoginUserPasswordViewModel,
  SetSeedDbViewModel,
  UpdatePasswordUserViewModel,
} from '../../../Domain/ViewModels/Auth.Service.ViewModel';

export interface IAuthService {
  SetSeedDb(Param: SetSeedDbModel): Promise<SetSeedDbViewModel>;

  LoginUserPassword(
    Param: LoginUserPasswordModel,
  ): Promise<LoginUserPasswordViewModel>;

  LoginUserOtp(Param: LoginUserOtpModel): Promise<LoginUserOtpViewModel>;

  UpdatePasswordUser(
    Param: UpdatePasswordUserModel,
  ): Promise<UpdatePasswordUserViewModel>;

  CreateRefreshToken(
    Param: CreateRefreshTokenModel,
  ): Promise<CreateRefreshTokenViewModel>;
}
