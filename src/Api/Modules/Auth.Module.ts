import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from 'src/Domain/Entities/Mysql/Otp.Entity';
import { ConnectionNameMysql } from 'src/Domain/Entities/Mysql/Seed/ConnectionNameMysql';
import { UserEntity } from 'src/Domain/Entities/Mysql/User.Entity';
import { UserModule } from './User.Module';
import { JwtModule } from './Jwt.Module';
import { ServiceModule } from './Service.Module';
import { AuthService } from 'src/Application/Services/Auth.Service';
import { AuthController } from '../Controllers/Auth.Controller';
import { RoleEntity } from 'src/Domain/Entities/Mysql/Role.Entity';
import { DashboardCapabilityEntity } from 'src/Domain/Entities/Mysql/DashboardCapability.Entity';

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
