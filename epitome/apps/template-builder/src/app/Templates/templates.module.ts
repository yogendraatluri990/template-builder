import { NgModule, ModuleWithProviders } from '@angular/core';

import { TemplatePageModule } from './pages/template.page';
import { AssortmentsModule } from '@assortments';

@NgModule({
  declarations: [],
  imports: [TemplatePageModule, AssortmentsModule],
  exports: [TemplatePageModule],
})
export class TemplatesModule {
  static forRoot(): ModuleWithProviders<RootTemplatesModule> {
    return {
      ngModule: RootTemplatesModule,
    };
  }
}

@NgModule({
  imports: [TemplatesModule],
  exports: [TemplatesModule],
})
export class RootTemplatesModule {}
