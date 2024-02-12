import extract from '@config/validate-env';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsHash, IsString } from 'class-validator';

export interface ILoginConfig {
  secret: string;
  maxAge: string;
}

class LoginConfig {
  @Expose()
  @IsHash('sha256')
  LOGIN_JWT_SECRET: string;

  @Expose()
  @IsString()
  LOGIN_JWT_MAX_AGE: string;
}

export const loginConfig = registerAs('loginConfig', (): ILoginConfig => {
  const config = extract(LoginConfig);
  return {
    maxAge: config.LOGIN_JWT_MAX_AGE,
    secret: config.LOGIN_JWT_SECRET,
  };
});
