import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';
import { FactorItemEntity } from './FactorItem.Entity';
import { TransactionFactorEntity } from './TransactionFactor.Entity';

@Entity('factor')
export class FactorEntity extends BaseEntity {
  @Column({ type: 'int', nullable: true })
  FactorNumber: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  IsPay: boolean;

  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  CustomerMobile: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Location: string;

  @Column({
    type: 'decimal',
    precision: 25,
    scale: 4,
    default: 0,
    nullable: false,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value,
    },
  })
  Tax: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value,
    },
  })
  FactorDate: Date;

  @OneToMany(
    () => TransactionFactorEntity,
    (transaction_factors) => transaction_factors.Factor,
  )
  TransactionFactors: TransactionFactorEntity[];

  @OneToMany(() => FactorItemEntity, (factor_items) => factor_items.Factor)
  FactorItems: FactorItemEntity[];
}
