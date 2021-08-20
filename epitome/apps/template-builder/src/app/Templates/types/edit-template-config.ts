import { InjectionToken } from '@angular/core';

// @auth
import { ServiceConfig } from '@auth';

export const EDIT_TEMPLATE_CONFIG = new InjectionToken('edit template config', {
  factory: () =>
    new ServiceConfig({
      Url: '/template-builder/sample-app-properties/',
    }),
});

export const MODULE_INSTANCE_CONFIG = new InjectionToken(
  'Retrieve Module Instance Info',
  {
    factory: () =>
      new ServiceConfig({
        Url: '/template-builder/sample-app-properties/populate.json?',
      }),
  }
);

//------------------------------------------
// @Edit Screen Save
//-----------------------------------------
export const SAVE_APPLICATION_CONFIG = new InjectionToken(
  'Save Application Json',
  {
    factory: () =>
      new ServiceConfig({
        Url: '/template-builder/sampleApplication.json',
      }),
  }
);

export const SAVE_VISIBILITY_CONFIG = new InjectionToken(
  'Save Visibility and active status',
  {
    factory: () => new ServiceConfig({
      Url: '/template-builder/application/'
    })
  }
)

export const SAVE_PREFERENCES_CONFIG = new InjectionToken('Save Preferences', {
  factory: () =>
    new ServiceConfig({
      Url: '/template-builder/preferences.json',
    }),
});
