import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Images } from '../types';
import { RestClient } from './rest-client.service';

@Injectable({
  providedIn: 'root',
})
export abstract class ImageService<T> extends RestClient implements Images<T> {
  /**
   * @param {HttpClient} _http;
   */

  constructor(protected _http: HttpClient) {
    super(_http);
  }
  abstract uploadImage(formData: FormData): Observable<T>;
}
