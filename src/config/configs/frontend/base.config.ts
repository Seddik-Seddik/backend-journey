import extract from '@config/validate-env';
import { registerAs } from '@nestjs/config';
import { IRoutesConfig, routesConfig } from './routes.config';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export interface IFrontEndConfig {
  uri: string;
  routes: IRoutesConfig;
}

class FrontEndEnv {
  @Expose()
  @IsString()
  FRONT_URI: string;
}

export const frontendConfig = registerAs(
  'frontendConfig',
  (): IFrontEndConfig => {
    const config = extract(FrontEndEnv);
    return {
      uri: config.FRONT_URI,
      routes: routesConfig(),
    };
  },
);
