import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { TransactionFactorEntity } from './TransactionFactor.entity';
import { FactorItemEntity } from './FactorItem.entity';

@Entity()
export class FactorEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  factor_id: string;

  @Column({ type: 'int', nullable: true })
  factor_number: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  pay_status: boolean;

  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  customer_mobile: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  location: string;

  @Column({
    type: 'decimal',
    precision: 25,
    scale: 4,
    default: 0,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  tax: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
  })
  create_at: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value),
    },
  })
  update_at: Date;

  @OneToMany(
    () => TransactionFactorEntity,
    (transaction_factors) => transaction_factors.factorEntity,
  )
  transaction_factors: TransactionFactorEntity[];

  @OneToMany(
    () => FactorItemEntity,
    (factor_items) => factor_items.factorEntity,
  )
  factor_items: FactorItemEntity[];
}
