import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
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
} from '../DTOs/Pricing.Controller.DTO';
import {
  CheckExistAccessTokenInHeaderGuard,
  CheckNotExpiresTokenGuard,
} from '../Guards/Auth.Guard';
import { DashboardCapabilityGuard } from '../Decorators/DashboardCapability.Decorator';
import { EDashboardCapability } from 'src/Share/Enum/DashboardCapability.Enum';
import { PricingService } from 'src/Application/Services/Pricing.Service';

@ApiTags('Pricing')
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get('unit')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.READ_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadUnitPricingList(@Headers('access_token') AccessToken: string) {
    return this.pricingService.ReadUnitPricingList({});
  }

  @Get('unit/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.READ_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadUnitPricingDetail(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.pricingService.ReadUnitPricingDetail({ Id: id });
  }

  @Post('unit')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateUnitPricing(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateUnitDto,
  ) {
    return this.pricingService.CreateUnitPricing({ Name: body.Name });
  }

  @Put('unit/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.UPDATE_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateUnitPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUnitDto,
  ) {
    return this.pricingService.UpdateUnitPricing({
      Id: id,
      Name: body.Name,
    });
  }

  @Delete('unit/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteUnitPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.pricingService.DeleteUnitPricing({ Id: id });
  }

  @Get('product')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.READ_PRODUCT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadProductPricingList(@Headers('access_token') AccessToken: string) {
    return this.pricingService.ReadProductPricingList({});
  }

  @Post('product')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_PRODUCT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateProductPricing(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateProductPricingDto,
  ) {
    return this.pricingService.CreateProductPricing({
      Buy: body.Buy,
      Name: body.Name,
    });
  }

  @Put('product/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.UPDATE_PRODUCT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateProductPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductPricingDto,
  ) {
    return this.pricingService.UpdateProductPricing({
      Id: id,
      Buy: body.Buy,
      Name: body.Name,
    });
  }

  @Delete('product/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_PRODUCT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteProductPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.pricingService.DeleteProductPricing({ Id: id });
  }

  @Post('unit-product')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_PRODUCT_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateProductUnitPricing(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateProductUnitDto,
  ) {
    return this.pricingService.CreateProductUnitPricing({
      ProductPricingId: body.ProductPricingId,
      UnitPricingId: body.UnitPricingId,
      Ratio: body.Ratio,
      ProductMenuId: body.ProductMenuId,
      Profit: body.Profit,
    });
  }

  @Put('unit-product/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.UPDATE_PRODUCT_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateProductUnitPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductUnitDto,
  ) {
    return this.pricingService.UpdateProductUnitPricing({
      Id: id,
      Profit: body.Profit,
      ProductMenuId: body.ProductMenuId,
      Ratio: body.Ratio,
      UnitPricingId: body.UnitPricingId,
    });
  }

  @Delete('unit-product/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_PRODUCT_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteProductUnitPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.pricingService.DeleteProductUnitPricing({ Id: id });
  }

  @Post('detail-product-unit')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_DETAIL_PRODUCT_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateDetailProductPricing(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateDetailPricingProductDto,
  ) {
    return this.pricingService.CreateDetailProductPricing({
      Amount: body.Amount,
      ParentProductUnitDetailId: body.ParentProductUnitId,
      ChildProductUnitDetailId: body.ChildProductUnitId,
    });
  }

  @Put('detail-product-unit/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.UPDATE_DETAIL_PRODUCT_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateDetailProductPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateDetailPricingProductDto,
  ) {
    return this.pricingService.UpdateDetailProductPricing({
      Id: id,
      Amount: body.Amount,
      ChildProductUnitDetailId: body.ChildProductUnitDetailId,
    });
  }

  @Delete('detail-product-unit/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_DETAIL_PRODUCT_UNIT_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteDetailProductPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.pricingService.DeleteDetailProductPricing({ Id: id });
  }

  @Get('cost')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_COST_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadCostProductPricingList(@Headers('access_token') AccessToken: string) {
    return this.pricingService.ReadCostProductPricingList({});
  }

  @Get('cost/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_COST_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadCostProductPricingDetail(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.pricingService.ReadCostProductPricingDetail({
      Id: id,
    });
  }

  @Post('cost')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_COST_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateCostProductPricing(
    @Headers('access_token') AccessToken: string,
    @Body() body: CreateCostProductPricing,
  ) {
    return this.pricingService.CreateCostProductPricing({
      Name: body.Name,
      Price: body.Price,
    });
  }

  @Put('cost/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.UPDATE_COST_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateCostProductPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCostProductPricing,
  ) {
    return this.pricingService.UpdateCostProductPricing({
      Id: id,
      Name: body.Name,
      Price: body.Price,
    });
  }

  @Delete('cost/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_COST_PRICING,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteCostProductPricing(
    @Headers('access_token') AccessToken: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.pricingService.DeleteCostProductPricing({ Id: id });
  }
}
