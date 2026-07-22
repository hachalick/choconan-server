import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from './Jwt.Module';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { ContentEconomicPackageEntity } from 'src/Domain/Entities/Mysql/ContentEconomicPackage.Entity';
import { EconomicPackageEntity } from 'src/Domain/Entities/Mysql/EconomicPackage.Entity';
import { UserEntity } from 'src/Domain/Entities/Mysql/User.Entity';
import { CategoryProductMenuEntity } from 'src/Domain/Entities/Mysql/CategoryProductMenu.Entity';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { MenuController } from '../Controllers/Menu.Controller';
import { MenuService } from 'src/Application/Services/Menu.Service';
import { FactorItemEntity } from 'src/Domain/Entities/Mysql/FactorItem.Entity';

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
