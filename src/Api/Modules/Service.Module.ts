import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { UserEntity } from 'src/Domain/Entities/Mysql/User.Entity';
import { JwtModule } from './Jwt.Module';
import { ServiceController } from '../Controllers/Service.Controller';
import { ServiceService } from 'src/Application/Services/Service.Service';

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
