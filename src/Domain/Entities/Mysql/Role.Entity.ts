import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';
import { RoleUserEntity } from './RoleUser.Entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    default: '',
    unique: true,
    charset: 'utf8',
  })
  Name: string;

  @OneToMany(() => RoleUserEntity, (rolesUser) => rolesUser.User, {
    onDelete: 'CASCADE',
  })
  RoleUsers: RoleUserEntity[];
}
