import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Material_Modules, icons } from '@assortments';

@Component({
  selector: 'tb-template-preview',
  template: `
    <form [formGroup]="previewForm" novalidate>
      <h2 mat-dialog-title class="title">
        template preview
        <mat-icon aria-hidden="false" (click)="close()" class="close-btn">
          {{ icons.close }}
        </mat-icon>
      </h2>
      <div mat-dialog-content>
        <div class="form-container">
          <mat-form-field appearance="outline" class="preview-form-field">
            <mat-label> preview </mat-label>
            <textarea
              matInput
              formControlName="templatePreview"
              class="dashboard-input"
            ></textarea>
          </mat-form-field>
        </div>
      </div>
      <div mat-dialog-actions>
        <button
          type="button"
          mat-raised-button
          mat-dialog-close
          class="btns-right"
          (click)="close()"
        >
          close
        </button>
        <button
          type="button"
          mat-raised-button
          class="btns-right btn-primary"
          (click)="save(previewForm.value)"
        >
          save
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./template-preview.component.scss'],
})
export class TemplatePreviewComponent implements OnInit {
  public previewForm = this.getPreviewForm();
  public get icons(): typeof icons {
    return icons;
  }
  /**
   * @param {MatDialogRef} _matDialogRef
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _matDiallogRef: MatDialogRef<TemplatePreviewComponent>,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}
  //-----------------------------------------------------------------------------
  // @private methods
  //-----------------------------------------------------------------------------
  private getPreviewForm(): FormGroup {
    return this._formBuilder.group({
      templatePreview: ['', []],
    });
  }
  //-----------------------------------------------------------------------------
  //@public methods
  //-----------------------------------------------------------------------------
  public close() {
    this._matDiallogRef.close();
  }
  public save(preview: string) {
    this._matDiallogRef.close();
  }
}

//----------------------------------------------------------
// @NgModule
//----------------------------------------------------------
@NgModule({
  declarations: [TemplatePreviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ...Material_Modules,
    ReactiveFormsModule,
  ],
  exports: [TemplatePreviewComponent],
})
export class TemplatePreviewComponentModule {}
