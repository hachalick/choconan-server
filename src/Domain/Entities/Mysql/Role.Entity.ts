import { Column, Entity, OneToMany, type Relation } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity.js';
import { RoleUserEntity } from './RoleUser.Entity.js';

@Entity('role')
export class RoleEntity extends BaseEntity {
  //#region properties

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    default: '',
    unique: true,
    charset: 'utf8',
  })
  Name: string;

  //#endregion

  //#region relations

  @OneToMany(() => RoleUserEntity, (rolesUser) => rolesUser.Role, {
    onDelete: 'CASCADE',
  })
  RoleUsers: Relation<RoleUserEntity[]>;

  //#endregion
}
