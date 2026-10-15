import { Column, Entity, OneToMany, type Relation } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity.js';
import { PresentFactorItemEntity } from './FactorPresentOrder.Entity.js';

@Entity('present_factor')
export class PresentFactorEntity extends BaseEntity {
  //#region properties

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

  //#endregion

  //#region relations

  @OneToMany(
    () => PresentFactorItemEntity,
    (factorPresentOrderTable) => factorPresentOrderTable.PresentOrderTable,
  )
  FactorPresentOrderTables: Relation<PresentFactorItemEntity[]>;

  //#endregion
}
