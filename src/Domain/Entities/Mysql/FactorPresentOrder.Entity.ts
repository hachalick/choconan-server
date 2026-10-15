import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { ProductMenuEntity } from './ProductMenu.Entity.js';
import { BaseEntity } from './Seed/Base.Entity.js';
import { PresentFactorEntity } from './PresentFactor.Entity.js';

@Entity('present_factor_item')
export class PresentFactorItemEntity extends BaseEntity {
  //#region property

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  Count: number;

  //#endregion

  //#region relation

  @ManyToOne(
    () => ProductMenuEntity,
    (products) => products.CategoryProductMenu,
    { onDelete: 'CASCADE' },
  )
  Product: Relation<ProductMenuEntity>;

  @ManyToOne(
    () => PresentFactorEntity,
    (presentOrderTable) => presentOrderTable.FactorPresentOrderTables,
    { onDelete: 'CASCADE' },
  )
  PresentOrderTable: Relation<PresentFactorEntity>;

  //#endregion
}
