import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

// importing Routing Module
import { LoginRoutingModule } from './login-routing.module';

// importing local components
import { LoginPageModule } from './pages/login.page';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginPageModule,
    NgxsModule.forFeature([]),
  ],
  exports: [LoginPageModule, LoginRoutingModule],
})
export class LoginModule {}
