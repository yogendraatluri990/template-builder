import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { selectorOptionsMetaAccessor } from '@ngxs/store/src/utils/selector-utils';
import { ClearUserLogin, StoreUser } from '../actions';

// @LoginFormModel
import { LoginFormModel, User } from '../models';

const LOGIN_STATE_NAME = 'login';
const LOGIN_STATE_DEFAULT = {
  asi_number: '',
  UserName: '',
  Password: '',
  appCode: '',
  appVersion: '',
  rememberMe: true,
};
const TOKEN_STATE_DEFAULT = {
  Token: '',
  TokenType: '',
  Status: '',
  Application: {},
};

@State<LoginFormModel>({
  name: LOGIN_STATE_NAME,
  defaults: LOGIN_STATE_DEFAULT,
})
@Injectable({
  providedIn: 'root',
})
export class LoginFormState implements NgxsOnInit {
  // ---------------------------------------------
  // @selectors
  // ---------------------------------------------
  @Selector()
  static getFormValues(state: LoginFormModel) {
    return state;
  }

  ngxsOnInit(ctx: StateContext<LoginFormModel>) {}

  // ---------------------------------------------
  // @Actions
  // ---------------------------------------------
  @Action(ClearUserLogin)
  clearUserLogin(ctx: StateContext<User>) {
    window.sessionStorage.clear();
    ctx.patchState({
      login: LOGIN_STATE_DEFAULT,
      token: TOKEN_STATE_DEFAULT,
    });
  }

  @Action(StoreUser)
  storeUserToken(ctx: StateContext<User>, event: StoreUser) {
    ctx.patchState({ ...event.user });
    window.sessionStorage.setItem('user', JSON.stringify({ ...event.user }));
  }
}
