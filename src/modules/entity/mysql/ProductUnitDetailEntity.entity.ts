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
export class ProductUnitDetailEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  product_unit_detail_id: string;

  @Column({ type: 'float', nullable: false })
  amount: number;

  @ManyToOne(
    () => ProductUnitEntity,
    (productUnitEntity) => productUnitEntity.productUnitDetailParent,
    {
      onDelete: 'CASCADE',
    },
  )
  ParentProductUnitDetail: ProductUnitEntity;

  @ManyToOne(
    () => ProductUnitEntity,
    (productUnitEntity) => productUnitEntity.productUnitDetailChild,
    {
      onDelete: 'CASCADE',
    },
  )
  ChildProductUnitDetail: ProductUnitEntity;
}
