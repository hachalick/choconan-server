import { Module } from '@nestjs/common';
import { JwtService } from '../../Application/Services/Jwt.Service.js';

@Module({
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
