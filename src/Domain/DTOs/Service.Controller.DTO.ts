import { ApiProperty } from '@nestjs/swagger';

export class WelcomeUserDto {
  @ApiProperty({ default: 'کاربر' })
  Otp: string;

  @ApiProperty({ default: '09353790881' })
  Phone: string;
}
