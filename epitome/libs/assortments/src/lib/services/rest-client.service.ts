import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';








@Injectable({
  providedIn: 'root',
})
export class RestClient {
  /**
   *
   * @param {HttpClient} http
   * @param {MatSnackBar} _snackBar
   */

  constructor(protected http: HttpClient) {}
  
  
  // ------------------------------------------
  // @Error Handling
  // ------------------------------------------
  protected handleError(error: any): Observable<never> {
    const errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server Error';
    return throwError(errMsg);
  }
  
 
}
