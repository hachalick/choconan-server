import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../../Application/Services/Auth.Service.js';
import { AuthController } from '../Controllers/Auth.Controller.js';
import { ServiceModule } from './Service.Module.js';
import { JwtModule } from './Jwt.Module.js';
import { ConnectionNameMysql } from '../../Domain/Entities/Mysql/Seed/ConnectionNameMysql.js';
import { UserModule } from './User.Module.js';
import { UserEntity } from '../../Domain/Entities/Mysql/User.Entity.js';
import { OtpEntity } from '../../Domain/Entities/Mysql/Otp.Entity.js';
import { RoleEntity } from '../../Domain/Entities/Mysql/Role.Entity.js';
import { DashboardCapabilityEntity } from '../../Domain/Entities/Mysql/DashboardCapability.Entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [UserEntity, OtpEntity, RoleEntity, DashboardCapabilityEntity],
      ConnectionNameMysql.global,
    ),
    UserModule,
    JwtModule,
    ServiceModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
