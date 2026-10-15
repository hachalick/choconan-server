import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionNameMysql } from '../../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { DatabaseConfigurationKeys, DatabaseConfigurationValues } from '../Parameter/Database.Configuration.js';
import { UserEntity } from '../../../Domain/Entities/Mysql/User.Entity.js';
import { BlogEntity } from '../../../Domain/Entities/Mysql/Blog.Entity.js';
import { CategoryProductMenuEntity } from '../../../Domain/Entities/Mysql/CategoryProductMenu.Entity.js';
import { DashboardCapabilityEntity } from '../../../Domain/Entities/Mysql/DashboardCapability.Entity.js';
import { DashboardCapabilityUserEntity } from '../../../Domain/Entities/Mysql/DashboardCapabilityUser.Entity.js';
import { ContentEconomicPackageEntity } from '../../../Domain/Entities/Mysql/ContentEconomicPackage.Entity.js';
import { CostPricingEntity } from '../../../Domain/Entities/Mysql/CostPricing.Entity.js';
import { EconomicPackageEntity } from '../../../Domain/Entities/Mysql/EconomicPackage.Entity.js';
import { FactorEntity } from '../../../Domain/Entities/Mysql/Factor.Entity.js';
import { FactorItemEntity } from '../../../Domain/Entities/Mysql/FactorItem.Entity.js';
import { PresentFactorItemEntity } from '../../../Domain/Entities/Mysql/FactorPresentOrder.Entity.js';
import { OtpEntity } from '../../../Domain/Entities/Mysql/Otp.Entity.js';
import { FileEntity } from '../../../Domain/Entities/Mysql/File.Entity.js';
import { PresentFactorEntity } from '../../../Domain/Entities/Mysql/PresentFactor.Entity.js';
import { ProductMenuEntity } from '../../../Domain/Entities/Mysql/ProductMenu.Entity.js';
import { ProductUnitPricingEntity } from '../../../Domain/Entities/Mysql/ProductUnitPricing.Entity.js';
import { ProductPricingEntity } from '../../../Domain/Entities/Mysql/ProductPricing.Entity.js';
import { ProductUnitDetailEntity } from '../../../Domain/Entities/Mysql/ProductUnitDetail.Entity.js';
import { ProductUnitRatioPricingEntity } from '../../../Domain/Entities/Mysql/ProductUnitRatioPricing.Entity.js';
import { RoleEntity } from '../../../Domain/Entities/Mysql/Role.Entity.js';
import { RoleUserEntity } from '../../../Domain/Entities/Mysql/RoleUser.Entity.js';
import { TransactionFactorEntity } from '../../../Domain/Entities/Mysql/TransactionFactor.Entity.js';
import { TransactionTypeEntity } from '../../../Domain/Entities/Mysql/TransactionType.Entity.js';
import { UnitPricingEntity } from '../../../Domain/Entities/Mysql/UnitPricing.Entity.js';

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
      entities: [
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
    };
  }
}
