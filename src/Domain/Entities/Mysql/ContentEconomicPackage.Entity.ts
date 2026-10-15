import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { ProductMenuEntity } from './ProductMenu.Entity.js';
import { BaseEntity } from './Seed/Base.Entity.js';
import { EconomicPackageEntity } from './EconomicPackage.Entity.js';

@Entity('content_economic_package')
export class ContentEconomicPackageEntity extends BaseEntity {
  //#region properties

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
  })
  Count: number;

  //#endregion

  //#region relations

  @ManyToOne(
    () => EconomicPackageEntity,
    (economicPackage) => economicPackage.ContentEconomicPackages,
    { onDelete: 'CASCADE' },
  )
  EconomicPackage: Relation<EconomicPackageEntity>;

  @ManyToOne(
    () => ProductMenuEntity,
    (productMenu) => productMenu.ContentEconomicPackages,
    { cascade: true },
  )
  @JoinColumn()
  ProductMenu: Relation<ProductMenuEntity>;

  //#endregion
}
