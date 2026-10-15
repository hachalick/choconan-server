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
import { DashboardCapabilityUserEntity } from '../../Domain/Entities/Mysql/DashboardCapabilityUser.Entity.js';
import { DashboardCapabilityEntity } from '../../Domain/Entities/Mysql/DashboardCapability.Entity.js';
import { CostPricingEntity } from '../../Domain/Entities/Mysql/CostPricing.Entity.js';
import { ContentEconomicPackageEntity } from '../../Domain/Entities/Mysql/ContentEconomicPackage.Entity.js';
import { FactorEntity } from '../../Domain/Entities/Mysql/Factor.Entity.js';
import { EconomicPackageEntity } from '../../Domain/Entities/Mysql/EconomicPackage.Entity.js';
import { PresentFactorItemEntity } from '../../Domain/Entities/Mysql/FactorPresentOrder.Entity.js';
import { FactorItemEntity } from '../../Domain/Entities/Mysql/FactorItem.Entity.js';
import { OtpEntity } from '../../Domain/Entities/Mysql/Otp.Entity.js';
import { FileEntity } from '../../Domain/Entities/Mysql/File.Entity.js';
import { UnitPricingEntity } from '../../Domain/Entities/Mysql/UnitPricing.Entity.js';
import { TransactionTypeEntity } from '../../Domain/Entities/Mysql/TransactionType.Entity.js';
import { TransactionFactorEntity } from '../../Domain/Entities/Mysql/TransactionFactor.Entity.js';
import { RoleUserEntity } from '../../Domain/Entities/Mysql/RoleUser.Entity.js';
import { RoleEntity } from '../../Domain/Entities/Mysql/Role.Entity.js';
import { ProductUnitRatioPricingEntity } from '../../Domain/Entities/Mysql/ProductUnitRatioPricing.Entity.js';
import { ProductUnitDetailEntity } from '../../Domain/Entities/Mysql/ProductUnitDetail.Entity.js';
import { ProductUnitPricingEntity } from '../../Domain/Entities/Mysql/ProductUnitPricing.Entity.js';
import { ProductPricingEntity } from '../../Domain/Entities/Mysql/ProductPricing.Entity.js';
import { ProductMenuEntity } from '../../Domain/Entities/Mysql/ProductMenu.Entity.js';
import { PresentFactorEntity } from '../../Domain/Entities/Mysql/PresentFactor.Entity.js';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlGlobalConfiguration,
      inject: [CustomConfigsModule],
      name: ConnectionNameMysql.global,
    }),
    TypeOrmModule.forFeature(
      [
        BlogEntity,
        CategoryProductMenuEntity,
        DashboardCapabilityEntity,
        DashboardCapabilityUserEntity,
        ContentEconomicPackageEntity,
        CostPricingEntity,
        EconomicPackageEntity,
        FactorEntity,
        FactorItemEntity,
        PresentFactorItemEntity,
        FileEntity,
        OtpEntity,
        PresentFactorEntity,
        ProductMenuEntity,
        ProductPricingEntity,
        ProductUnitPricingEntity,
        ProductUnitDetailEntity,
        ProductUnitRatioPricingEntity,
        RoleEntity,
        RoleUserEntity,
        TransactionFactorEntity,
        TransactionTypeEntity,
        UnitPricingEntity,
        UserEntity,
      ],
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
