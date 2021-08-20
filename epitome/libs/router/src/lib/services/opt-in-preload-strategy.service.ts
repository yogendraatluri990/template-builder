import { Injectable } from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OptInPreloadStrategyService implements PreloadingStrategy {

  constructor() { }
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route?.data?.preload ? load() : EMPTY;
  }
}
