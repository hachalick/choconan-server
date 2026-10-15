import { Entity, ManyToOne, type Relation } from 'typeorm';
import { UserEntity } from './User.Entity.js';
import { RoleEntity } from './Role.Entity.js';
import { BaseEntity } from './Seed/Base.Entity.js';

@Entity('role_user')
export class RoleUserEntity extends BaseEntity {
  //#region relations

  @ManyToOne(() => UserEntity, (user) => user.RoleUsers, {
    onDelete: 'CASCADE',
  })
  User: Relation<UserEntity>;

  @ManyToOne(() => RoleEntity, (role) => role.RoleUsers, {
    onDelete: 'CASCADE',
  })
  Role: Relation<RoleEntity>;

  //#endregion
}
