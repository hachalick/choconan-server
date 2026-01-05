import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({ type: 'string' })
  unit_name: string;
}

export class ProductPricingDto {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  gain: number;
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
}

export class UpdateProductUnitDto {
  @ApiProperty({ type: 'number' })
  ratio: number;

  @ApiProperty({ type: 'string' })
  product_menu_id: string;
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
