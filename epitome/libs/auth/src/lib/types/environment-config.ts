import { InjectionToken } from '@angular/core';

export interface EnvironmentConfig {
  production: boolean;
  localDev: boolean;
  auth: {
    Url: string;
    TokenPath: string;
    AuthorizationHeader: string;
  };
}

export const ENVIRONMENT_CONFIG = new InjectionToken('enivornment config');
