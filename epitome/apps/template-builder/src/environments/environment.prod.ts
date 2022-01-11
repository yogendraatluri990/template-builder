import { EnvironmentConfig } from '@auth';

export const environment: EnvironmentConfig = {
  production: true,
  localDev: false,
  auth: {
    Url: 'https://authentication.asicentral.com',
    TokenPath: '/oauth2/token',
    AuthorizationHeader:
      'Basic MTgyOjhhZTM3ZDRlMzBkZTQyODRiZjA5NzI1ZDY4ODJjYzE3',
  },
};
