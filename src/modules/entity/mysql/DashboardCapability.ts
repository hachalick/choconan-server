import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { DashboardCapabilityUser } from './DashboardCapabilityUser';

@Entity()
export class DashboardCapability {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  dashboard_capability_id: string;

  @Column({
    type: 'varchar',
    length: 600,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  dashboard_capability: string;

  @OneToMany(() => DashboardCapabilityUser, (dashboardCapabilityUser) => dashboardCapabilityUser.user, {
    onDelete: 'CASCADE',
  })
  dashboard_capability_user: DashboardCapabilityUser[];
}
