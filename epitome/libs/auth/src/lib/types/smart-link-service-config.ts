import { InjectionToken } from '@angular/core';
import { ServiceConfig } from './service.config';

export const SMARTLINK_SERVICE_CONFIG = new InjectionToken<ServiceConfig>(
  'SmartLink Service Configuration',
  {
    providedIn: 'root',
    factory: () =>
      new ServiceConfig({
        Url: 'https://api.asicentral.com/v1',
        Uat_Url: 'https://api.uat-asicentral.com/v1',
        Dev_Url: 'https://api.dev-asicentral.com/v1',
      }),
  }
);
