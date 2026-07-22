import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardCapabilityEntity } from 'src/Domain/Entities/Mysql/DashboardCapability.Entity';
import { DashboardCapabilityUserEntity } from 'src/Domain/Entities/Mysql/DashboardCapabilityUser.Entity';
import { RoleEntity } from 'src/Domain/Entities/Mysql/Role.Entity';
import { RoleUserEntity } from 'src/Domain/Entities/Mysql/RoleUser.Entity';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { UserEntity } from 'src/Domain/Entities/Mysql/User.Entity';
import { JwtModule } from './Jwt.Module';
import { UserController } from '../Controllers/User.Controller';
import { UserService } from 'src/Application/Services/User.Service';

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
