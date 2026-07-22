import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { ProductPricingEntity } from './ProductPricing.Entity';
import { ProductUnitDetailEntity } from './ProductUnitDetail.Entity';
import { BaseEntity } from './Seed/Base.Entity';
import { UnitPricingEntity } from './UnitPricing.Entity';
import { ProductUnitRatioPricingEntity } from './ProductUnitRatioPricing.Entity';

@Entity('product_unit_pricing')
export class ProductUnitPricingEntity extends BaseEntity {
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

  @ManyToOne(() => ProductPricingEntity, (product) => product.ProductUnits, {
    onDelete: 'CASCADE',
  })
  ProductPricing: ProductPricingEntity;

  @ManyToOne(() => UnitPricingEntity, (unit) => unit.ProductUnits, {
    onDelete: 'CASCADE',
  })
  UnitPricing: UnitPricingEntity;

  @OneToMany(
    () => ProductUnitPricingEntity,
    (productUnit) => productUnit.ProductPricing,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnit: ProductUnitPricingEntity[];

  @OneToMany(
    () => ProductUnitRatioPricingEntity,
    (productUnitRatioEntity) => productUnitRatioEntity.ProductUnitPricing1,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitRatios1: ProductUnitRatioPricingEntity[];

  @OneToMany(
    () => ProductUnitRatioPricingEntity,
    (productUnitRatioEntity) => productUnitRatioEntity.ProductUnitPricing2,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitRatios2: ProductUnitRatioPricingEntity[];

  @OneToMany(
    () => ProductUnitDetailEntity,
    (productUnitDetailEntity) =>
      productUnitDetailEntity.ParentProductUnitDetail,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitDetailParents: ProductUnitDetailEntity[];

  @OneToMany(
    () => ProductUnitDetailEntity,
    (productUnitDetailEntity) => productUnitDetailEntity.ChildProductUnitDetail,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnitDetailChildren: ProductUnitDetailEntity[];
}
