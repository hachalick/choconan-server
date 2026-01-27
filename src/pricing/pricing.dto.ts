import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({ type: 'string' })
  unit_name: string;
}

export class UpdateUnitDto {
  @ApiProperty({ type: 'string' })
  unit_name: string;

  @ApiProperty({ type: 'string' })
  product_unit_id: string;
}

export class CreateProductPricingDto {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  buy: number;
}

export class UpdateProductPricingDto {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  buy: number;
}

export class CreateProductUnitDto {
  @ApiProperty({ type: 'string' })
  unit_id: string;

  @ApiProperty({ type: 'string' })
  product_pricing_id: string;

  @ApiProperty({ type: 'string' })
  product_menu_id: string;

  @ApiProperty({ type: 'number' })
  ratio: number;

  @ApiProperty({ type: 'number' })
  profit: number;
}

export class UpdateProductUnitDto {
  @ApiProperty({ type: 'number' })
  ratio: number;

  @ApiProperty({ type: 'string' })
  product_menu_id: string;

  @ApiProperty({ type: 'string' })
  profit: number;

  @ApiProperty({ type: 'string' })
  unit_id: string;
}

export class CreateDetailPricingProductDto {
  @ApiProperty({ type: 'string' })
  parent_product_unit_id: string;

  @ApiProperty({ type: 'string' })
  child_product_unit_id: string;

  @ApiProperty({ type: 'number' })
  amount: number;
}

export class UpdateDetailPricingProductDto {
  @ApiProperty({ type: 'number' })
  amount: number;

  @ApiProperty({ type: 'string' })
  product_unit_id: string;
}

export class CreateCostProductPricing {
  @ApiProperty({ type: 'number' })
  price: number;

  @ApiProperty({ type: 'string' })
  name: string;
}

export class UpdateCostProductPricing {
  @ApiProperty({ type: 'number' })
  price: number;

  @ApiProperty({ type: 'string' })
  name: string;
}
