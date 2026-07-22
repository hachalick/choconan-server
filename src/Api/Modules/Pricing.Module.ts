import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostPricingEntity } from 'src/Domain/Entities/Mysql/CostPricing.Entity';
import { FactorEntity } from 'src/Domain/Entities/Mysql/Factor.Entity';
import { FactorItemEntity } from 'src/Domain/Entities/Mysql/FactorItem.Entity';
import { ProductMenuEntity } from 'src/Domain/Entities/Mysql/ProductMenu.Entity';
import { ProductPricingEntity } from 'src/Domain/Entities/Mysql/ProductPricing.Entity';
import { ProductUnitPricingEntity } from 'src/Domain/Entities/Mysql/ProductUnitPricing.Entity';
import { ProductUnitDetailEntity } from 'src/Domain/Entities/Mysql/ProductUnitDetail.Entity';
import { ProductUnitRatioPricingEntity } from 'src/Domain/Entities/Mysql/ProductUnitRatioPricing.Entity';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { UnitPricingEntity } from 'src/Domain/Entities/Mysql/UnitPricing.Entity';
import { UserEntity } from 'src/Domain/Entities/Mysql/User.Entity';
import { JwtModule } from './Jwt.Module';
import { PricingController } from '../Controllers/Pricing.Controller';
import { PricingService } from 'src/Application/Services/Pricing.Service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ProductPricingEntity,
        ProductUnitPricingEntity,
        ProductUnitRatioPricingEntity,
        UnitPricingEntity,
        ProductUnitDetailEntity,
        ProductMenuEntity,
        CostPricingEntity,
        FactorEntity,
        FactorItemEntity,
        UserEntity,
      ],
      ConnectionNameMysql.global,
    ),
    JwtModule,
  ],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
