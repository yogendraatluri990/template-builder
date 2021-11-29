import { InjectionToken } from '@angular/core';
import { ServiceConfig } from '@auth';
import { environment } from '../../../environments/environment';

export interface ImageFile {
  Id: number;
  ImageUrl: string;
  mediaPath?: string;
  Name: string;
}

export const IMAGE_UPLOAD = new InjectionToken('Image Upload URL', {
  factory: () =>
    new ServiceConfig({
      Url: '/media/upload.json',
      noImagePath: 'images/ImageNotInCatalog110.png',
      cdn_path: `https://commonmedia.${
        environment.production ? 'asicentral.com' : 'uat-asicentral.com'
      }/`,
    }),
});
