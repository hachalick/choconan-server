import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';
import { TransactionTypeEntity } from './TransactionType.Entity';
import { FactorEntity } from './Factor.Entity';

@Entity('transaction_factor')
export class TransactionFactorEntity extends BaseEntity {
  @Column({
    type: 'decimal',
    precision: 25,
    scale: 4,
    nullable: false,
  })
  TransactionAmount: number;

  @ManyToOne(
    () => TransactionTypeEntity,
    (transactionTypeEntity) => transactionTypeEntity.TransactionFactors,
    { onDelete: 'SET NULL' },
  )
  TransactionType: TransactionTypeEntity;

  @ManyToOne(
    () => FactorEntity,
    (factorEntity) => factorEntity.TransactionFactors,
    { onDelete: 'CASCADE' },
  )
  Factor: FactorEntity;
}
