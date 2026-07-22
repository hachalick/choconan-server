import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductMenuEntity } from './ProductMenu.Entity';
import { BaseEntity } from './Seed/Base.Entity';
import { EconomicPackageEntity } from './EconomicPackage.Entity';

@Entity('content_economic_package')
export class ContentEconomicPackageEntity extends BaseEntity {
  @Column({
    type: 'int',
    nullable: false,
    default: 1,
  })
  Count: number;

  @ManyToOne(
    () => EconomicPackageEntity,
    (economicPackage) => economicPackage.ContentEconomicPackages,
    { onDelete: 'CASCADE' },
  )
  EconomicPackage: EconomicPackageEntity;

  @ManyToOne(
    () => ProductMenuEntity,
    (productMenu) => productMenu.ContentEconomicPackages,
    { cascade: true },
  )
  @JoinColumn()
  ProductMenu: ProductMenuEntity;
}
