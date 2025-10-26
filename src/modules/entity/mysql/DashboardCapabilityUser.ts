import { Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './User.entity';
import { DashboardCapability } from './DashboardCapability';

@Entity()
export class DashboardCapabilityUser {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  dashboard_capability_id: string;

  @ManyToOne(() => UserEntity, (user) => user.rolesUser, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(
    () => DashboardCapability,
    (dashboardCapability) => dashboardCapability.dashboard_capability_user,
    {
      onDelete: 'CASCADE',
    },
  )
  dashboard_capability: DashboardCapability;
}
