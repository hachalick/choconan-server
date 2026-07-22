export class SetSeedDbModel {}

export class CreateRefreshTokenModel {
  RefreshToken: string;
}

export class UpdatePasswordUserModel {
  AccessToken: string;
  Password: string;
}

export class LoginUserPasswordModel {
  NationalCode: string;
  Phone: string;
  Password: string;
}

export class LoginUserOtpModel {
  NationalCode: string;
  Phone: string;
  Otp: string;
}
