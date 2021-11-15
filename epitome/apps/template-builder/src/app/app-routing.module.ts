import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
// Auth Guards
import { AuthGuard } from '@auth';
import { OptInPreloadStrategyService } from '@router';

export const ROUTER_OPTIONS: ExtraOptions = {
  useHash: true,
  preloadingStrategy: OptInPreloadStrategyService,
};

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: async () =>
      (await import('./login/login.module')).LoginModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: async () =>
      (await import('./dashboard/dashboard.module')).RootDashboardModule,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
