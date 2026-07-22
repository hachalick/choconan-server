import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';
import { PresentFactorItemEntity } from './FactorPresentOrder.Entity';

@Entity('present_factor')
export class PresentFactorEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Location: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  IsBusy: boolean;

  @OneToMany(
    () => PresentFactorItemEntity,
    (factorPresentOrderTable) => factorPresentOrderTable.PresentOrderTable,
  )
  FactorPresentOrderTables: PresentFactorItemEntity[];
}
