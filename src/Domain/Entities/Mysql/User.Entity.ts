import { Column, Entity, OneToMany, type Relation } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity.js';
import { RoleUserEntity } from './RoleUser.Entity.js';
import { DashboardCapabilityUserEntity } from './DashboardCapabilityUser.Entity.js';

@Entity('user')
export class UserEntity extends BaseEntity {
  //#region properties

  @Column({
    type: 'varchar',
    nullable: true,
    length: 150,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 250,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Family: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  Password: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 250,
    default: '/default.jpg',
    unique: false,
    charset: 'utf8',
  })
  Profile: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 3,
    unique: false,
    default: '98',
  })
  NationalCode: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 12,
    unique: false,
    default: '',
  })
  Phone: string;

  //#endregion

  //#region relations

  @OneToMany(() => RoleUserEntity, (rolesUser) => rolesUser.User, {
    onDelete: 'CASCADE',
  })
  RoleUsers: Relation<RoleUserEntity[]>;

  @OneToMany(
    () => DashboardCapabilityUserEntity,
    (dashboardCapabilityUser) => dashboardCapabilityUser.User,
    {
      onDelete: 'CASCADE',
    },
  )
  DashboardCapabilityUser: Relation<DashboardCapabilityUserEntity[]>;

  //#endregion
}
