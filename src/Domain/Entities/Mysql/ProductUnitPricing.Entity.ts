import { Entity, ManyToOne, OneToMany, Column, type Relation } from 'typeorm';
import { ProductPricingEntity } from './ProductPricing.Entity.js';
import { ProductUnitDetailEntity } from './ProductUnitDetail.Entity.js';
import { BaseEntity } from './Seed/Base.Entity.js';
import { UnitPricingEntity } from './UnitPricing.Entity.js';
import { ProductUnitRatioPricingEntity } from './ProductUnitRatioPricing.Entity.js';

@Entity('product_unit_pricing')
export class ProductUnitPricingEntity extends BaseEntity {
  //#region properties

  @Column({ type: 'float', nullable: false })
  Ratio: number;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  ProductMenuId: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  CountSell: number;

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
  })
  Profit: number;

  //#endregion

  //#region relations

  @ManyToOne(() => ProductPricingEntity, (product) => product.ProductUnits, {
    onDelete: 'CASCADE',
  })
  ProductPricing: Relation<ProductPricingEntity>;

  @ManyToOne(() => UnitPricingEntity, (unit) => unit.ProductUnits, {
    onDelete: 'CASCADE',
  })
  UnitPricing: Relation<UnitPricingEntity>;

  @OneToMany(
    () => ProductUnitPricingEntity,
    (productUnit) => productUnit.ProductPricing,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnit: Relation<ProductUnitPricingEntity[]>;

  @OneToMany(
    () => ProductUnitRatioPricingEntity,
    (productUnitRatioEntity) => productUnitRatioEntity.ProductUnitPricing1,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitRatios1: Relation<ProductUnitRatioPricingEntity[]>;

  @OneToMany(
    () => ProductUnitRatioPricingEntity,
    (productUnitRatioEntity) => productUnitRatioEntity.ProductUnitPricing2,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitRatios2: Relation<ProductUnitRatioPricingEntity[]>;

  @OneToMany(
    () => ProductUnitDetailEntity,
    (productUnitDetailEntity) =>
      productUnitDetailEntity.ParentProductUnitDetail,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitDetailParents: Relation<ProductUnitDetailEntity[]>;

  @OneToMany(
    () => ProductUnitDetailEntity,
    (productUnitDetailEntity) => productUnitDetailEntity.ChildProductUnitDetail,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitDetailChildren: Relation<ProductUnitDetailEntity[]>;

  //#endregion
}
