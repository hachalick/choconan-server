import {
  CheckDashboardCapabilityGuard,
  ExistTokenInParamGuard,
} from './../auth/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderTableDto, UpdateOrderDto, UpdateOrderItemDto } from './order.dto';
import { SocketOrderGateway } from './../socket_order/socket_order.gateway';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CheckNotExpiresTokenGuard } from 'src/auth/auth.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly eventsGateway: SocketOrderGateway,
  ) {}

  //#region table

  @Get('table')
  getTables() {
    return this.orderService.getTables();
  }

  @Post('table/:table_number')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  createTable(
    @Param('table_number', ParseIntPipe) table_number: number,
    @Query('token') token: string,
  ) {
    return this.orderService.createTable({ table_number });
  }

  @Delete('table/:table_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteTable(
    @Param('table_id') table_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.deleteTable({ table_id });
  }

  //#endregion

  //#region status table

  @Get('status-table/:table_id')
  getStatusTable(@Param('table_id') table_id: string) {
    return this.orderService.getStatusTable({ table_id });
  }

  @Put('status-table/accept/:table_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  acceptStatusTable(
    @Param('table_id') table_id: string,
    @Query('token') token: string,
    @Query('status') status: 'accept' | 'edit',
  ) {
    if (status === 'accept') {
      return this.orderService.acceptStatusTable({ table_id });
    } else if (status === 'edit') {
      return this.orderService.editableStatusTable({ table_id });
    }
  }

  @Delete('status-table/:table_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteStatusTable(
    @Param('table_id') table_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.deleteStatusTable({ table_id });
  }

  //#endregion

  //#region order table

  @Get('order-table')
  getOrderTables() {
    return this.orderService.getOrderTables();
  }

  @Get('order-table/:table_id')
  getOrderTableTables(@Param('table_id') table_id: string) {
    return this.orderService.getOrderTableTables({ table_id });
  }

  @Post('order-table/:table_id')
  getOrderTable(
    @Param('table_id') table_id: string,
    @Body() body: OrderTableDto,
  ) {
    this.eventsGateway.updateOrders();
    const { list_order } = body;
    return this.orderService.orderTable({ table_id, listOrder: list_order });
  }

  //#endregion

  //#region order

  @Get('history-order-account')
  @UseGuards(CheckNotExpiresTokenGuard)
  historyOrderAccount(@Query('token') token: string) {
    return this.orderService.historyOrderAccount({ token });
  }

  @Get('order')
  @ApiOperation({ summary: 'Get orders with optional date filtering' })
  @ApiQuery({ name: 'start_day', required: false, type: String })
  @ApiQuery({ name: 'end_day', required: false, type: String })
  @ApiQuery({ name: 'pay_status', required: false, type: Boolean })
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  getOrder(
    @Query('token') token: string,
    @Query('end_day') end_day?: string,
    @Query('start_day') start_day?: string,
    @Query('pay_status') pay_status?: string,
  ) {
    return this.orderService.getOrder({
      end_day,
      start_day,
      pay_status:
        pay_status === 'true'
          ? true
          : pay_status === 'false'
            ? false
            : undefined,
    });
  }

  @Get('order/:order_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  getOneOrder(
    @Param('order_id') order_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.getOneOrder({ factor_id: order_id });
  }

  @Post('order')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  createOrder(@Query('token') token: string) {
    return this.orderService.createOrder();
  }

  @Put('order/:order_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateOrder(
    @Param('order_id') order_id: string,
    @Query('token') token: string,
    @Body() body: UpdateOrderDto,
  ) {
    const { customer_mobile, factor_number, location, pay_status, tax } = body;
    return this.orderService.updateOrder({
      factor_id: order_id,
      customer_mobile,
      factor_number,
      location,
      pay_status,
      tax,
    });
  }

  @Delete('order/:order_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteOrder(
    @Param('order_id') order_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.deleteOrder({ factor_id: order_id });
  }

  //#endregion

  //#region order item

  @Post('order-item/:order_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  createItemOrder(
    @Param('order_id') order_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.createOrderItem({ factor_id: order_id });
  }

  @Put('order-item/:order_item_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updateItemOrder(
    @Param('order_item_id') order_item_id: string,
    @Query('token') token: string,
    @Body() body: UpdateOrderItemDto,
  ) {
    const { product_count, product_discount, product_name, product_price } =
      body;

    return this.orderService.updateOrderItem({
      factor_item_id: order_item_id,
      product_count,
      product_discount,
      product_name,
      product_price,
    });
  }

  @Delete('order-item/:order_item_id')
  @UseGuards(CheckDashboardCapabilityGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteItemOrder(
    @Param('order_item_id') order_item_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.deleteOrderItem({ factor_item_id: order_item_id });
  }

  //#endregion
}
