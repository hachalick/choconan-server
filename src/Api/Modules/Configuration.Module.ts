import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from '../../Persistence/Configuration/config.js';

@Module({
  imports: [ConfigModule.forRoot({ load: configurations, isGlobal: true })],
})
export class CustomConfigsModule {}
