import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import {
  EAccountTransaction,
  ETransaction,
} from 'src/modules/enum/transaction.enum';

export class OrderTableDto {
  @ApiProperty({ default: [{ count: 1, product_id: '' }] })
  list_order: { count: number; product_id: string }[];
}

// @ApiProperty({ default: [{ count: 1, product_id: '', discount: 0 }] })
// list_order: { count: number; product_id: string; discount: number }[];

// @ApiProperty({
//   default: [{ type: ETransaction, account: EAccountTransaction }],
// })
// transaction: { type: ETransaction; account: EAccountTransaction }[];

export class UpdateOrderDto {
  @IsString()
  @ApiProperty({ type: String, default: '' })
  customer_mobile: string;

  @IsNumber()
  @ApiProperty({ type: Number, default: 1 })
  factor_number: number;

  @IsNumber()
  @ApiProperty({ type: Number, default: 0 })
  tax: number;

  @IsString()
  @ApiProperty({ type: String, default: '' })
  location: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean, default: false })
  pay_status: boolean;
}

export class UpdateOrderItemDto {
  @IsNumber()
  @ApiProperty({ type: Number, default: 0 })
  product_count: number;

  @IsNumber()
  @ApiProperty({ type: Number, default: 0 })
  product_discount: number;

  @IsString()
  @ApiProperty({ type: String, default: '' })
  product_name: string;

  @IsNumber()
  @ApiProperty({ type: Number, default: 0 })
  product_price: number;
}
