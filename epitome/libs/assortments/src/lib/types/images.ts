export interface Images<T> {
  uploadImage(formData: FormData): Promise<T>;
}
