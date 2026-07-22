import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductUnitEntity } from './ProductUnit.entity';

@Entity()
export class UnitEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  unit_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  unit_name: string;

  @OneToMany(() => ProductUnitEntity, (productUnit) => productUnit.unit, {
    onDelete: 'CASCADE',
  })
  product_unit: ProductUnitEntity[];
}
