import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProductMenuEntity } from 'src/Domain/Entities/Mysql/CategoryProductMenu.Entity';
import { FileEntity } from 'src/Domain/Entities/Mysql/File.Entity';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { UserEntity } from 'src/Domain/Entities/Mysql/User.Entity';
import { MenuModule } from './Menu.Module';
import { JwtModule } from './Jwt.Module';
import { FileController } from '../Controllers/File.Controller';
import { FileService } from 'src/Application/Services/File.Service';

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
