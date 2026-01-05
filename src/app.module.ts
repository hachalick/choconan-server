import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmDbConfig } from './modules/config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigsModule } from './modules/config/configs.module';
import { LoggerMiddleware } from './app.middleware';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { RobotModule } from './robot/robot.module';
import { ServiceModule } from './service/service.module';
import { PricingModule } from './pricing/pricing.module';
import { FactorItemEntity } from './modules/entity/mysql/FactorItem.entity';
import { ProductMenuEntity } from './modules/entity/mysql/Product.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
      inject: [CustomConfigsModule],
    }),
    TypeOrmModule.forFeature([
      ProductMenuEntity,
      FactorItemEntity,
    ]),
    CustomConfigsModule,
    AuthModule,
    BlogModule,
    FileModule,
    OrderModule,
    MenuModule,
    UserModule,
    RobotModule,
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
