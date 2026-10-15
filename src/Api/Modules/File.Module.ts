import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../../Application/Services/File.Service.js';
import { FileController } from '../Controllers/File.Controller.js';
import { JwtModule } from './Jwt.Module.js';
import { MenuModule } from './Menu.Module.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { CategoryProductMenuEntity } from '../../Domain/Entities/Mysql/CategoryProductMenu.Entity.js';
import { FileEntity } from '../../Domain/Entities/Mysql/File.Entity.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';
import { ProductMenuEntity } from '../../Domain/Entities/Mysql/ProductMenu.Entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ProductMenuEntity, CategoryProductMenuEntity, UserEntity, FileEntity],
      ConnectionNameMysql.global,
    ),
    MenuModule,
    JwtModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
