import { Entity, ManyToOne, Column } from 'typeorm';
import { ProductUnitPricingEntity } from './ProductUnitPricing.Entity';
import { BaseEntity } from './Seed/Base.Entity';

@Entity('product_unit_detail')
export class ProductUnitDetailEntity extends BaseEntity {
  @Column({ type: 'float', nullable: false })
  Amount: number;

  @ManyToOne(
    () => ProductUnitPricingEntity,
    (productUnitEntity) => productUnitEntity.ProductUnitDetailParents,
    {
      onDelete: 'CASCADE',
    },
  )
  ParentProductUnitDetail: ProductUnitPricingEntity;

  @ManyToOne(
    () => ProductUnitPricingEntity,
    (productUnitEntity) => productUnitEntity.ProductUnitDetailChildren,
    {
      onDelete: 'CASCADE',
    },
  )
  ChildProductUnitDetail: ProductUnitPricingEntity;
}
