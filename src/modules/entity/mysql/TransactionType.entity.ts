import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { TransactionFactorEntity } from './TransactionFactor.entity';

@Entity()
export class TransactionTypeEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  transaction_type_id: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  transaction_type: string;

  @OneToMany(
    () => TransactionFactorEntity,
    (transaction_factors) => transaction_factors.transactionTypeEntity,
  )
  transaction_factors: TransactionFactorEntity[];
}
