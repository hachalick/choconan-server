import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  DatabaseConfigurationKeys,
  DatabaseConfigurationValues,
} from '../Parameter/Database.Configuration';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { BlogEntity } from 'src/Domain/Entities/OldMySql/Blog.entity';
import { CategoryProductMenuEntity } from 'src/Domain/Entities/OldMySql/CategoryProduct.entity';
import { DashboardCapability } from 'src/Domain/Entities/OldMySql/DashboardCapability';
import { DashboardCapabilityUser } from 'src/Domain/Entities/OldMySql/DashboardCapabilityUser';
import { ContentEconomicPackageEntity } from 'src/Domain/Entities/OldMySql/ContentEconomicPackage.entity';
import { EconomicPackageEntity } from 'src/Domain/Entities/OldMySql/EconomicPackage.entity';
import { FactorEntity } from 'src/Domain/Entities/OldMySql/Factor.entity';
import { FactorItemEntity } from 'src/Domain/Entities/OldMySql/FactorItem.entity';
import { FactorPresentOrderEntity } from 'src/Domain/Entities/OldMySql/FactorPresentOrder.entity';
import { ImageEntity } from 'src/Domain/Entities/OldMySql/Image.entity';
import { OtpEntity } from 'src/Domain/Entities/OldMySql/Otp.entity';
import { PresentOrderTableEntity } from 'src/Domain/Entities/OldMySql/PresentOrderTable.entity';
import { ProductMenuEntity } from 'src/Domain/Entities/OldMySql/Product.entity';
import { RoleEntity } from 'src/Domain/Entities/OldMySql/Role.entity';
import { RoleUserEntity } from 'src/Domain/Entities/OldMySql/RoleUser.entity';
import { TransactionFactorEntity } from 'src/Domain/Entities/OldMySql/TransactionFactor.entity';
import { TransactionTypeEntity } from 'src/Domain/Entities/OldMySql/TransactionType.entity';
import { UserEntity } from 'src/Domain/Entities/OldMySql/User.entity';
import { ProductPricingEntity } from 'src/Domain/Entities/OldMySql/ProductPricing.entity';
import { ProductUnitEntity } from 'src/Domain/Entities/OldMySql/ProductUnit.entity';
import { ProductUnitDetailEntity } from 'src/Domain/Entities/OldMySql/ProductUnitDetailEntity.entity';
import { ProductUnitRatioEntity } from 'src/Domain/Entities/OldMySql/ProductUnitRatio.entity';
import { UnitEntity } from 'src/Domain/Entities/OldMySql/Unit.entity';
import { CostPricingEntity } from 'src/Domain/Entities/OldMySql/CostPricing.entity';

@Injectable()
export class TypeOrmDbConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      name: ConnectionNameMysql.old,
      port: this.configService.get<number>(
        `${DatabaseConfigurationKeys.DB_OLD_MYSQL}.${DatabaseConfigurationValues.PORT}`,
      ),
      host: this.configService.get<string>(
        `${DatabaseConfigurationKeys.DB_OLD_MYSQL}.${DatabaseConfigurationValues.HOST}`,
      ),
      username: this.configService.get<string>(
        `${DatabaseConfigurationKeys.DB_OLD_MYSQL}.${DatabaseConfigurationValues.USERNAME}`,
      ),
      password: this.configService.get<string>(
        `${DatabaseConfigurationKeys.DB_OLD_MYSQL}.${DatabaseConfigurationValues.PASSWORD}`,
      ),
      database: this.configService.get<string>(
        `${DatabaseConfigurationKeys.DB_OLD_MYSQL}.${DatabaseConfigurationValues.DATABASE}`,
      ),
      synchronize: true,
      entities: [
        BlogEntity,
        CategoryProductMenuEntity,
        CostPricingEntity,
        DashboardCapability,
        DashboardCapabilityUser,
        ContentEconomicPackageEntity,
        EconomicPackageEntity,
        FactorEntity,
        FactorItemEntity,
        FactorPresentOrderEntity,
        ImageEntity,
        OtpEntity,
        PresentOrderTableEntity,
        ProductMenuEntity,
        ProductPricingEntity,
        ProductUnitEntity,
        ProductUnitDetailEntity,
        ProductUnitRatioEntity,
        RoleEntity,
        RoleUserEntity,
        TransactionFactorEntity,
        TransactionTypeEntity,
        UnitEntity,
        UserEntity,
      ],
    };
  }
}
