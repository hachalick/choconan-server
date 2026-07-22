import { Entity, ManyToOne, Column } from 'typeorm';
import { ProductUnitPricingEntity } from './ProductUnitPricing.Entity';
import { BaseEntity } from './Seed/Base.Entity';

@Entity('product_unit_ratio_pricing')
export class ProductUnitRatioPricingEntity extends BaseEntity {
  @Column({ type: 'boolean', nullable: false })
  IsRatio: boolean;

  @ManyToOne(
    () => ProductUnitPricingEntity,
    (productUnitEntity) => productUnitEntity.ProductUnit,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitPricing1: ProductUnitPricingEntity;

  @ManyToOne(
    () => ProductUnitPricingEntity,
    (productUnitEntity) => productUnitEntity.ProductUnit,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitPricing2: ProductUnitPricingEntity;
}
