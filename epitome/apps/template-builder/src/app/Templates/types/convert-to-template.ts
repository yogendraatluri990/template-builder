import { InjectionToken } from '@angular/core';

import { ServiceConfig } from '@auth';

export const CONVERT_TO_TEMPLATE = new InjectionToken(
  'Convert To Template URL',
  {
    factory: () =>
      new ServiceConfig({
        Url: '/template-builder/convert-application.json',
      }),
  }
);

export const RETRIEVE_APP_INFO = new InjectionToken('Retrieve App Info URL', {
  factory: () =>
    new ServiceConfig({
      Url: '/template-builder/app-info.json?editAppCode=',
    }),
});
