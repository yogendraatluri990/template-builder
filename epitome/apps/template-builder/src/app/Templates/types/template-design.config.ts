import { InjectionToken } from '@angular/core';
// importing from auth
import { ServiceConfig } from '@auth';

export const ADD_NEW_DESIGN_TAG = new InjectionToken('Add New Design Tag URL', {
  factory: () =>
    new ServiceConfig({
      Url: '/template-builder/designTag',
    }),
});

export const TEMPLATE_DESIGN_DATA = new InjectionToken(
  'Template Design Data URL',
  {
    factory: () =>
      new ServiceConfig({
        Url: '/template-builder/app-template-data',
      }),
  }
);
export interface Tag {
  tagCode: string;
  tagType: string;
  tagDesc: string;
  defaultValue: string;
}

export interface TagBackground {
  name: string;
  value: string;
}
