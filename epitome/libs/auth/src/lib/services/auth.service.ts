import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpBackend,
  HttpParams,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

// @error-handler
import { ErrorSnackService } from '@error-handler';
// @local configurations
import {
  AuthServiceConfig,
  AUTH_SERVICE_CONFIG,
  ENIVORNMENT_CONFIG,
  Environment,
} from '../types';

// @types
import { LoginRequest, LoginResponse } from '../types';
import { User } from '../store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient;

  /**
   *
   * @param {AUTH_SERVICE_CONFIG} _config
   * @param {HttpBackend} handler
   * @param {ErrorSnackService} _errorHandler
   * @param {ENIVORMENT_CONFIG} _environmentConfig
   */
  constructor(
    @Inject(AUTH_SERVICE_CONFIG) public _config: AuthServiceConfig,
    @Inject(ENIVORNMENT_CONFIG) private _environmentConfig: Environment,
    private _errorHandler: ErrorSnackService,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }
  // -------------------------------------------------------------
  // @ Private Methods
  // -------------------------------------------------------------
  private getUri(): string {
    return `${
      this._environmentConfig.production
        ? this._config.url
        : this._environmentConfig.localDev
        ? this._config.dev_url
        : this._config.uat_url
    }`;
  }
  private massageFormData(credentials: LoginRequest): FormData {
    const formData = new FormData();
    formData.append('asi_number', credentials.asi_number.toString());
    formData.append('userName', credentials.UserName);
    formData.append('password', credentials.Password);
    formData.append('app_group', '');
    formData.append('app_code', credentials.appCode);
    formData.append('app_version', credentials.appVersion);
    formData.append('kick', '1');
    formData.append('invoke', '');
    return formData;
  }

  // --------------------------------------------------------------
  // @ Public Methods
  // --------------------------------------------------------------
  login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.getUri(), this.massageFormData(credentials))
      .pipe(
        catchError((response) => {
          this._errorHandler.handleError(response);
          return throwError(response);
        })
      )
      .toPromise();
  }
  logout(): Promise<boolean> {
    const user: User = JSON.parse(window.sessionStorage.getItem('user'));
    if (user && user.hasOwnProperty('token')) {
      const header = new HttpHeaders({
        Authorization: `AsiMemberAuth guid="${user.token.Token}"`,
      });
      return this.http
        .get<boolean>(
          this._environmentConfig.production
            ? this._config.logoutUrl
            : this._environmentConfig.localDev
            ? this._config.logout_dev_url
            : this._config.logout_uat_url,
          {
            headers: header,
          }
        )
        .toPromise();
    } else {
      return of(true).toPromise();
    }
  }
}
