import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ default: '' })
  Name: string;
}

export class UpdateProfileDto {
  @ApiProperty({ default: '' })
  @IsString()
  Name: string;

  @ApiProperty({ default: '' })
  @IsString()
  Family: string;
}

export class CreateUserDto {
  @ApiProperty({ default: '9xxxxxxxxx' })
  @IsString()
  Phone: string;

  @ApiProperty({ default: '98' })
  @IsString()
  NationalCode: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsOptional()
  Name?: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsOptional()
  Family?: string;
}

export class UpdateUserDto {
  @ApiProperty({ default: '9xxxxxxxxx' })
  @IsString()
  Phone: string;

  @ApiProperty({ default: '98' })
  @IsString()
  NationalCode: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsOptional()
  Name?: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsOptional()
  Family?: string;

  @ApiProperty({ default: '' })
  @IsString()
  Profile: string;
}

export class CreateDashboardCapabilityUserDto {
  @ApiProperty({ default: '' })
  @IsString()
  UserId: string;

  @ApiProperty({ default: '' })
  @IsString()
  DashboardCapabilityId: string;
}

export class DeleteDashboardCapabilityUserDto {
  @ApiProperty({ default: '' })
  @IsString()
  UserId: string;

  @ApiProperty({ default: '' })
  @IsString()
  DashboardCapabilityId: string;
}
