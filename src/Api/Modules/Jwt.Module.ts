import { Module } from '@nestjs/common';
import { JwtService } from 'src/Application/Services/Jwt.Service';

@Module({
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
