import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

export class OrderTableDto {
  @ApiProperty({ default: [{ count: 1, product_id: '' }] })
  @IsArray()
  Orders: { Count: number; ProductId: string }[];
}

export class ReadOrderMonthlyListDto {
  @ApiProperty({ default: 12 })
  @IsInt()
  Count: number;

  @ApiProperty({ default: 0 })
  @IsInt()
  Space: number;
}

export class UpdateOrderDto {
  @IsString()
  @ApiProperty({ type: String, default: '' })
  CustomerMobile: string;

  @ApiProperty({ type: Number, default: 1 })
  @IsNumber()
  FactorNumber: number;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  Tax: number;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  Location: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  FactorDate: string;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  IsPay: boolean;
}

export class UpdateOrderItemDto {
  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  ProductCount: number;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  ProductDiscount: number;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  ProductName: string;

  @ApiProperty({ type: Number, default: 0 })
  @IsNumber()
  ProductPrice: number;
}
