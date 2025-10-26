import { Injectable } from '@nestjs/common';
import { PresentOrderTableEntity } from '../entity/mysql/PresentOrderTable.entity';
import { FactorPresentOrderEntity } from '../entity/mysql/FactorPresentOrder.entity';
import { ProductMenuEntity } from '../entity/mysql/Product.entity';
import { CategoryProductMenuEntity } from '../entity/mysql/CategoryProduct.entity';
import { BlogEntity } from './../entity/mysql/Blog.entity';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserEntity } from '../entity/mysql/User.entity';
import { RoleEntity } from '../entity/mysql/Role.entity';
import { RoleUserEntity } from '../entity/mysql/RoleUser.entity';
import { ImageEntity } from '../entity/mysql/Image.entity';
import { EconomicPackageEntity } from '../entity/mysql/EconomicPackage.entity';
import { ContentEconomicPackageEntity } from '../entity/mysql/ContentEconomicPackage.entity';
import { OtpEntity } from '../entity/mysql/Otp.entity';
import { FactorEntity } from '../entity/mysql/Factor.entity';
import { FactorItemEntity } from '../entity/mysql/FactorItem.entity';
import { TransactionFactorEntity } from '../entity/mysql/TransactionFactor.entity';
import { TransactionTypeEntity } from '../entity/mysql/TransactionType.entity';
import { DashboardCapability } from '../entity/mysql/DashboardCapability';
import { DashboardCapabilityUser } from '../entity/mysql/DashboardCapabilityUser';

@Injectable()
export class TypeOrmDbConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      port: this.configService.get('Db.port'),
      host: this.configService.get('Db.host'),
      username: this.configService.get('Db.username'),
      password: this.configService.get('Db.password'),
      database: this.configService.get('Db.database'),
      synchronize: true,
      entities: [
        BlogEntity,
        CategoryProductMenuEntity,
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
        RoleEntity,
        RoleUserEntity,
        TransactionFactorEntity,
        TransactionTypeEntity,
        UserEntity,
      ],
    };
  }
}
