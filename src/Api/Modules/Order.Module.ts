import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketOrderGateway } from '../Gatway/Order.Gateway.js';
import { OrderService } from '../../Application/Services/Order.Service.js';
import { OrderController } from '../Controllers/Order.Controller.js';
import { JwtModule } from './Jwt.Module.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';
import { FactorItemEntity } from '../../Domain/Entities/Mysql/FactorItem.Entity.js';
import { FactorEntity } from '../../Domain/Entities/Mysql/Factor.Entity.js';
import { PresentFactorItemEntity } from '../../Domain/Entities/Mysql/FactorPresentOrder.Entity.js';
import { ProductMenuEntity } from '../../Domain/Entities/Mysql/ProductMenu.Entity.js';
import { PresentFactorEntity } from '../../Domain/Entities/Mysql/PresentFactor.Entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        PresentFactorEntity,
        ProductMenuEntity,
        PresentFactorItemEntity,
        FactorEntity,
        FactorItemEntity,
        UserEntity,
      ],
      ConnectionNameMysql.global,
    ),
    JwtModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, SocketOrderGateway],
})
export class OrderModule {}
