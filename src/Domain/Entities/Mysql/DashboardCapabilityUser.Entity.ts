import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';
import { DashboardCapabilityEntity } from './DashboardCapability.Entity';
import { UserEntity } from './User.Entity';

@Entity('dashboard_capability_user')
export class DashboardCapabilityUserEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.DashboardCapabilityUser, {
    onDelete: 'CASCADE',
  })
  User: UserEntity;

  @ManyToOne(
    () => DashboardCapabilityEntity,
    (dashboardCapability) => dashboardCapability.DashboardCapabilityUsers,
    {
      onDelete: 'CASCADE',
    },
  )
  DashboardCapability: DashboardCapabilityEntity;
}
