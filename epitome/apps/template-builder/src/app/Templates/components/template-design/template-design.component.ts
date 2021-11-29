import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
// @assortments
import { icons, Material_Modules, validateStyle } from '@assortments';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxsModule } from '@ngxs/store';
import { delay, filter } from 'rxjs/operators';
import { TemplateFacade } from '../../facades';
import { TemplateState } from '../../store';
import { DesignScheme } from '../../types';
import {
  TemplateAddTagComponent,
  TemplateAddTageComponentModule,
} from '../template-add-tag/template-add-tag.component';
// @importing local modules
import {
  TemplatePreviewComponent,
  TemplatePreviewComponentModule,
} from '../template-preview/template-preview.component';
// importing tags-module
import { TemplateTagComponentModule } from '../template-tag/template-tag.component';

@UntilDestroy()
@Component({
  selector: 'tb-custom-templates',
  templateUrl: './template-design.component.html',
  styleUrls: ['./template-design.component.scss'],
})
export class TemplateDesignComponent implements OnInit {
  //-------------------------------------------------------------------------------------------------------------------
  // @Public Accessories
  //-------------------------------------------------------------------------------------------------------------------
  designForm: FormGroup = this.getDesignForm();
  currentTemplate$ = this._activatedRoute.queryParams;
  addDesignTagFlg = true;

  //-----------------------------------------------------------------------------------------------------------------------------
  //@Constructor
  //-------------------------------------------------------------------------------------------------------------------------------
  /**
   *
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   * @param {ActivatedRoute} _activatedRoute
   * @param {MatDialog} _matDialog
   * @param {TemplateFacade} _facade
   */

  //----------------------------------------------------------------------------------------------------------------------------
  //@Constructor
  //------------------------------------------------------------------------------------------------------------------------------
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _matDialog: MatDialog,
    private _facade: TemplateFacade
  ) {
    this._activatedRoute.queryParams.subscribe({
      next: (params: Params) =>
        this.getTemplateDesignData(params?.applicationId, params?.title),
    });

    const designData$ = this._facade.designScheme$;
    designData$
      .pipe(filter(Boolean), delay(1500), untilDestroyed(this))
      .subscribe({
        next: (templateData: DesignScheme) =>
          this.designForm.patchValue({
            templateCSS: templateData.Template_Data,
          }),
      });
  }

  //-----------------------------------------------------------------------------------------------------------------------------
  //@Life Cycle Hooks
  //-------------------------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {}

  //-----------------------------------------------------------------------------------------------------------------------------
  //@Getters && @Setters
  //-------------------------------------------------------------------------------------------------------------------------------
  get icons(): typeof icons {
    return icons;
  }

  // ---------------------------------------------------
  // @Public Methods
  // ---------------------------------------------------
  preview() {
    const dialogRef: MatDialogRef<TemplatePreviewComponent> =
      this._matDialog.open(TemplatePreviewComponent, {
        width: '400px',
        disableClose: true,
        position: {
          top: '10%',
        },
      });
    // tslint:disable-next-line: deprecation
    dialogRef.afterClosed().subscribe({
      next: this.afterDialogClosed.bind(this),
      error: this.errorHandler.bind(this),
    });
  }
  addTemplate() {
    const dialogRef: MatDialogRef<TemplateAddTagComponent> =
      this._matDialog.open(TemplateAddTagComponent, {
        width: '400px',
        disableClose: true,
        position: {
          top: '10%',
        },
      });
  }
  getDesignForm(): FormGroup {
    return this._formBuilder.group({
      templateId: ['', []],
      templateName: ['', []],
      templateCSS: ['', [validateStyle.bind(this), Validators.required]],
    });
  }
  save() {
    console.log('I am still clicking');
  }
  cancel() {
    this._router.navigate(['/dashboard/templates/template-list']);
  }

  // ---------------------------------------------------
  // @Private Methods
  // ---------------------------------------------------
  private afterDialogClosed(result) {
    console.log(result);
  }

  private errorHandler(error) {
    console.log(error);
  }
  private getTemplateDesignData(applicationId: number, title: string) {
    this._facade.getTemplateDesignData(applicationId, title);
  }
}

const routes: Routes = [
  {
    path: '',
    component: TemplateDesignComponent,
  },
];

// ---------------------------------------------------------------------------------------------------
// @NgModule
// ---------------------------------------------------------------------------------------------------

@NgModule({
  declarations: [TemplateDesignComponent],
  imports: [
    CommonModule,
    FormsModule,
    ...Material_Modules,
    NgxsModule.forFeature([TemplateState]),
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TemplateTagComponentModule,
    TemplatePreviewComponentModule,
    TemplateAddTageComponentModule,
  ],
  exports: [TemplateDesignComponent, TemplateTagComponentModule, RouterModule],
})
export class TemplateDesignComponentModule {}
