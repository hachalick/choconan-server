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
import { ProductUnitEntity } from './ProductUnit.entity';

@Entity()
export class ProductUnitRatioEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  product_unit_ratio_id: string;

  @Column({ type: 'boolean', nullable: false })
  is_ratio: boolean;

  @ManyToOne(
    () => ProductUnitEntity,
    (productUnitEntity) => productUnitEntity.productUnit,
    {
      onDelete: 'CASCADE',
    },
  )
  ParentProductUnit1: ProductUnitEntity;

  @ManyToOne(
    () => ProductUnitEntity,
    (productUnitEntity) => productUnitEntity.productUnit,
    {
      onDelete: 'CASCADE',
    },
  )
  ParentProductUnit2: ProductUnitEntity;
}
