import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

// importing from types
import { LoginRequest } from '../types';

// importing from store
import {
  AuthState,
  Auth,
  LoginFormModel,
  LoginFormState,
  ClearUserLogin,
  User,
} from '../store';
import { Navigate } from '@ngxs/router-plugin';

// @importing from the store

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  @Select(AuthState.getInitialized)
  intialized$: Observable<boolean>;

  @Select(AuthState.getLoggedIn)
  loggedIn$: Observable<boolean>;

  /**
   * Constructor
   *
   * @param {Store} _store
   * @param {Router} _router
   */

  constructor(private _store: Store, private _router: Router) {}
  // ------------------------------------------------------
  // @ Accessors
  // ------------------------------------------------------
  get user(): User {
    const user: User = JSON.parse(window.sessionStorage.getItem('user'));
    if (user && user.hasOwnProperty('login') && user.hasOwnProperty('token')) {
      return user;
    }
  }
  get storedLogin(): LoginFormModel {
    return this._store.selectSnapshot<LoginFormModel>(
      LoginFormState.getFormValues
    );
  }
  get loggedIn(): boolean {
    return this._store.selectSnapshot<boolean>(AuthState.getLoggedIn);
  }

  // ----------------------------------------------------
  // @ Public Methods
  // ----------------------------------------------------
  loginWithCredentials(credentials: LoginRequest, redirectUrl?: string) {
    this._store.dispatch(
      new Auth.LoginWithCredentials(credentials, redirectUrl)
    );
  }
  logout(redirectUrl?: string, isExpired?: boolean) {
    if (isExpired) {
      window.sessionStorage.clear();
      this._store.dispatch(new ClearUserLogin());
      this._router.navigate([redirectUrl]);
    } else {
      this._store.dispatch(new Auth.Logout(redirectUrl));
    }
  }
}
