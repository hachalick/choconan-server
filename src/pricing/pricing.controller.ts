import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PricingService } from './pricing.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCostProductPricing,
  CreateDetailPricingProductDto,
  CreateProductPricingDto,
  CreateProductUnitDto,
  CreateUnitDto,
  UpdateCostProductPricing,
  UpdateDetailPricingProductDto,
  UpdateProductPricingDto,
  UpdateProductUnitDto,
  UpdateUnitDto,
} from './pricing.dto';
import {
  CheckDashboardCapabilityGuard,
  CheckNotExpiresTokenGuard,
} from 'src/auth/auth.guard';

@ApiTags('Pricing')
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get('unit')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  getAllUnit(@Headers('access_token') access_token: string) {
    return this.pricingService.getAllUnit();
  }

  @Post('unit')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  createUnit(
    @Headers('access_token') access_token: string,
    @Body() body: UpdateUnitDto,
  ) {
    return this.pricingService.updateUnit({
      name: body.unit_name,
      product_unit_id: body.product_unit_id,
    });
  }

  @Put('unit/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateUnit(
    @Headers('access_token') access_token: string,
    @Param('id') unit_id: string,
  ) {
    return this.pricingService.deleteUnit(unit_id);
  }

  @Delete('unit/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteUnit(
    @Headers('access_token') access_token: string,
    @Param('id') unit_id: string,
  ) {
    return this.pricingService.deleteUnit(unit_id);
  }

  @Get('product')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  getAllProduct(@Headers('access_token') access_token: string) {
    return this.pricingService.getAllProduct();
  }

  @Post('product')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  createProduct(
    @Headers('access_token') access_token: string,
    @Body() body: CreateProductPricingDto,
  ) {
    return this.pricingService.createProduct({
      name: body.name,
      buy: body.buy,
    });
  }

  @Put('product/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateProduct(
    @Headers('access_token') access_token: string,
    @Param('id') product_id: string,
    @Body() body: UpdateProductPricingDto,
  ) {
    return this.pricingService.updateProduct({
      product_id,
      buy: body.buy,
      name: body.name,
    });
  }

  @Delete('product/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteProduct(
    @Headers('access_token') access_token: string,
    @Param('id') product_id: string,
  ) {
    return this.pricingService.deleteProduct(product_id);
  }

  @Post('unit-product')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  addUnitToProduct(
    @Headers('access_token') access_token: string,
    @Body() body: CreateProductUnitDto,
  ) {
    return this.pricingService.createUnitToProduct({
      product_id: body.product_pricing_id,
      unit_id: body.unit_id,
      ratio: body.ratio,
      product_menu_id: body.product_menu_id,
    });
  }

  @Put('unit-product/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateUnitToProduct(
    @Headers('access_token') access_token: string,
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
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteUnitToProduct(
    @Headers('access_token') access_token: string,
    @Param('id') product_unit_id: string,
  ) {
    return this.pricingService.deleteUnitToProduct(product_unit_id);
  }

  @Post('detail-product-unit')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  createDetailPricingProduct(
    @Headers('access_token') access_token: string,
    @Body() createDetailPricingProduct: CreateDetailPricingProductDto,
  ) {
    return this.pricingService.createDetailPricingProduct({
      amount: createDetailPricingProduct.amount,
      parent_product_unit_id: createDetailPricingProduct.parent_product_unit_id,
      child_product_unit_id: createDetailPricingProduct.child_product_unit_id,
    });
  }

  @Put('detail-product-unit/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateDetailPricingProduct(
    @Headers('access_token') access_token: string,
    @Param('id') detail_product_unit_id: string,
    @Body() body: UpdateDetailPricingProductDto,
  ) {
    return this.pricingService.updateDetailPricingProduct({
      amount: body.amount,
      detail_product_unit_id,
    });
  }

  @Delete('detail-product-unit/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteDetailPricingProduct(
    @Headers('access_token') access_token: string,
    @Param('id') detail_product_unit_id: string,
  ) {
    return this.pricingService.deleteDetailPricingProduct(
      detail_product_unit_id,
    );
  }

  @Post('cost')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  createCostProductPricing(
    @Headers('access_token') access_token: string,
    @Body() body: CreateCostProductPricing,
  ) {
    return this.pricingService.createCostProductPricing({
      name: body.name,
      price: body.price,
    });
  }

  @Put('cost/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateCostProductPricing(
    @Headers('access_token') access_token: string,
    @Param('id') cost_pricing_id: string,
    @Body() body: UpdateCostProductPricing,
  ) {
    return this.pricingService.updateCostProductPricing({
      cost_pricing_id,
      name: body.name,
      price: body.price,
    });
  }

  @Delete('cost/:id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteCostProductPricing(
    @Headers('access_token') access_token: string,
    @Param('id') cost_pricing_id: string,
  ) {
    return this.pricingService.deleteCostProductPricing(cost_pricing_id);
  }
}
