import { Column, Entity, OneToMany } from 'typeorm';
import { ProductUnitPricingEntity } from './ProductUnitPricing.Entity';
import { BaseEntity } from './Seed/Base.Entity';

@Entity('unit_pricing')
export class UnitPricingEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Name: string;

  @OneToMany(
    () => ProductUnitPricingEntity,
    (productUnit) => productUnit.UnitPricing,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnits: ProductUnitPricingEntity[];
}
