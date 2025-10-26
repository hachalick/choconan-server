import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';
import { OtpEntity } from 'src/modules/entity/mysql/Otp.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OtpEntity]),
    UserModule,
    JwtModule,
    ServiceModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
