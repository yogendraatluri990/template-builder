import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { AssortmentsModule, Material_Modules, LogoPageModule} from '@assortments';
import {EspLoginModule} from '@auth';

@Component({
  selector: 'tb-login',
  template: `
   <div class="column-container-wrapper">
    <div class="column-container">
    <div class="">
    <esp-logo></esp-logo>
    </div>
    <esp-login></esp-login>    
    </div>
    </div>
  `,
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// ---------------------------------------------------
// @NgModule
// ---------------------------------------------------
const routes: Routes = [
  {
      path: 'login',
      component: LoginPage
  }
];

@NgModule({
  declarations: [LoginPage],
  imports: [
    AssortmentsModule,
    EspLoginModule,
    FormsModule,
    LogoPageModule,
    ...Material_Modules,
    ReactiveFormsModule,
  ],
  exports: [LoginPage]
})
export class LoginPageModule {}