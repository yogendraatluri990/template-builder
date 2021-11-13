import { Observable } from 'rxjs';

export interface Images<T> {
  uploadImage(formData: FormData): Observable<T>;
}
