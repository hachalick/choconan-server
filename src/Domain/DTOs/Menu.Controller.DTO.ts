import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMenuCategoryDto {
  @ApiProperty({ type: String, default: '' })
  @IsString()
  Name: string;

  @ApiProperty({ type: String, default: '' })
  @IsBoolean()
  IsShowMenu: boolean;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  MetaTitle: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  MetaDescription: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Icon: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Description: string;
}

export class UpdateMenuCategoryDto {
  @ApiProperty({ type: String, default: '' })
  @IsString()
  Name: string;

  @ApiProperty({ type: String, default: '' })
  @IsBoolean()
  IsShowMenu: boolean;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  MetaTitle: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  MetaDescription: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Icon: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Description: string;
}

export class CreateProductMenuDto {
  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  CategoryId: string;

  @ApiProperty({ type: Boolean, default: true })
  @IsBoolean()
  IsShowMenu: boolean;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  MetaTitle: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  MetaDescription: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Name: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Description: string;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Price: number;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Waiting: number;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  SnapId: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  TapsiId: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  SrcImage: string;
}

export class UpdateProductMenuDto {
  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  CategoryId: string;

  @ApiProperty({ type: Boolean, default: true })
  @IsBoolean()
  IsShowMenu: boolean;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  MetaTitle: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  MetaDescription: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Name: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Description: string;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Price: number;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Waiting: number;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  @IsOptional()
  SnapId: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  @IsOptional()
  TapsiId: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  SrcImage: string;
}

export class CreateEconomicPackage {
  @ApiProperty({ type: Boolean, default: true })
  @IsBoolean()
  IsShowMenu: boolean;

  @ApiProperty({ type: String, default: '/default.jpg' })
  @IsString()
  SrcImage: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Title: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  StartDate: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  EndDate: string;

  @ApiProperty({ type: Number, default: 0 })
  @IsDecimal()
  Price: number;
}

export class UpdateEconomicPackage {
  @ApiProperty({ type: Boolean, default: true })
  @IsBoolean()
  IsShowMenu: boolean;

  @ApiProperty({ type: String, default: '/default.jpg' })
  @IsString()
  SrcImage: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Title: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  StartDate: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  EndDate: string;

  @ApiProperty({ type: Number, default: 0 })
  @IsDecimal()
  Price: number;
}

export class CreateContentEconomicPackage {
  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  EconomicPackageId: string;

  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  ProductId: string;

  @ApiProperty({ type: Number, default: 1 })
  @IsDecimal()
  Count: number;
}

export class DeleteContentEconomicPackage {
  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  EconomicPackageId: string;

  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  ProductId: string;

  @ApiProperty({ type: Number, default: 1 })
  @IsDecimal()
  Count: number;
}
