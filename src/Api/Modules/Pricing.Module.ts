import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingService } from '../../Application/Services/Pricing.Service.js';
import { PricingController } from '../Controllers/Pricing.Controller.js';
import { JwtModule } from './Jwt.Module.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';
import { FactorEntity } from '../../Domain/Entities/Mysql/Factor.Entity.js';
import { CostPricingEntity } from '../../Domain/Entities/Mysql/CostPricing.Entity.js';
import { FactorItemEntity } from '../../Domain/Entities/Mysql/FactorItem.Entity.js';
import { ProductMenuEntity } from '../../Domain/Entities/Mysql/ProductMenu.Entity.js';
import { ProductUnitDetailEntity } from '../../Domain/Entities/Mysql/ProductUnitDetail.Entity.js';
import { UnitPricingEntity } from '../../Domain/Entities/Mysql/UnitPricing.Entity.js';
import { ProductUnitRatioPricingEntity } from '../../Domain/Entities/Mysql/ProductUnitRatioPricing.Entity.js';
import { ProductUnitPricingEntity } from '../../Domain/Entities/Mysql/ProductUnitPricing.Entity.js';
import { ProductPricingEntity } from '../../Domain/Entities/Mysql/ProductPricing.Entity.js';

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
