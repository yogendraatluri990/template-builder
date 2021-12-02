export interface EnvironmentConfig {
  production: boolean;
  localDev: boolean;
  auth: {
    Url: string;
    TokenPath: string;
    AuthorizationHeader: string;
  };
}
