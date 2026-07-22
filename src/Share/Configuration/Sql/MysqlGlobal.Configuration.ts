import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { BlogEntity } from 'src/Domain/Entities/Mysql/Blog.Entity';
import { CategoryProductMenuEntity } from 'src/Domain/Entities/Mysql/CategoryProductMenu.Entity';
import { ContentEconomicPackageEntity } from 'src/Domain/Entities/Mysql/ContentEconomicPackage.Entity';
import { CostPricingEntity } from 'src/Domain/Entities/Mysql/CostPricing.Entity';
import { DashboardCapabilityEntity } from 'src/Domain/Entities/Mysql/DashboardCapability.Entity';
import { DashboardCapabilityUserEntity } from 'src/Domain/Entities/Mysql/DashboardCapabilityUser.Entity';
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
import {
  DatabaseConfigurationKeys,
  DatabaseConfigurationValues,
} from '../Parameter/Database.Configuration';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';

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
