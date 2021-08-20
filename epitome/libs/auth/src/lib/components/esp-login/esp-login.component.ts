import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Material_Modules } from '../../types';
import { ErrorHandlerModule } from '@error-handler';
import { NgxsModule } from '@ngxs/store';

import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

// importing states
import { AuthState, LoginFormState } from '../../store';
import { BaseLoginComponent } from '../base-login/base-login.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'esp-login',
  templateUrl: './esp-login.component.html',
  styleUrls: ['./esp-login.component.scss'],
})
export class EspLoginComponent extends BaseLoginComponent {}

@NgModule({
  declarations: [EspLoginComponent],
  imports: [
    CommonModule,
    ErrorHandlerModule.forRoot(),
    FormsModule,
    ...Material_Modules,
    NgxsModule.forFeature([AuthState, LoginFormState]),
    NgxsRouterPluginModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [EspLoginComponent],
})
export class EspLoginModule {}
