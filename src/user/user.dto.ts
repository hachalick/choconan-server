import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ default: '' })
  role_name: string;
}

export class updateProfileDto {
  @ApiProperty({ default: '' })
  @IsString()
  name: string;

  @ApiProperty({ default: '' })
  @IsString()
  family: string;
}

export class createUserDto {
  @ApiProperty({ default: '9xxxxxxxxx' })
  @IsString()
  phone: string;

  @ApiProperty({ default: '98' })
  @IsString()
  national_code: string;

  @ApiProperty({ default: '' })
  @IsString()
  name: string;

  @ApiProperty({ default: '' })
  @IsString()
  family: string;
}

export class UpdateUserDto {
  @ApiProperty({ default: '9xxxxxxxxx' })
  @IsString()
  phone: string;

  @ApiProperty({ default: '98' })
  @IsString()
  national_code: string;

  @ApiProperty({ default: '' })
  @IsString()
  name: string;

  @ApiProperty({ default: '' })
  @IsString()
  family: string;
}

export class UpdateDashboardCapabilityDto {
  @ApiProperty({ default: '' })
  @IsString()
  user_id: string;

  @ApiProperty({ default: '' })
  @IsString()
  dashboard_capability: string;
}
