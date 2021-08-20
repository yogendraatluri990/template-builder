import { InjectionToken } from '@angular/core';

import { ServiceConfig } from '@auth';

export const SAMPLE_APP_PROP = new InjectionToken(
  'SAMPLE APP PROPERTIES URL Configuration',
  {
    factory: () =>
      new ServiceConfig({
        Url:
          '/template-builder/sample-app-properties.json',
      }),
  }
);
