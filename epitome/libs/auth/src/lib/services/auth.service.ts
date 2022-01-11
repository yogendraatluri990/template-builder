import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// @error-handler
import { ErrorSnackService } from '@error-handler';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../store';
// @local configurations
import {
  AuthServiceConfig,
  AUTH_SERVICE_CONFIG,
  EnvironmentConfig,
  ENVIRONMENT_CONFIG,
  LoginRequest,
  LoginResponse,
} from '../types';

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
   * @param {ENVIRONMENT_CONFIG} _environmentConfig
   */
  constructor(
    @Inject(AUTH_SERVICE_CONFIG) public _config: AuthServiceConfig,
    @Inject(ENVIRONMENT_CONFIG) private _environmentConfig: EnvironmentConfig,
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
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.getUri(), this.massageFormData(credentials))
      .pipe(
        catchError((response) => {
          this._errorHandler.handleError(response);
          return throwError(() => response);
        })
      );
  }
  logout(): Observable<boolean> {
    const user: User = JSON.parse(window.sessionStorage.getItem('user'));
    if (user && user.hasOwnProperty('token')) {
      const header = new HttpHeaders({
        Authorization: `AsiMemberAuth guid="${user.token.Token}"`,
      });
      return this.http.get<boolean>(
        this._environmentConfig.production
          ? this._config.logoutUrl
          : this._environmentConfig.localDev
          ? this._config.logout_dev_url
          : this._config.logout_uat_url,
        {
          headers: header,
        }
      );
    } else {
      return of(true);
    }
  }
}
