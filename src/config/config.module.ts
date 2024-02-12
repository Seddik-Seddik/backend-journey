import { Module } from '@nestjs/common';
import { ConfigModule as ConfigurationModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Module({
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule extends ConfigurationModule {}
