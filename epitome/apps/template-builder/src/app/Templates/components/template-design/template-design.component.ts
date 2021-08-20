import { Component, OnInit, NgModule } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';

import { TemplateState } from '../../store';
// @assortments
import { Material_Modules, validateStyle, icons } from '@assortments';
// @importing local modules
import {
  TemplatePreviewComponentModule,
  TemplatePreviewComponent,
} from '../template-preview/template-preview.component';
import {
  TemplateAddTageComponentModule,
  TemplateAddTagComponent,
} from '../template-add-tag/template-add-tag.component';

// importing tags-module
import { TemplateTagComponentModule } from '../template-tag/template-tag.component';

@Component({
  selector: 'tb-custom-templates',
  templateUrl: './template-design.component.html',
  styleUrls: ['./template-design.component.scss'],
})
export class TemplateDesignComponent implements OnInit {
  public designForm: FormGroup = this.getDesignForm();
  public currentTemplate$ = this._activatedRoute.queryParams;
  public addDesignTagFlg = true;
  public get icons(): typeof icons { return icons};
  /**
   *
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   * @param {ActivatedRoute} _activatedRoute
   * @param {MatDialog} _matDialog
   */

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this._activatedRoute.queryParams.subscribe();
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

  // ---------------------------------------------------
  // @Public Methods
  // ---------------------------------------------------
  public preview() {
    const dialogRef: MatDialogRef<TemplatePreviewComponent> = this._matDialog.open(
      TemplatePreviewComponent,
      {
        width: '400px',
        disableClose: true,
        position: {
          top: '10%',
        },
      }
    );
    // tslint:disable-next-line: deprecation
    dialogRef.afterClosed().subscribe({
      next: this.afterDialogClosed.bind(this),
      error: this.errorHandler.bind(this),
    })
  }
  public addTemplate() {
    const dialogRef: MatDialogRef<TemplateAddTagComponent> = this._matDialog.open(
      TemplateAddTagComponent,
      {
        width: '400px',
        disableClose: true,
        position: {
          top: '10%',
        },
      }
    );
  }
  public getDesignForm(): FormGroup {
    return this._formBuilder.group({
      templateId: ['', []],
      templateName: ['', []],
      templateCSS: ['', [validateStyle.bind(this), Validators.required]],
    });
  }
  public save() {
    console.log('I am still clicking');
  }
  public cancel() {
    this._router.navigate(['/dashboard/templates/template-list']);
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
