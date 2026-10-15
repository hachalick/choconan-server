import { Entity, ManyToOne, Column, type Relation } from 'typeorm';
import { ProductUnitPricingEntity } from './ProductUnitPricing.Entity.js';
import { BaseEntity } from './Seed/Base.Entity.js';

@Entity('product_unit_detail')
export class ProductUnitDetailEntity extends BaseEntity {
  //#region properties

  @Column({ type: 'float', nullable: false })
  Amount: number;

  //#endregion

  //#region relations

  @ManyToOne(
    () => ProductUnitPricingEntity,
    (productUnitEntity) => productUnitEntity.ProductUnitDetailParents,
    {
      onDelete: 'CASCADE',
    },
  )
  ParentProductUnitDetail: Relation<ProductUnitPricingEntity>;

  @ManyToOne(
    () => ProductUnitPricingEntity,
    (productUnitEntity) => productUnitEntity.ProductUnitDetailChildren,
    {
      onDelete: 'CASCADE',
    },
  )
  ChildProductUnitDetail: Relation<ProductUnitPricingEntity>;

  //#endregion
}
