import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CategoryProductMenuEntity } from './CategoryProductMenu.Entity';
import { BaseEntity } from './Seed/Base.Entity';
import { ContentEconomicPackageEntity } from './ContentEconomicPackage.Entity';
import { PresentFactorItemEntity } from './FactorPresentOrder.Entity';
import { ProductUnitPricingEntity } from './ProductUnitPricing.Entity';

@Entity('product_menu')
export class ProductMenuEntity extends BaseEntity {
  //#region property

  @Column({
    type: 'boolean',
    nullable: false,
    unique: false,
  })
  IsShowMenu: boolean;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  Price: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  Waiting: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  MetaTitle: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  MetaDescription: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  Description: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  SrcImage: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    charset: 'utf8',
  })
  SnapId: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    charset: 'utf8',
  })
  TapsiId: string;

  //#endregion

  //#region relation

  @ManyToOne(
    () => CategoryProductMenuEntity,
    (categoryProduct) => categoryProduct.Products,
    { onDelete: 'CASCADE' },
  )
  CategoryProductMenu: CategoryProductMenuEntity;

  @OneToMany(
    () => PresentFactorItemEntity,
    (detailsPresentOrder) => detailsPresentOrder.PresentOrderTable,
    { onDelete: 'CASCADE' },
  )
  DetailsPresentOrders: PresentFactorItemEntity[];

  @OneToMany(
    () => ContentEconomicPackageEntity,
    (contentEconomicPackage) => contentEconomicPackage.ProductMenu,
    { onDelete: 'CASCADE' },
  )
  ContentEconomicPackages: ContentEconomicPackageEntity[];

  @OneToMany(
    () => ProductUnitPricingEntity,
    (productUnit) => productUnit.ProductPricing,
    {
      onDelete: 'CASCADE',
    },
  )
  ProductUnits: ProductUnitPricingEntity[];

  //#endregion
}
