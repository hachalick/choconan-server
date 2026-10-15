import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from './Jwt.Module.js';
import { CategoryProductMenuEntity } from '../../Domain/Entities/Mysql/CategoryProductMenu.Entity.js';
import { ProductMenuEntity } from '../../Domain/Entities/Mysql/ProductMenu.Entity.js';
import { ContentEconomicPackageEntity } from '../../Domain/Entities/Mysql/ContentEconomicPackage.Entity.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';
import { EconomicPackageEntity } from '../../Domain/Entities/Mysql/EconomicPackage.Entity.js';
import { FactorItemEntity } from '../../Domain/Entities/Mysql/FactorItem.Entity.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { MenuController } from '../Controllers/Menu.Controller.js';
import { MenuService } from '../../Application/Services/Menu.Service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        CategoryProductMenuEntity,
        ProductMenuEntity,
        UserEntity,
        EconomicPackageEntity,
        ContentEconomicPackageEntity,
        FactorItemEntity,
      ],
      ConnectionNameMysql.global,
    ),
    JwtModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
