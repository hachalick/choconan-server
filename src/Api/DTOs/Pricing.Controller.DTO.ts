import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  Name: string;
}

export class UpdateUnitDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  Name: string;
}

export class CreateProductPricingDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  Name: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  Buy: number;
}

export class UpdateProductPricingDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  Name: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  Buy: number;
}

export class CreateProductUnitDto {
  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  ProductPricingId: string;

  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  @IsOptional()
  ProductMenuId: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  Ratio: number;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Profit: number;

  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  UnitPricingId: string;
}

export class UpdateProductUnitDto {
  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Ratio: number;

  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  @IsOptional()
  ProductMenuId: string;

  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  UnitPricingId: string;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Profit: number;
}

export class CreateDetailPricingProductDto {
  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  ParentProductUnitId: string;

  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  @IsOptional()
  ChildProductUnitId: string;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Amount: number;
}

export class UpdateDetailPricingProductDto {
  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Amount: number;

  @ApiProperty({ type: String, default: '' })
  @IsUUID()
  ChildProductUnitDetailId: string;
}

export class CreateCostProductPricing {
  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Price: number;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Name: string;
}

export class UpdateCostProductPricing {
  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Price: number;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Name: string;
}
