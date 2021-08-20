import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestClient } from './rest-client.service';

import { Images } from '../types';

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
  abstract uploadImage(formData: FormData): Promise<T>;
}
