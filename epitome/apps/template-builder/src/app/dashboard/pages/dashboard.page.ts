import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { tap } from 'rxjs/operators';

import {AssortmentsModule, SideNavePageModule} from '@assortments';
import { DashboardFacade } from '../facades';
@Component({
  template: `
    <div class="dashboard-container">
      <div class="side-nav-container">
        <ng-container *ngIf="userInfo$ | async as user">
          <assort-side-nav
            [userImage]="user.Gravatar"
            [userName]="user.Username"
          ></assort-side-nav>
        </ng-container>
      </div>
      <div class="child-route-container">
        <router-outlet></router-outlet>       
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  /**
   * @param {DashboardFacade} _facade
   */

  // -------------------------------------------------------
  // @ Public Accessors
  // -------------------------------------------------------
  public userInfo$ = this._facade.userInfo$;
  constructor(private _facade: DashboardFacade) {
    this._facade.getSetUserInformation();
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._facade.clearUserInfo();
  }
}

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'templates',
        loadChildren: async () =>
          (await import('../../Templates/templates.module')).TemplatesModule,
      },
    ],
  },
];

@NgModule({
  declarations: [DashboardPage],
  imports: [AssortmentsModule, RouterModule.forChild(routes), SideNavePageModule],
  exports: [DashboardPage, RouterModule]
})
export class DashboardPageModule {}