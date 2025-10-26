import { ApiProperty } from '@nestjs/swagger';

export class WelcomeUserDto {
  @ApiProperty({ default: 'کاربر' })
  fullname: string;

  @ApiProperty({ default: '09353790881' })
  phone: string;
}
