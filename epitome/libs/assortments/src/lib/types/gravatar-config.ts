import { InjectionToken } from '@angular/core';

import { ServiceConfig } from '@auth';

export const GRAVATAR_CONFIG = new InjectionToken(
  'Gravatar URL configuration',
  {
    factory: () =>
      new ServiceConfig({
        Url: '?s=300&d=https%3A%2F%2Fesp.asicentral.com%2Fimages%2Fno_contact.png',
      }),
  }
);
