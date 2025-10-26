import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';
import { FactorEntity } from './Factor.entity';

@Entity()
export class FactorItemEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  factor_item_id: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  product_name: string;

  @Column({
    type: 'decimal',
    precision: 25,
    scale: 4,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  product_discount: number;

  @Column({
    type: 'decimal',
    precision: 25,
    scale: 4,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  product_price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  product_count: number;

  @ManyToOne(() => FactorEntity, (factorEntity) => factorEntity.factor_items, {
    onDelete: 'CASCADE',
  })
  factorEntity: FactorEntity;
}
