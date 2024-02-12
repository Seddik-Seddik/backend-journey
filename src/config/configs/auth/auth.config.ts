import { registerAs } from '@nestjs/config';
import { ILoginConfig, loginConfig } from './login.config';
import { IRecoveryConfig, recoveryConfig } from './recovery.config';
import { IRefreshConfig, refreshConfig } from './refresh.config';
import { IRegistrationConfig, registrationConfig } from './registration.config';

export default interface IAuthConfig {
  login: ILoginConfig;
  registration: IRegistrationConfig;
  refresh: IRefreshConfig;
  recovery: IRecoveryConfig;
}

export const authConfig = registerAs('authConfig', (): IAuthConfig => {
  return {
    login: loginConfig(),
    recovery: recoveryConfig(),
    refresh: refreshConfig(),
    registration: registrationConfig(),
  };
});
