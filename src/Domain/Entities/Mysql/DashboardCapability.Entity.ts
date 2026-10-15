import { Column, Entity, OneToMany, type Relation } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity.js';
import { DashboardCapabilityUserEntity } from './DashboardCapabilityUser.Entity.js';

@Entity('dashboard_capability')
export class DashboardCapabilityEntity extends BaseEntity {
  //#region properties

  @Column({
    type: 'varchar',
    length: 600,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Name: string;

  //#endregion

  //#region relations

  @OneToMany(
    () => DashboardCapabilityUserEntity,
    (dashboardCapabilityUser) => dashboardCapabilityUser.User,
    {
      onDelete: 'CASCADE',
    },
  )
  DashboardCapabilityUsers: Relation<DashboardCapabilityUserEntity[]>;

  //#endregion
}
