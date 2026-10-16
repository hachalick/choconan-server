import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../../Application/Services/File.Service.js';
import { FileController } from '../Controllers/File.Controller.js';
import { JwtModule } from './Jwt.Module.js';
import { MenuModule } from './Menu.Module.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { EntitiesMySqlGlobal } from '../../Persistence/Configuration/Sql/Entities.MysqlGlobal.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [...EntitiesMySqlGlobal],
      ConnectionNameMysql.global,
    ),
    MenuModule,
    JwtModule,
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
