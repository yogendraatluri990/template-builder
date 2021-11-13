import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { environment } from '../environments/environment';

// importing route module
import { AppRoutingModule } from './app-routing.module';

// importing assortments
import { AssortmentsModule, Material_Modules } from '@assortments';

// importing auth
import { AuthModule, ENIVORNMENT_CONFIG, AuthInterceptor } from '@auth';

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
    { provide: ENIVORNMENT_CONFIG, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
