import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity.js';
import { TransactionTypeEntity } from './TransactionType.Entity.js';
import { FactorEntity } from './Factor.Entity.js';

@Entity('transaction_factor')
export class TransactionFactorEntity extends BaseEntity {
  //#region properties

  @Column({
    type: 'decimal',
    precision: 25,
    scale: 4,
    nullable: false,
  })
  TransactionAmount: number;

  //#endregion

  //#region relations

  @ManyToOne(
    () => TransactionTypeEntity,
    (transactionTypeEntity) => transactionTypeEntity.TransactionFactors,
    { onDelete: 'SET NULL' },
  )
  TransactionType: Relation<TransactionTypeEntity>;

  @ManyToOne(
    () => FactorEntity,
    (factorEntity) => factorEntity.TransactionFactors,
    { onDelete: 'CASCADE' },
  )
  Factor: Relation<FactorEntity>;

  //#endregion
}
