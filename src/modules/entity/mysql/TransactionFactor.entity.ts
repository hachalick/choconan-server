import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';
import { FactorEntity } from './Factor.entity';
import { TransactionTypeEntity } from './TransactionType.entity';

@Entity()
export class TransactionFactorEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  transaction_type_id: string;

  @Column({
    type: 'decimal',
    precision: 25,
    scale: 4,
    nullable: false,
  })
  transaction_amount: number;

  @ManyToOne(
    () => TransactionTypeEntity,
    (transactionTypeEntity) => transactionTypeEntity.transaction_factors,
    { onDelete: 'SET NULL' },
  )
  transactionTypeEntity: TransactionTypeEntity;

  @ManyToOne(
    () => FactorEntity,
    (factorEntity) => factorEntity.transaction_factors,
    { onDelete: 'CASCADE' },
  )
  factorEntity: FactorEntity;
}
