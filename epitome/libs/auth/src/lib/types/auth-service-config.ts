import { InjectionToken } from '@angular/core';

export const AUTH_SERVICE_CONFIG = new InjectionToken<AuthServiceConfig>(
  'Authentication Service Configuration'
);

export class AuthServiceConfig {
  url? = 'https://api.asicentral.com/v1/login.json';
  uat_url? = 'https://api.uat-asicentral.com/v1/login.json';
  dev_url? = 'https://api.dev-asicentral.com/v1/login.json';
  logoutUrl? = 'https://api.asicentral.com/v1/logout.json';
  logout_uat_url? = 'https://api.uat-asicentral.com/v1/logout.json';
  logout_dev_url? = 'https://api.dev-asicentral.com/v1/logout.json';
  StorageStrategy: 'cookie' | 'localStorage' = 'cookie';
}
