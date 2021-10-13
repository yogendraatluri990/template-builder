import { Inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { ErrorSnackService } from '@error-handler';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  SERVICE_CONFIG,
  ServiceConfig,
  SMARTLINK_SERVICE_CONFIG,
  ENIVORNMENT_CONFIG,
  Environment,
} from '../types';

import { AuthFacade } from '../facades';

// Ref: https://github.com/melcor76/interceptors/blob/master/src/app/interceptors/auth.interceptor.ts

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  /**
   *
   * @param {ServiceConfig} _serviceConfig
   * @param {ServiceConfig} _smartLinkConfig
   * @param {AuthFacade} _authFacade
   * @param  {ErrorSnackService} _errorHandler;
   * @param {ENIVORMENT_CONFIG} _environmentConfig;
   */
  constructor(
    @Inject(SERVICE_CONFIG) private _serviceConfig: ServiceConfig,
    @Inject(SMARTLINK_SERVICE_CONFIG) private _smartLinkConfig: ServiceConfig,
    @Inject(ENIVORNMENT_CONFIG) private _environmentConfig: Environment,
    private _authFacade: AuthFacade,
    private _errorHandler: ErrorSnackService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req) {
      if (this._reqStartWith(req, this._serviceConfig)) {
        return this._jwtRequest(req, next);
      } else if (this._reqStartWith(req, this._smartLinkConfig)) {
        return this._smartLinkRequest(req, next);
      } else {
       return next.handle(req)
      }
    }
  }
  private _reqStartWith(req: HttpRequest<any>, service: ServiceConfig) {
    return (
      service.Url &&
      req.url.startsWith(
        this._environmentConfig.production
          ? service.Url
          : this._environmentConfig.localDev
          ? service.Dev_Url
          : service.Uat_Url
      )
    );
  }

  _smartLinkRequest(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.endsWith('.json')) {
      if(!(req.url.indexOf('.json') > -1)) {
      req = req.clone({ url: `${req.url}.json` });
      }
    }
    return this._jwtRequest(req, next);
  }
  _jwtRequest(req: HttpRequest<any>, next: HttpHandler) {
    const user = this._authFacade.user;
    if (user.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `AsiMemberAuth guid="${user.token.Token}"`,
        },
      });
      return next.handle(req).pipe(
        catchError((response: HttpErrorResponse) => {
          this._errorHandler.handleError(response);
          if (response && response.status === 401) {
            this._authFacade.logout('/auth/login', true);
          }
          return throwError(response);
        })
      );
    }
  }
}
