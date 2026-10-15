import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from '../../Application/Services/Service.Service.js';
import { ServiceController } from '../Controllers/Service.Controller.js';
import { JwtModule } from './Jwt.Module.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';
import { ProductMenuEntity } from '../../Domain/Entities/Mysql/ProductMenu.Entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [UserEntity, ProductMenuEntity],
      ConnectionNameMysql.global,
    ),
    JwtModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
