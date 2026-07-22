import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductMenuEntity } from './ProductMenu.Entity';
import { BaseEntity } from './Seed/Base.Entity';
import { PresentFactorEntity } from './PresentFactor.Entity';

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
  Product: ProductMenuEntity;

  @ManyToOne(
    () => PresentFactorEntity,
    (presentOrderTable) => presentOrderTable.FactorPresentOrderTables,
    { onDelete: 'CASCADE' },
  )
  PresentOrderTable: PresentFactorEntity;

  //#endregion
}
