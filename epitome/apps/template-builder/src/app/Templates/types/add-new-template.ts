import { InjectionToken } from '@angular/core';
import { ServiceConfig } from '@auth';

export const ADD_NEW_TEMPLATE = new InjectionToken('Add New Template', {
  factory: () =>
    new ServiceConfig({
      Url: '/template-builder/template/',
    }),
});


export interface SavedResponse {
    Message: string;
    Success: boolean;
}