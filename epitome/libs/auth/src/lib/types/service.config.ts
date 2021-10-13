import { InjectionToken } from '@angular/core';

export const SERVICE_CONFIG = new InjectionToken<ServiceConfig>(
  'Epitome REST Service Configuration',
  {
    providedIn: 'root',
    factory: () => new ServiceConfig(),
  }
);

export class ServiceConfig {
  Url? = '';
  Uat_Url? = '';
  Dev_Url? = '';
  noImagePath? = '';
  cdn_path? = '';
  constructor(...options: Partial<ServiceConfig>[]) {
    Object.assign(this, ...options);
  }
}
