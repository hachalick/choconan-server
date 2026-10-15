import { WebSocketGateway } from '@nestjs/websockets';
import { OrderService } from '../../Application/Services/Order.Service.js';

@WebSocketGateway({ cors: '*' })
export class SocketOrderGateway {
  constructor(private readonly OrderService: OrderService) {}

  async EmitUpdateOrder() {
    await this.OrderService.EmitUpdateOrder({});
  }
}
