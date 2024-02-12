import extract from '@config/validate-env';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsHash, IsString } from 'class-validator';

export interface IRegistrationConfig {
  secret: string;
  maxAge: string;
}

class RegistrationConfig {
  @Expose()
  @IsString()
  REGISTRATION_JWT_MAX_AGE: string;

  @Expose()
  @IsHash('sha256')
  REGISTRATION_JWT_SECRET: string;
}

export const registrationConfig = registerAs(
  'registrationConfig',
  (): IRegistrationConfig => {
    const config = extract(RegistrationConfig);
    return {
      maxAge: config.REGISTRATION_JWT_MAX_AGE,
      secret: config.REGISTRATION_JWT_SECRET,
    };
  },
);
