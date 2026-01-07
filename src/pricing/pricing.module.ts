import { Module } from '@nestjs/common';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductUnitEntity } from 'src/modules/entity/mysql/ProductUnit.entity';
import { ProductUnitRatioEntity } from 'src/modules/entity/mysql/ProductUnitRatio.entity';
import { UnitEntity } from 'src/modules/entity/mysql/Unit.entity';
import { ProductPricingEntity } from 'src/modules/entity/mysql/ProductPricing.entity';
import { ProductUnitDetailEntity } from 'src/modules/entity/mysql/ProductUnitDetailEntity.entity';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { CostPricingEntity } from 'src/modules/entity/mysql/CostPricing.entity';
import { FactorItemEntity } from 'src/modules/entity/mysql/FactorItem.entity';
import { FactorEntity } from 'src/modules/entity/mysql/Factor.entity';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductPricingEntity,
      ProductUnitEntity,
      ProductUnitRatioEntity,
      UnitEntity,
      ProductUnitDetailEntity,
      ProductMenuEntity,
      CostPricingEntity,
      FactorEntity,
      FactorItemEntity,
      UserEntity,
    ]),
    JwtModule,
  ],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
