import { WebSocketGateway } from '@nestjs/websockets';
import { OrderService } from 'src/Application/Services/Order.Service';

@WebSocketGateway({ cors: '*' })
export class SocketOrderGateway {
  constructor(private readonly OrderService: OrderService) {}

  async EmitUpdateOrder() {
    await this.OrderService.EmitUpdateOrder({});
  }
}
