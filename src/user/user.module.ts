import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { RoleEntity } from 'src/modules/entity/mysql/Role.entity';
import { DashboardCapability } from 'src/modules/entity/mysql/DashboardCapability';
import { DashboardCapabilityUser } from 'src/modules/entity/mysql/DashboardCapabilityUser';
import { RoleUserEntity } from 'src/modules/entity/mysql/RoleUser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, DashboardCapability, DashboardCapabilityUser, RoleUserEntity]),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
