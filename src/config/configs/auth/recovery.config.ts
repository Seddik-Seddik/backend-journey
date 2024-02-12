import extract from '@config/validate-env';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsHash, IsString } from 'class-validator';

export interface IRecoveryConfig {
  secret: string;
  maxAge: string;
}

class RecoveryConfig {
  @Expose()
  @IsHash('sha256')
  RECOVERY_JWT_SECRET: string;

  @Expose()
  @IsString()
  RECOVERY_JWT_MAX_AGE: string;
}

export const recoveryConfig = registerAs(
  'recoveryConfig',
  (): IRecoveryConfig => {
    const config = extract(RecoveryConfig);
    return {
      maxAge: config.RECOVERY_JWT_MAX_AGE,
      secret: config.RECOVERY_JWT_SECRET,
    };
  },
);
