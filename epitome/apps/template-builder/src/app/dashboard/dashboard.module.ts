import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxFileDropModule } from 'ngx-file-drop';

// importing assortments
import { AssortmentsModule, Material_Modules } from '@assortments';

// importing error-handler
import { ErrorHandlerModule } from '@error-handler';

// importing state
import { DashboardState } from './store';

// importing DashboardPageModule
import { DashboardPageModule } from './pages/dashboard.page';

@NgModule({
  imports: [
    AssortmentsModule,
    DashboardPageModule,
    ErrorHandlerModule,
    FormsModule,
    ...Material_Modules,
    NgxsModule.forFeature([DashboardState]),
    NgxFileDropModule,
    ReactiveFormsModule,
  ],
  exports: [DashboardPageModule],
})
export class DashboardModule {
  static forRoot(): ModuleWithProviders<RootDashboardModule> {
    return {
      ngModule: RootDashboardModule,
    };
  }
}

@NgModule({
  imports: [DashboardModule],
  exports: [DashboardModule],
})
export class RootDashboardModule {}
