import { Column, Entity, OneToMany, type Relation } from 'typeorm';
import { TransactionFactorEntity } from './TransactionFactor.Entity.js';
import { BaseEntity } from './Seed/Base.Entity.js';

@Entity('transaction_type')
export class TransactionTypeEntity extends BaseEntity {
  //#region properties

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  TransactionType: string;

  //#endregion

  //#region relations

  @OneToMany(
    () => TransactionFactorEntity,
    (transaction_factors) => transaction_factors.TransactionType,
  )
  TransactionFactors: Relation<TransactionFactorEntity[]>;

  //#endregion
}
