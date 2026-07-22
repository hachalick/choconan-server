import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';
import { ProductUnitPricingEntity } from './ProductUnitPricing.Entity';

@Entity('product_pricing')
export class ProductPricingEntity extends BaseEntity {
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

  @OneToMany(
    () => ProductUnitPricingEntity,
    (productUnit) => productUnit.ProductPricing,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnits: ProductUnitPricingEntity[];
}
