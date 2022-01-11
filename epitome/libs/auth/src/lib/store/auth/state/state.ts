import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import {
  ClearUserLogin,
  LoginFormState,
  StoreUser,
  User,
} from '../../login-form';
import { Auth } from '../actions';
import { AuthStateModel } from '../models';

@State<AuthStateModel>({
  name: 'Auth',
  defaults: {
    initialized: false,
    error: null,
    pending: false,
    loggedIn: false,
    user: null,
  },
  children: [LoginFormState],
})
@Injectable({
  providedIn: 'root',
})
export class AuthState implements NgxsOnInit {
  /**
   *
   * @param {AuthService} authService
   */

  constructor(private authService: AuthService) {}
  /**
   *  Selectors
   */
  @Selector()
  static getInitialized(state: AuthStateModel) {
    return state.initialized;
  }

  @Selector()
  static getLoggedIn(state: AuthStateModel) {
    return state.loggedIn;
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ initialized: true });
    // ctx.dispatch(new Auth.CheckSession());
  }

  /**
   * Actions or Commands
   */
  // @Action(Auth.CheckSession)
  // checkSession(ctx: StateContext<AuthStateModel>){

  // }
  @Action(Auth.LoginWithCredentials)
  async loginWithCredentials(
    ctx: StateContext<AuthStateModel>,
    action: Auth.LoginWithCredentials
  ) {
    ctx.patchState({ error: null, pending: true });
    const { credentials } = action;
    try {
      const token = await lastValueFrom(this.authService.login(credentials));
      const {
        asi_number,
        UserName,
        Password,
        appCode,
        appVersion,
        rememberMe,
      } = credentials;
      const user: User = {
        login: {
          asi_number,
          UserName,
          Password,
          appCode,
          appVersion,
          rememberMe,
        },
        token: token,
      };
      this.setStateOnLoginSuccess(ctx, user);
      ctx.dispatch(new Navigate([action.redirectUrl]));
    } catch (error) {
      this.setStateOnLogoutOrFailure(ctx);
    }
  }
  @Action(Auth.Logout)
  logout(ctx: StateContext<AuthStateModel>, event: Auth.Logout) {
    return lastValueFrom(this.authService.logout()).then(() => {
      this.setStateOnLogoutOrFailure(ctx);
    });
  }

  setStateOnLoginSuccess(ctx: StateContext<AuthStateModel>, user: User) {
    ctx.patchState({
      loggedIn: true,
      pending: false,
      user: user,
    });
    ctx.dispatch(new StoreUser(user));
  }
  setStateOnLogoutOrFailure(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      error: null,
      loggedIn: false,
      pending: false,
      user: null,
    });
    ctx.dispatch(new ClearUserLogin());
    ctx.dispatch(new Navigate(['/auth/login']));
  }
}
