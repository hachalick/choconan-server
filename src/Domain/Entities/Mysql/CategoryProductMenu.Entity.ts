import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';
import { ProductMenuEntity } from './ProductMenu.Entity';

@Entity('category_product_menu')
export class CategoryProductMenuEntity extends BaseEntity {
  //#region property

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Icon: string;

  @Column({
    type: 'boolean',
    nullable: false,
    unique: false,
  })
  IsShowMenu: boolean;

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
    length: 500,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  MetaDescription: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  Description: string;

  //#endregion

  //#region relation

  @OneToMany(
    () => ProductMenuEntity,
    (products) => products.CategoryProductMenu,
  )
  Products: ProductMenuEntity[];

  //#endregion
}
