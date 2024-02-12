import extract from '@config/validate-env';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export interface IRoutesConfig {
  activation: string;
  login: string;
  password_reset: string;
  profile: string;
}

class RoutesEnv {
  @Expose()
  @IsString()
  FRONT_ACCOUNT_ACTIVATION: string;

  @Expose()
  @IsString()
  FRONT_LOGIN: string;

  @Expose()
  @IsString()
  FRONT_PASSWORD_RESET: string;

  @Expose()
  @IsString()
  FRONT_PROFILE: string;
}

export const routesConfig = registerAs(
  'frontendRoutesConfig',
  (): IRoutesConfig => {
    const config = extract(RoutesEnv);
    return {
      activation: config.FRONT_ACCOUNT_ACTIVATION,
      login: config.FRONT_LOGIN,
      password_reset: config.FRONT_PASSWORD_RESET,
      profile: config.FRONT_PROFILE,
    };
  },
);
