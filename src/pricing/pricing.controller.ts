import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PricingService } from './pricing.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCostProductPricing,
  CreateDetailPricingProductDto,
  CreateProductUnitDto,
  CreateUnitDto,
  ProductPricingDto,
  UpdateCostProductPricing,
  UpdateDetailPricingProductDto,
  UpdateProductUnitDto,
} from './pricing.dto';

@ApiTags('Pricing')
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get('unit')
  getAllUnit() {
    return this.pricingService.getAllUnit();
  }

  @Post('unit')
  createUnit(@Body() body: CreateUnitDto) {
    return this.pricingService.createUnit(body.unit_name);
  }

  @Delete('unit/:id')
  deleteUnit(@Param('id') unit_id: string) {
    return this.pricingService.deleteUnit(unit_id);
  }

  @Get('product')
  getAllProduct() {
    return this.pricingService.getAllProduct();
  }

  @Post('product')
  createProduct(@Body() body: ProductPricingDto) {
    return this.pricingService.createProduct({
      name: body.name,
      buy: body.gain,
    });
  }

  @Delete('product/:id')
  deleteProduct(@Param('id') product_id: string) {
    return this.pricingService.deleteProduct(product_id);
  }

  @Post('unit-product')
  addUnitToProduct(@Body() body: CreateProductUnitDto) {
    return this.pricingService.createUnitToProduct({
      product_id: body.product_pricing_id,
      unit_id: body.unit_id,
      ratio: body.ratio,
      product_menu_id: body.product_menu_id,
    });
  }

  @Put('unit-product/:id')
  updateUnitToProduct(
    @Param('id') product_unit_id: string,
    @Body() body: UpdateProductUnitDto,
  ) {
    return this.pricingService.updateUnitToProduct({
      product_unit_id: product_unit_id,
      ratio: body.ratio,
      product_menu_id: body.product_menu_id,
    });
  }

  @Delete('unit-product/:id')
  deleteUnitToProduct(@Param('id') product_unit_id: string) {
    return this.pricingService.deleteUnitToProduct(product_unit_id);
  }

  @Post('detail-product-unit')
  createDetailPricingProduct(
    @Body() createDetailPricingProduct: CreateDetailPricingProductDto,
  ) {
    return this.pricingService.createDetailPricingProduct({
      amount: createDetailPricingProduct.amount,
      parent_product_unit_id: createDetailPricingProduct.parent_product_unit_id,
      child_product_unit_id: createDetailPricingProduct.child_product_unit_id,
    });
  }

  @Put('detail-product-unit/:id')
  updateDetailPricingProduct(
    @Param('id') detail_product_unit_id: string,
    @Body() body: UpdateDetailPricingProductDto,
  ) {
    return this.pricingService.updateDetailPricingProduct({
      amount: body.amount,
      detail_product_unit_id,
    });
  }

  @Delete('detail-product-unit/:id')
  deleteDetailPricingProduct(@Param('id') detail_product_unit_id: string) {
    return this.pricingService.deleteDetailPricingProduct(
      detail_product_unit_id,
    );
  }

  @Post('cost') createCostProductPricing(
    @Body() body: CreateCostProductPricing,
  ) {
    return this.pricingService.createCostProductPricing({
      name: body.name,
      price: body.price,
    });
  }

  @Put('cost/:id') updateCostProductPricing(
    @Param('id') cost_pricing_id: string,
    @Body() body: UpdateCostProductPricing,
  ) {
    return this.pricingService.updateCostProductPricing({
      cost_pricing_id,
      name: body.name,
      price: body.price,
    });
  }

  @Delete('cost/:id') deleteCostProductPricing(
    @Param('id') cost_pricing_id: string,
  ) {
    return this.pricingService.deleteCostProductPricing(cost_pricing_id);
  }
}
