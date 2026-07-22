import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { MysqlGlobalConfiguration } from 'src/Share/Configuration/Sql/MysqlGlobal.Configuration';
import { ServiceModule } from './Service.Module';
import { PricingModule } from './Pricing.Module';
import { UserModule } from './User.Module';
import { MenuModule } from './Menu.Module';
import { OrderModule } from './Order.Module';
import { FileModule } from './File.Module';
import { AuthModule } from './Auth.Module';
import { AppController } from '../Controllers/App.Controller';
import { AppService } from 'src/Application/Services/App.Service';
import { LoggerMiddleware } from '../Middlewares/Logger.middleware';
import { CustomConfigsModule } from './Configuration.Module';
import { TypeOrmDbConfig } from 'src/Share/Configuration/Sql/OldMySql.Configuration';

import { BlogEntity as BlogOldEntity } from 'src/Domain/Entities/OldMySql/Blog.entity';
import { CategoryProductMenuEntity as CategoryProductMenuOldEntity } from 'src/Domain/Entities/OldMySql/CategoryProduct.entity';
import { DashboardCapability as DashboardCapabilityOld } from 'src/Domain/Entities/OldMySql/DashboardCapability';
import { DashboardCapabilityUser as DashboardCapabilityUserOld } from 'src/Domain/Entities/OldMySql/DashboardCapabilityUser';
import { ContentEconomicPackageEntity as ContentEconomicPackageOldEntity } from 'src/Domain/Entities/OldMySql/ContentEconomicPackage.entity';
import { EconomicPackageEntity as EconomicPackageOldEntity } from 'src/Domain/Entities/OldMySql/EconomicPackage.entity';
import { FactorEntity as FactorOldEntity } from 'src/Domain/Entities/OldMySql/Factor.entity';
import { FactorItemEntity as FactorItemOldEntity } from 'src/Domain/Entities/OldMySql/FactorItem.entity';
import { FactorPresentOrderEntity as FactorPresentOrderOldEntity } from 'src/Domain/Entities/OldMySql/FactorPresentOrder.entity';
import { ImageEntity as ImageOldEntity } from 'src/Domain/Entities/OldMySql/Image.entity';
import { OtpEntity as OtpOldEntity } from 'src/Domain/Entities/OldMySql/Otp.entity';
import { PresentOrderTableEntity as PresentOrderTableOldEntity } from 'src/Domain/Entities/OldMySql/PresentOrderTable.entity';
import { ProductMenuEntity as ProductMenuOldEntity } from 'src/Domain/Entities/OldMySql/Product.entity';
import { RoleEntity as RoleOldEntity } from 'src/Domain/Entities/OldMySql/Role.entity';
import { RoleUserEntity as RoleUserOldEntity } from 'src/Domain/Entities/OldMySql/RoleUser.entity';
import { TransactionFactorEntity as TransactionFactorOldEntity } from 'src/Domain/Entities/OldMySql/TransactionFactor.entity';
import { TransactionTypeEntity as TransactionTypeOldEntity } from 'src/Domain/Entities/OldMySql/TransactionType.entity';
import { UserEntity as UserOldEntity } from 'src/Domain/Entities/OldMySql/User.entity';
import { ProductPricingEntity as ProductPricingOldEntity } from 'src/Domain/Entities/OldMySql/ProductPricing.entity';
import { ProductUnitEntity as ProductUnitOldEntity } from 'src/Domain/Entities/OldMySql/ProductUnit.entity';
import { ProductUnitDetailEntity as ProductUnitDetailOldEntity } from 'src/Domain/Entities/OldMySql/ProductUnitDetailEntity.entity';
import { ProductUnitRatioEntity as ProductUnitRatioOldEntity } from 'src/Domain/Entities/OldMySql/ProductUnitRatio.entity';
import { UnitEntity as UnitOldEntity } from 'src/Domain/Entities/OldMySql/Unit.entity';
import { CostPricingEntity as CostPricingOldEntity } from 'src/Domain/Entities/OldMySql/CostPricing.entity';

import { BlogEntity } from 'src/Domain/Entities/Mysql/Blog.Entity';
import { CategoryProductMenuEntity } from 'src/Domain/Entities/Mysql/CategoryProductMenu.Entity';
import { DashboardCapabilityEntity } from 'src/Domain/Entities/Mysql/DashboardCapability.Entity';
import { DashboardCapabilityUserEntity } from 'src/Domain/Entities/Mysql/DashboardCapabilityUser.Entity';
import { ContentEconomicPackageEntity } from 'src/Domain/Entities/Mysql/ContentEconomicPackage.Entity';
import { CostPricingEntity } from 'src/Domain/Entities/Mysql/CostPricing.Entity';
import { EconomicPackageEntity } from 'src/Domain/Entities/Mysql/EconomicPackage.Entity';
import { FactorEntity } from 'src/Domain/Entities/Mysql/Factor.Entity';
import { FactorItemEntity } from 'src/Domain/Entities/Mysql/FactorItem.Entity';
import { PresentFactorItemEntity } from 'src/Domain/Entities/Mysql/FactorPresentOrder.Entity';
import { FileEntity } from 'src/Domain/Entities/Mysql/File.Entity';
import { OtpEntity } from 'src/Domain/Entities/Mysql/Otp.Entity';
import { PresentFactorEntity } from 'src/Domain/Entities/Mysql/PresentFactor.Entity';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { ProductPricingEntity } from 'src/Domain/Entities/Mysql/ProductPricing.Entity';
import { ProductUnitPricingEntity } from 'src/Domain/Entities/Mysql/ProductUnitPricing.Entity';
import { ProductUnitDetailEntity } from 'src/Domain/Entities/Mysql/ProductUnitDetail.Entity';
import { ProductUnitRatioPricingEntity } from 'src/Domain/Entities/Mysql/ProductUnitRatioPricing.Entity';
import { RoleEntity } from 'src/Domain/Entities/Mysql/Role.Entity';
import { RoleUserEntity } from 'src/Domain/Entities/Mysql/RoleUser.Entity';
import { TransactionFactorEntity } from 'src/Domain/Entities/Mysql/TransactionFactor.Entity';
import { TransactionTypeEntity } from 'src/Domain/Entities/Mysql/TransactionType.Entity';
import { UnitPricingEntity } from 'src/Domain/Entities/Mysql/UnitPricing.Entity';
import { UserEntity } from 'src/Domain/Entities/Mysql/User.Entity';

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
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
      inject: [CustomConfigsModule],
      name: ConnectionNameMysql.old,
    }),
    TypeOrmModule.forFeature(
      [
        BlogOldEntity,
        CategoryProductMenuOldEntity,
        DashboardCapabilityOld,
        DashboardCapabilityUserOld,
        ContentEconomicPackageOldEntity,
        EconomicPackageOldEntity,
        FactorOldEntity,
        FactorItemOldEntity,
        FactorPresentOrderOldEntity,
        ImageOldEntity,
        OtpOldEntity,
        PresentOrderTableOldEntity,
        ProductMenuOldEntity,
        ProductPricingOldEntity,
        ProductUnitOldEntity,
        ProductUnitDetailOldEntity,
        ProductUnitRatioOldEntity,
        RoleOldEntity,
        RoleUserOldEntity,
        TransactionFactorOldEntity,
        TransactionTypeOldEntity,
        UnitOldEntity,
        UserOldEntity,
        CostPricingOldEntity,
      ],
      ConnectionNameMysql.old,
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
