import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ProductUnitEntity } from './ProductUnit.entity';

@Entity()
export class ProductPricingEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  product_id: string;

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
  })
  buy: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  name: string;

  @OneToMany(() => ProductUnitEntity, (productUnit) => productUnit.product, {
    onDelete: 'CASCADE',
  })
  productUnit: ProductUnitEntity[];
}
