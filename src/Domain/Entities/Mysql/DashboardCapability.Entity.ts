import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';
import { DashboardCapabilityUserEntity } from './DashboardCapabilityUser.Entity';

@Entity('dashboard_capability')
export class DashboardCapabilityEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 600,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Name: string;

  @OneToMany(
    () => DashboardCapabilityUserEntity,
    (dashboardCapabilityUser) => dashboardCapabilityUser.User,
    {
      onDelete: 'CASCADE',
    },
  )
  DashboardCapabilityUsers: DashboardCapabilityUserEntity[];
}
