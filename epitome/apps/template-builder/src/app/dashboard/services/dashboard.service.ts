import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

// @ Importing from Auth
import { SMARTLINK_SERVICE_CONFIG, ServiceConfig } from '@auth';

// @ Importing Rest Client
import { RestClient } from '@assortments';

// @ Importing types
import { Account, Dashboard } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends RestClient {
  /**
   *
   * @param {HttpClient} _http
   * @param {SMARTLINK_SERVICE_CONFIG} _smartLinkConfig
   *
   */
  constructor(
    protected _http: HttpClient,
    @Inject(SMARTLINK_SERVICE_CONFIG) private _smartLinkConfig: ServiceConfig
  ) {
    super(_http);
  }

  // ------------------------------------------------------------------------------------------------------------
  // @ Private Methods
  // ------------------------------------------------------------------------------------------------------------
  private getUri(): string {
    return `${
      environment.production
        ? this._smartLinkConfig.Url
        : environment.localDev
        ? this._smartLinkConfig.Dev_Url
        : this._smartLinkConfig.Uat_Url
    }`;
  }
  private getAccountUri(): string {
    return `${this.getUri()}/account.json`;
  }

  // -------------------------------------------------------------------------------------------------------------
  // @ Public Methods
  // --------------------------------------------------------------------------------------------------------------
  public getAccount(): Promise<Account> {
    return this._http
      .get<Account>(`${this.getAccountUri()}`)
      .pipe(catchError(this.handleError))
      .toPromise();
  }
}
