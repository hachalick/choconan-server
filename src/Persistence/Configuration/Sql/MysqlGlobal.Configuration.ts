import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionNameMysql } from '../../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import {
  DatabaseConfigurationKeys,
  DatabaseConfigurationValues,
} from '../Parameter/Database.Configuration.js';
import { EntitiesMySqlGlobal } from './Entities.MysqlGlobal.js';

@Injectable()
export class MysqlGlobalConfiguration implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      name: ConnectionNameMysql.global,
      port: this.configService.get<number>(
        `${DatabaseConfigurationKeys.DB_MYSQL}.${DatabaseConfigurationValues.PORT}`,
      ),
      host: this.configService.get<string>(
        `${DatabaseConfigurationKeys.DB_MYSQL}.${DatabaseConfigurationValues.HOST}`,
      ),
      username: this.configService.get<string>(
        `${DatabaseConfigurationKeys.DB_MYSQL}.${DatabaseConfigurationValues.USERNAME}`,
      ),
      password: this.configService.get<string>(
        `${DatabaseConfigurationKeys.DB_MYSQL}.${DatabaseConfigurationValues.PASSWORD}`,
      ),
      database: this.configService.get<string>(
        `${DatabaseConfigurationKeys.DB_MYSQL}.${DatabaseConfigurationValues.DATABASE}`,
      ),
      synchronize: true,
      entities: [...EntitiesMySqlGlobal],
    };
  }
}
