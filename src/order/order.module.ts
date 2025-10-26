import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SocketOrderModule } from 'src/socket_order/socket_order.module';
import { SocketOrderGateway } from 'src/socket_order/socket_order.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { PresentOrderTableEntity } from 'src/modules/entity/mysql/PresentOrderTable.entity';
import { FactorPresentOrderEntity } from 'src/modules/entity/mysql/FactorPresentOrder.entity';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { FactorEntity } from 'src/modules/entity/mysql/Factor.entity';
import { FactorItemEntity } from 'src/modules/entity/mysql/FactorItem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PresentOrderTableEntity,
      ProductMenuEntity,
      FactorPresentOrderEntity,
      UserEntity,
      FactorEntity,
      FactorItemEntity,
    ]),
    SocketOrderModule,
    JwtModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, SocketOrderGateway],
})
export class OrderModule {}
