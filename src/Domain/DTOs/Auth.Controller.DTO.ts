import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginOtpDto {
  @ApiProperty({ default: '98', type: 'string', minLength: 1, maxLength: 3 })
  @IsString()
  @MaxLength(3)
  @MinLength(1)
  NationalCode: string;

  @ApiProperty({ default: '9XXXXXXXXX', minLength: 10, maxLength: 10 })
  @IsString()
  @Length(10)
  Phone: string;

  @ApiProperty({ default: '1111', minLength: 4 })
  @IsString()
  @MinLength(4)
  Otp: string;
}

export class LoginPasswordDto {
  @ApiProperty({ default: '98', type: 'string', minLength: 1, maxLength: 3 })
  @IsString()
  @MaxLength(3)
  @MinLength(1)
  NationalCode: string;

  @ApiProperty({ default: '9XXXXXXXXX', minLength: 10, maxLength: 10 })
  @IsString()
  @Length(10)
  Phone: string;

  @ApiProperty({ default: 'asdf', minLength: 4 })
  @IsString()
  @MinLength(4)
  Password: string;
}

export class ResetPasswordDto {
  // @ApiProperty({ default: 'asdf', minLength: 4 })
  // @IsString()
  // @MinLength(4)
  // old_password: string;

  @ApiProperty({ default: 'asdf', minLength: 4 })
  @IsString()
  @MinLength(4)
  Password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ default: 'asdf', minLength: 4 })
  @IsString()
  @IsNotEmpty()
  RefreshToken: string;
}
