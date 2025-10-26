import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { EconomicPackageEntity } from './EconomicPackage.entity';
import { ProductMenuEntity } from './Product.entity';

@Entity()
export class ContentEconomicPackageEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  content_economic_package_id: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
  })
  count: number;

  @ManyToOne(
    () => EconomicPackageEntity,
    (economicPackage) => economicPackage.contentEconomicPackage,
    { onDelete: 'CASCADE' },
  )
  economicPackage: EconomicPackageEntity;

  @ManyToOne(
    () => ProductMenuEntity,
    (productMenu) => productMenu.contentEconomicPackage,
    { cascade: true },
  )
  @JoinColumn()
  productMenu: ProductMenuEntity;
}
