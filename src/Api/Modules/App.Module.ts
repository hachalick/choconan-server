import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlGlobalConfiguration } from '../../Persistence/Configuration/Sql/MysqlGlobal.Configuration.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { CustomConfigsModule } from './Configuration.Module.js';
import { BlogEntity } from '../../Domain/Entities/Mysql/Blog.Entity.js';
import { CategoryProductMenuEntity } from '../../Domain/Entities/Mysql/CategoryProductMenu.Entity.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';
import { AuthModule } from './Auth.Module.js';
import { FileModule } from './File.Module.js';
import { OrderModule } from './Order.Module.js';
import { MenuModule } from './Menu.Module.js';
import { UserModule } from './User.Module.js';
import { PricingModule } from './Pricing.Module.js';
import { ServiceModule } from './Service.Module.js';
import { AppController } from '../Controllers/App.Controller.js';
import { AppService } from '../../Application/Services/App.Service.js';
import { LoggerMiddleware } from '../Middlewares/Logger.middleware.js';
import { EntitiesMySqlGlobal } from '../../Persistence/Configuration/Sql/Entities.MysqlGlobal.js';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlGlobalConfiguration,
      inject: [CustomConfigsModule],
      name: ConnectionNameMysql.global,
    }),
    TypeOrmModule.forFeature(
      [...EntitiesMySqlGlobal],
      ConnectionNameMysql.global,
    ),
    CustomConfigsModule,
    AuthModule,
    FileModule,
    OrderModule,
    MenuModule,
    UserModule,
    PricingModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
