import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigurationService } from '@nestjs/config';
import IAuthConfig from './configs/auth/auth.config';
import { IDatabaseConfig, IFrontEndConfig } from './configs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { IMiscConfig } from './configs/misc.config';

@Injectable()
export class ConfigService extends ConfigurationService {
  getAuthConfig(): IAuthConfig {
    return this.getOrThrow<IAuthConfig>('authConfig');
  }

  getDatabaseConfig(): IDatabaseConfig {
    return this.getOrThrow<IDatabaseConfig>('databaseConfig');
  }
  getTypeormConfig(): TypeOrmModuleOptions {
    const config = this.getDatabaseConfig();
    console.log(config);

    return {
      type: 'mysql',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [join(__dirname, '../**/*entity{.ts,.js}')],
      synchronize: true,
    };
  }

  getFrontConfig(): IFrontEndConfig {
    return this.getOrThrow<IFrontEndConfig>('frontendConfig');
  }

  getMiscConfig(): IMiscConfig {
    return this.getOrThrow<IMiscConfig>('miscConfig');
  }
}
