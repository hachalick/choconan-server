import { Column, Entity, OneToMany } from 'typeorm';
import { TransactionFactorEntity } from './TransactionFactor.Entity';
import { BaseEntity } from './Seed/Base.Entity';

@Entity('transaction_type')
export class TransactionTypeEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  TransactionType: string;

  @OneToMany(
    () => TransactionFactorEntity,
    (transaction_factors) => transaction_factors.TransactionType,
  )
  TransactionFactors: TransactionFactorEntity[];
}
