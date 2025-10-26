import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProductMenuEntity } from 'src/modules/entity/mysql/CategoryProduct.entity';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { EconomicPackageEntity } from 'src/modules/entity/mysql/EconomicPackage.entity';
import { ContentEconomicPackageEntity } from 'src/modules/entity/mysql/ContentEconomicPackage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryProductMenuEntity,
      ProductMenuEntity,
      UserEntity,
      EconomicPackageEntity,
      ContentEconomicPackageEntity,
    ]),
    JwtModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
