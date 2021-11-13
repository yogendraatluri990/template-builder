import { InjectionToken } from '@angular/core';
import { ServiceConfig } from '@auth';

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
      cdn_path: 'https://commonmedia.uat-asicentral.com/',
    }),
});
