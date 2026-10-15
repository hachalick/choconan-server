import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { FactorEntity } from './Factor.Entity.js';
import { BaseEntity } from './Seed/Base.Entity.js';

@Entity('factor_item')
export class FactorItemEntity extends BaseEntity {
  //#region property

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  ProductName: string;

  @Column({
    type: 'decimal',
    precision: 25,
    scale: 4,
    nullable: false,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value,
    },
  })
  ProductDiscount: number;

  @Column({
    type: 'decimal',
    precision: 25,
    scale: 4,
    nullable: false,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value,
    },
  })
  ProductPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: false,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value,
    },
  })
  ProductCount: number;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  ProductMenuId: string;

  //#endregion

  //#region relation

  @ManyToOne(() => FactorEntity, (factorEntity) => factorEntity.FactorItems, {
    onDelete: 'CASCADE',
  })
  Factor: Relation<FactorEntity>;

  //#endregion
}
