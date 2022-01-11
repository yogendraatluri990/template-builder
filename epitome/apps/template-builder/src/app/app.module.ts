import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// importing assortments
import { AssortmentsModule, Material_Modules } from '@assortments';
// importing auth
import { AuthInterceptor, AuthModule, ENVIRONMENT_CONFIG } from '@auth';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
// importing route module
import { AppRoutingModule } from './app-routing.module';
// importing local components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...Material_Modules,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AssortmentsModule.forRoot(),
    AuthModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: ENVIRONMENT_CONFIG, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
