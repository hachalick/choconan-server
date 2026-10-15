import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../../Application/Services/User.Service.js';
import { UserController } from '../Controllers/User.Controller.js';
import { JwtModule } from './Jwt.Module.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { RoleUserEntity } from '../../Domain/Entities/Mysql/RoleUser.Entity.js';
import { DashboardCapabilityUserEntity } from '../../Domain/Entities/Mysql/DashboardCapabilityUser.Entity.js';
import { DashboardCapabilityEntity } from '../../Domain/Entities/Mysql/DashboardCapability.Entity.js';
import { RoleEntity } from '../../Domain/Entities/Mysql/Role.Entity.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        UserEntity,
        RoleEntity,
        DashboardCapabilityEntity,
        DashboardCapabilityUserEntity,
        RoleUserEntity,
      ],
      ConnectionNameMysql.global,
    ),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
