import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactorEntity } from 'src/Domain/Entities/Mysql/Factor.Entity';
import { FactorItemEntity } from 'src/Domain/Entities/Mysql/FactorItem.Entity';
import { PresentFactorItemEntity } from 'src/Domain/Entities/Mysql/FactorPresentOrder.Entity';
import { PresentFactorEntity } from 'src/Domain/Entities/Mysql/PresentFactor.Entity';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { UserEntity } from 'src/Domain/Entities/Mysql/User.Entity';
import { JwtModule } from './Jwt.Module';
import { OrderController } from '../Controllers/Order.Controller';
import { OrderService } from 'src/Application/Services/Order.Service';
import { SocketOrderGateway } from '../Gatway/Order.Gateway';

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
