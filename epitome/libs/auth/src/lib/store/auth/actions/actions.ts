import { LoginRequest } from '../../../types';

export namespace Auth {
  export class CheckSession {
    static type = '[Auth] CheckSession';
  }
  export class LoginWithCredentials {
    static type = '[Auth] LoginWithCredentials';
    constructor(public credentials: LoginRequest, public redirectUrl = '/') {}
  }
  export class Logout {
    static type = '[Auth] Logout';
    constructor(public redirectUrl?: string) {}
  }
}
