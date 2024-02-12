import extract from '@config/validate-env';
import { registerAs } from '@nestjs/config';
import { IsPositive, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

class DatabaseEnv {
  @Expose()
  @IsString()
  MYSQL_HOST: string;

  @Expose()
  @IsPositive()
  MYSQL_PORT: number;

  @Expose()
  @IsString()
  MYSQL_USERNAME: string;

  @Expose()
  @IsString()
  MYSQL_PASSWORD: string;

  @Expose()
  @IsString()
  MYSQL_DATABASE: string;
}

export const databaseConfig = registerAs(
  'databaseConfig',
  (): IDatabaseConfig => {
    const config = extract(DatabaseEnv);
    return {
      host: config.MYSQL_HOST,
      port: config.MYSQL_PORT,
      username: config.MYSQL_USERNAME,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DATABASE,
    };
  },
);
