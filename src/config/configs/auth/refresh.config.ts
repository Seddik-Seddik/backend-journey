import extract from '@config/validate-env';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsHash, IsString } from 'class-validator';

export interface IRefreshConfig {
  secret: string;
  maxAge: string;
}

class RefreshConfig {
  @Expose()
  @IsString()
  REFRESH_JWT_MAX_AGE: string;

  @Expose()
  @IsHash('sha256')
  REFRESH_JWT_SECRET: string;
}

export const refreshConfig = registerAs('refreshConfig', (): IRefreshConfig => {
  const config = extract(RefreshConfig);
  return {
    maxAge: config.REFRESH_JWT_MAX_AGE,
    secret: config.REFRESH_JWT_SECRET,
  };
});
