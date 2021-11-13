import { Injectable } from '@angular/core';
import {
  Action,
  Store,
  Selector,
  StateContext,
  NgxsOnInit,
  State,
} from '@ngxs/store';
import { throwError } from 'rxjs';

// @importing from services
import { DashboardService } from '../../../services';

// @importing models
import { DashboardStateModel } from '../models/model';

// @importing actions
import { Dashboard } from '../actions/actions';

// @importing account State
// import { Accounts, AccountState } from '../../account';

@State<DashboardStateModel>({
  name: 'Dashboard',
  defaults: {
    user: null,
  },
})
@Injectable({
  providedIn: 'root',
})
export class DashboardState implements NgxsOnInit {
  /**
   *
   * @param {DashboardService} _dashbordService
   */

  constructor(private _dashbordService: DashboardService) {}
  // -------------------------------------------------------
  // @Selectors
  // -------------------------------------------------------
  @Selector()
  static getUserInfo(state: DashboardStateModel) {
    return state.user;
  }
  ngxsOnInit(): void {}

  // ---------------------------------------------------------
  // @Actions
  // ---------------------------------------------------------
  @Action(Dashboard.GetUserInfo)
  async getUserInfo(ctx: StateContext<DashboardStateModel>) {
    try {
      const userInfo = await this._dashbordService.getAccount();
      ctx.patchState({
        user: userInfo,
      });
      //   ctx.dispatch(new Accounts.StoreUserAccount(userInfo));
    } catch (error) {
      throwError(error);
    }
  }
  @Action(Dashboard.ClearUser)
  clearUser(ctx: StateContext<DashboardStateModel>) {
    ctx.patchState({
      user: null,
    });
    // ctx.dispatch(new Accounts.ClearUserAccount());
  }
}
