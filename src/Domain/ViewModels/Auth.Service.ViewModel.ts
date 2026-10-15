import { ApiProperty } from '@nestjs/swagger';
import {
  BaseCreateViewModel,
  BaseUpdateViewModel,
} from './Seed/Base.Service.ViewModel.js';

export class SetSeedDbViewModel extends BaseCreateViewModel {}

export class CreateRefreshTokenViewModel extends BaseCreateViewModel {
  @ApiProperty()
  AccessToken: string;
  
  @ApiProperty()
  RefreshToken: string;
}

export class UpdatePasswordUserViewModel extends BaseUpdateViewModel {}

export class LoginUserPasswordViewModel extends BaseCreateViewModel {}

export class LoginUserOtpViewModel {
  @ApiProperty()
  AccessToken: string;

  @ApiProperty()
  RefreshToken: string;
}
