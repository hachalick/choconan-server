import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  OrderTableDto,
  UpdateOrderDto,
  UpdateOrderItemDto,
} from '../../Domain/DTOs/Order.Controller.DTO.js';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DashboardCapabilityGuard } from '../Decorators/DashboardCapability.Decorator.js';
import { OrderService } from '../../Application/Services/Order.Service.js';
import {
  CheckExistAccessTokenInHeaderGuard,
  CheckNotExpiresTokenGuard,
} from '../Guards/Auth.Guard.js';
import { EDashboardCapability } from '../../Domain/Enum/DashboardCapability.Enum.js';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  //#region table

  @Get('table')
  ReadTableList() {
    return this.OrderService.ReadTableList({});
  }

  @Post('table/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.CREATE_ORDER_LOCATION,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateTable(
    @Param('id') id: string,
    @Headers('access_token') AccessToken: string,
  ) {
    return this.OrderService.CreateTable({ Location: id });
  }

  @Delete('table/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard(
    'access_token',
    EDashboardCapability.DELETE_ORDER_LOCATION,
  )
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteTable(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('access_token') AccessToken: string,
  ) {
    return this.OrderService.DeleteTable({ Id: id });
  }

  //#endregion

  //#region status table

  @Get('status-table/:id')
  ReadStatusTable(@Param('id', ParseUUIDPipe) id: string) {
    return this.OrderService.ReadStatusTable({ Id: id });
  }

  @Put('status-table/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.UPDATE_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  AcceptStatusTable(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('access_token') AccessToken: string,
  ) {
    return this.OrderService.AcceptStatusTable({ Id: id });
  }

  //#endregion

  //#region order table

  @Get('order-table')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadOrderTableList() {
    return this.OrderService.ReadOrderTableList({});
  }

  @Get('order-table/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadOrderTableDetail(@Param('id') id: string) {
    return this.OrderService.ReadOrderTableDetail({ Id: id });
  }

  @Post('order-table/:id')
  async CreateOrderTable(@Param('id') id: string, @Body() body: OrderTableDto) {
    return this.OrderService.CreateOrderTable({
      Id: id,
      Orders: body.Orders,
    });
  }

  //#endregion

  //#region order

  @Get('order')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_ORDER)
  @ApiQuery({ name: 'EndDay', required: false, type: String })
  @ApiQuery({ name: 'StartDay', required: false, type: String })
  @ApiQuery({ name: 'IsPay', required: false, type: Boolean })
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadOrderList(
    @Headers('access_token') AccessToken: string,
    @Query('EndDay') EndDay?: string,
    @Query('StartDay') StartDay?: string,
    @Query('IsPay', new ParseBoolPipe({ optional: true })) IsPay?: boolean,
  ) {
    return this.OrderService.ReadOrderList({
      StartDay,
      EndDay,
      IsPay,
    });
  }

  @Get('order/monthly')
  @ApiHeader({ name: 'access_token', required: true })
  @ApiQuery({ name: 'Count', required: false })
  @ApiQuery({ name: 'Space', required: false })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadOrderMonthlyList(
    @Headers('access_token') AccessToken: string,
    @Query('Count', new ParseIntPipe({ optional: true })) Count: number,
    @Query('Space', new ParseIntPipe({ optional: true })) Space: number,
  ) {
    return this.OrderService.ReadOrderMonthlyList({
      Count,
      Space,
    });
  }

  @Get('order/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadOrderDetail(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('access_token') AccessToken: string,
  ) {
    return this.OrderService.ReadOrderDetail({ Id: id });
  }

  @Post('order')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.CREATE_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateOrder(@Headers('access_token') AccessToken: string) {
    return this.OrderService.CreateOrder({});
  }

  @Put('order/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.UPDATE_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('access_token') AccessToken: string,
    @Body() body: UpdateOrderDto,
  ) {
    return this.OrderService.UpdateOrder({
      Id: id,
      CustomerMobile: body.CustomerMobile,
      FactorDate: body.FactorDate,
      FactorNumber: body.FactorNumber,
      IsPay: body.IsPay,
      Location: body.Location,
      Tax: body.Tax,
    });
  }

  @Put('order/pay-status/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.UPDATE_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdatePayStatusOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('access_token') AccessToken: string,
    @Query('IsPay', ParseBoolPipe) IsPay: boolean,
  ) {
    return this.OrderService.UpdatePayStatusOrder({
      Id: id,
      IsPay,
    });
  }

  @Delete('order/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.DELETE_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('access_token') AccessToken: string,
  ) {
    return this.OrderService.DeleteOrder({ Id: id });
  }

  //#endregion

  //#region order item

  @Post('order-item/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.CREATE_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  CreateOrderItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('access_token') AccessToken: string,
  ) {
    return this.OrderService.CreateOrderItem({ Id: id });
  }

  @Put('order-item/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.UPDATE_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  UpdateOrderItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('access_token') AccessToken: string,
    @Body() body: UpdateOrderItemDto,
  ) {
    return this.OrderService.UpdateOrderItem({
      Id: id,
      ProductCount: body.ProductCount,
      ProductDiscount: body.ProductDiscount,
      ProductName: body.ProductName,
      ProductPrice: body.ProductPrice,
    });
  }

  @Delete('order-item/:id')
  @ApiHeader({ name: 'access_token', required: true })
  @DashboardCapabilityGuard('access_token', EDashboardCapability.DELETE_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  DeleteOrderItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('access_token') AccessToken: string,
  ) {
    return this.OrderService.DeleteOrderItem({ Id: id });
  }

  //#endregion
}
