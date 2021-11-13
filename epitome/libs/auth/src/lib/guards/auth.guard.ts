import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, CanLoad } from '@angular/router';

// importing AuthFacade

import { AuthFacade } from '../facades';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {AuthFacade} _authFacade
   * @param {Location} _location
   */
  constructor(private _authFacade: AuthFacade, private _location: Location) {}
  canActivate(): boolean {
    const loggedIn = !!this._authFacade.user;
    if (!loggedIn) {
      this._authFacade.logout(this._location.path());
      return !loggedIn;
    } else {
      return loggedIn;
    }
  }
}
