import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'esp-logo',
  template: `
    <div class="logo">
      <img
        src="assortments/assets/images/logos/esp.png"
        width="200"
        height="200"
      />
    </div>
    <h2 class="title">
      <ng-container> Login to your account </ng-container>
    </h2>
  `,
  styleUrls: ['./logo.page.scss'],
})
export class LogoPage {}

// ---------------------------------------------------------------
// @NgModule
// ---------------------------------------------------------------

@NgModule({
  declarations: [LogoPage],
  exports: [LogoPage],
})
export class LogoPageModule {}
