import { Component, Inject, NgModule } from '@angular/core';
import { EnvironmentConfig, ENVIRONMENT_CONFIG } from '@auth';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'esp-logo',
  template: `
    <div class="logo">
      <img [src]="logoPath()" width="200" height="200" />
    </div>
    <h2 class="title">
      <ng-container> Login to your account </ng-container>
    </h2>
  `,
  styleUrls: ['./logo.page.scss'],
})
export class LogoPage {
  // ---------------------------------------------------------------------------
  // @CONSTRUCTOR
  // -----------------------------------------------------------------------------
  /**
   *  @param {ENVIRONMENT_CONFIG} _environmentConfig
   */
  constructor(
    @Inject(ENVIRONMENT_CONFIG) private _environmentConfig: EnvironmentConfig
  ) {}

  // -------------------------------------------------------------------------------
  // @PUBLIC Methods
  // ---------------------------------------------------------------------------------
  logoPath(): string {
    return `${
      this._environmentConfig.production ? 'app/public/templateBuilder/en' : ''
    }assortments/assets/images/logos/esp.png`;
  }
}

// ---------------------------------------------------------------
// @NgModule
// ---------------------------------------------------------------

@NgModule({
  declarations: [LogoPage],
  exports: [LogoPage],
})
export class LogoPageModule {}
