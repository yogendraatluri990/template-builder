import { NgModule, ModuleWithProviders } from '@angular/core';
// importing types
import { AUTH_SERVICE_CONFIG, AuthServiceConfig } from './types';
// importing local-components
import { EspLoginModule } from './components/esp-login/esp-login.component';

@NgModule({
  imports: [EspLoginModule],
  exports: [EspLoginModule],
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_SERVICE_CONFIG,
          useClass: AuthServiceConfig,
        },
      ],
    };
  }
}
