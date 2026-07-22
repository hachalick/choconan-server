import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './User.Entity';
import { RoleEntity } from './Role.Entity';
import { BaseEntity } from './Seed/Base.Entity';

@Entity('role_user')
export class RoleUserEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.RoleUsers, {
    onDelete: 'CASCADE',
  })
  User: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.RoleUsers, {
    onDelete: 'CASCADE',
  })
  Role: RoleEntity;
}
