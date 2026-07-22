import {
  BaseCreateViewModel,
  BaseUpdateViewModel,
} from './Seed/Base.Service.ViewModel';

export class SetSeedDbViewModel extends BaseCreateViewModel {}

export class CreateRefreshTokenViewModel extends BaseCreateViewModel {
  AccessToken: string;
  RefreshToken: string;
}

export class UpdatePasswordUserViewModel extends BaseUpdateViewModel {}

export class LoginUserPasswordViewModel extends BaseCreateViewModel {}

export class LoginUserOtpViewModel {
  AccessToken: string;
  RefreshToken: string;
}
