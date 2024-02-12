import { Module } from '@nestjs/common';
import { AppController } from '@app.controller';
import { AppService } from '@app.service';
import { ConfigModule } from '@config/config.module';
import * as configs from '@config/configs/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@config/config.service';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.local',
        '.env',
        '.env.development.local',
        '.env.development',
      ],
      load: Object.keys(configs).map((key) => configs[key]),
      expandVariables: true,
      cache: true,

    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        return configService.getTypeormConfig();
      },

    }),
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
