import { InjectionToken } from '@angular/core';

import { ServiceConfig } from '@auth';

export const TEMPLATE_CSS_CONFIG = new InjectionToken('Template CSS URL', {
  factory: () =>
    new ServiceConfig({
      Url: '/template-builder/template',
    }),
});

export interface Colors {
  Id: number;
  Name: string;
  Value: string;
}

export interface ColorScheme {
  Id: string;
  Name: string;
  TemplateId: number;
  CSS?: string;
  MediaId?: number;
  MediaPath?: string;
  DesignColor?: string;
  DesignTags?: Array<Colors>;
}

export interface DesignScheme {
  AppCode?: string;
  ApplicationId?: number;
  Name?: string;
  Id?: number;
  TemplatePreview_Data?: string;
  Template_Data?: string;  
  ColorScheme?: Array<ColorScheme>;
}

export interface StyleSheet {
  templateId?: string;
  templateName?: string;
  templateCSS?: string;
  templatePreview?: string;
}
