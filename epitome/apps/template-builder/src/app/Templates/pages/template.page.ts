import { Component, NgModule, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'tb-template',
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class TemplatePage {}

export const routes: Routes = [
  {
    path: '',
    component: TemplatePage,
    children: [
      {
        path: 'template-list',
        loadChildren: async () =>
          (await import('../components/template-list/template-list.component'))
            .TemplateListComponentModule,
      },
      {
        path: 'template-design',
        loadChildren: async () =>
          (
            await import(
              '../components/template-design/template-design.component'
            )
          ).TemplateDesignComponentModule,
      },
      {
        path: '',
        redirectTo: 'template-list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [TemplatePage],
  imports: [RouterModule.forChild(routes)],
  exports: [TemplatePage, RouterModule],
})
export class TemplatePageModule {}
