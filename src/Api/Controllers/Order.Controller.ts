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
} from '../DTOs/Order.Controller.DTO';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CheckExistAccessTokenInHeaderGuard,
  CheckNotExpiresTokenGuard,
} from 'src/Api/Guards/Auth.Guard';
import { DashboardCapabilityGuard } from '../Decorators/DashboardCapability.Decorator';
import { EDashboardCapability } from 'src/Share/Enum/DashboardCapability.Enum';
import { OrderService } from 'src/Application/Services/Order.Service';

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
  @ApiQuery({ name: 'start_day', required: false, type: String })
  @ApiQuery({ name: 'end_day', required: false, type: String })
  @ApiQuery({ name: 'is_pay', required: false, type: Boolean })
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
  @DashboardCapabilityGuard('access_token', EDashboardCapability.READ_ORDER)
  @UseGuards(CheckNotExpiresTokenGuard)
  @UseGuards(CheckExistAccessTokenInHeaderGuard)
  ReadOrderMonthlyList(
    @Headers('access_token') AccessToken: string,
    @Query('Count', ParseIntPipe) Count: number,
    @Query('Space', ParseIntPipe) Space: number,
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
