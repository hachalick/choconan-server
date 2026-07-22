import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { ContentEconomicPackageEntity } from './ContentEconomicPackage.entity';

@Entity()
export class EconomicPackageEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  economic_package_id: string;

  @Column({
    type: 'varchar',
    length: 600,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  src: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  title: string;

  @Column({
    type: 'time',
    nullable: true,
  })
  start_hours: string;

  @Column({
    type: 'time',
    nullable: true,
  })
  end_hours: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  start_day: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  end_day: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  price: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_active: boolean;

  @OneToMany(
    () => ContentEconomicPackageEntity,
    (contentEconomicPackage) => contentEconomicPackage.economicPackage,
  )
  contentEconomicPackage: ContentEconomicPackageEntity[];
}
