import { Entity, ManyToOne, Column, type Relation } from 'typeorm';
import { ProductUnitPricingEntity } from './ProductUnitPricing.Entity.js';
import { BaseEntity } from './Seed/Base.Entity.js';

@Entity('product_unit_ratio_pricing')
export class ProductUnitRatioPricingEntity extends BaseEntity {
  //#region properties

  @Column({ type: 'boolean', nullable: false })
  IsRatio: boolean;

  //#endregion

  //#region relations

  @ManyToOne(
    () => ProductUnitPricingEntity,
    (productUnitEntity) => productUnitEntity.ProductUnit,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitPricing1: Relation<ProductUnitPricingEntity>;

  @ManyToOne(
    () => ProductUnitPricingEntity,
    (productUnitEntity) => productUnitEntity.ProductUnit,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitPricing2: Relation<ProductUnitPricingEntity>;

  //#endregion
}
