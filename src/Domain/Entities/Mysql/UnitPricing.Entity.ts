import { Column, Entity, OneToMany, type Relation } from 'typeorm';
import { ProductUnitPricingEntity } from './ProductUnitPricing.Entity.js';
import { BaseEntity } from './Seed/Base.Entity.js';

@Entity('unit_pricing')
export class UnitPricingEntity extends BaseEntity {
  //#region properties

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Name: string;

  //#endregion

  //#region relations

  @OneToMany(
    () => ProductUnitPricingEntity,
    (productUnit) => productUnit.UnitPricing,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnits: Relation<ProductUnitPricingEntity[]>;

  //#endregion
}
