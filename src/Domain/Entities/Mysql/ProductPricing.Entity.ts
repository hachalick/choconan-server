import { Column, Entity, OneToMany, type Relation } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity.js';
import { ProductUnitPricingEntity } from './ProductUnitPricing.Entity.js';

@Entity('product_pricing')
export class ProductPricingEntity extends BaseEntity {
  //#region properties

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
  })
  BuyPrice: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Name: string;

  //#endregion

  //#region relations

  @OneToMany(
    () => ProductUnitPricingEntity,
    (productUnit) => productUnit.ProductPricing,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnits: Relation<ProductUnitPricingEntity[]>;

  //#endregion
}
