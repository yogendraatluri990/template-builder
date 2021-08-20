import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

// importing from store
import { DashboardState, Dashboard } from '../store';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  /**
   *
   * @param {Store} _store
   */

  constructor(private _store: Store) {}

  // -------------------------------------------------------
  // @ Public Accessors
  // -------------------------------------------------------
  public userInfo$ = this._store.select(DashboardState.getUserInfo);

  // -------------------------------------------------------
  // @ Public Methods
  // -------------------------------------------------------
  public getSetUserInformation() {
    this._store.dispatch(new Dashboard.GetUserInfo());
  }

  public clearUserInfo() {
    this._store.dispatch(new Dashboard.ClearUser());
  }
}
