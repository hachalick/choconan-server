import { Column, Entity, OneToMany, type Relation } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity.js';
import { ContentEconomicPackageEntity } from './ContentEconomicPackage.Entity.js';

@Entity('economic_package')
export class EconomicPackageEntity extends BaseEntity {
  //#region properties

  @Column({
    type: 'varchar',
    length: 600,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  SrcImage: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Title: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value,
    },
  })
  StartDate: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value,
    },
  })
  EndDate: Date;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  Price: number;

  @Column({
    type: 'boolean',
    nullable: false,
    unique: false,
  })
  IsShowMenu: boolean;

  //#endregion

  //#region relations

  @OneToMany(
    () => ContentEconomicPackageEntity,
    (contentEconomicPackage) => contentEconomicPackage.EconomicPackage,
  )
  ContentEconomicPackages: Relation<ContentEconomicPackageEntity[]>;

  //#endregion
}
