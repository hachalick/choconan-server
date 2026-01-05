import {
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  TreeChildren,
  TreeParent,
  OneToMany,
  Column,
} from 'typeorm';
import { UnitEntity } from './Unit.entity';
import { ProductUnitRatioEntity } from './ProductUnitRatio.entity';
import { ProductPricingEntity } from './ProductPricing.entity';
import { ProductUnitDetailEntity } from './ProductUnitDetailEntity.entity';

@Entity()
export class ProductUnitEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  product_unit_id: string;

  @Column({ type: 'float', nullable: false })
  ratio: number;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  product_menu_id: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  count_sell: number;

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
  })
  profit: number;

  @ManyToOne(() => ProductPricingEntity, (product) => product.productUnit, {
    onDelete: 'CASCADE',
  })
  product: ProductPricingEntity;

  @ManyToOne(() => UnitEntity, (unit) => unit.product_unit, {
    onDelete: 'CASCADE',
  })
  unit: UnitEntity;

  @OneToMany(() => ProductUnitEntity, (productUnit) => productUnit.product, {
    onDelete: 'CASCADE',
  })
  productUnit: ProductUnitEntity[];

  @OneToMany(
    () => ProductUnitRatioEntity,
    (productUnitRatioEntity) => productUnitRatioEntity.ParentProductUnit1,
    {
      onDelete: 'CASCADE',
    },
  )
  productUnitRatioEntity1: ProductUnitRatioEntity[];

  @OneToMany(
    () => ProductUnitRatioEntity,
    (productUnitRatioEntity) => productUnitRatioEntity.ParentProductUnit2,
    {
      onDelete: 'CASCADE',
    },
  )
  productUnitRatioEntity2: ProductUnitRatioEntity[];

  @OneToMany(
    () => ProductUnitDetailEntity,
    (productUnitDetailEntity) =>
      productUnitDetailEntity.ParentProductUnitDetail,
    {
      onDelete: 'CASCADE',
    },
  )
  productUnitDetailParent: ProductUnitDetailEntity[];

  @OneToMany(
    () => ProductUnitDetailEntity,
    (productUnitDetailEntity) => productUnitDetailEntity.ChildProductUnitDetail,
    {
      onDelete: 'CASCADE',
    },
  )
  productUnitDetailChild: ProductUnitDetailEntity[];
}
