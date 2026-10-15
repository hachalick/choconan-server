import { Entity, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity.js';
import { DashboardCapabilityEntity } from './DashboardCapability.Entity.js';
import { UserEntity } from './User.Entity.js';

@Entity('dashboard_capability_user')
export class DashboardCapabilityUserEntity extends BaseEntity {
  //#region relations

  @ManyToOne(() => UserEntity, (user) => user.DashboardCapabilityUser, {
    onDelete: 'CASCADE',
  })
  User: Relation<UserEntity>;

  @ManyToOne(
    () => DashboardCapabilityEntity,
    (dashboardCapability) => dashboardCapability.DashboardCapabilityUsers,
    {
      onDelete: 'CASCADE',
    },
  )
  DashboardCapability: Relation<DashboardCapabilityEntity>;

  //#endregion
}
