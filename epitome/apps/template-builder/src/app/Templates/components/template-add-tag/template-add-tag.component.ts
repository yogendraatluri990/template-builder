import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

// importing from assortments
import { Material_Modules, validateHex, icons } from '@assortments';

import { Tag } from '../../types';

// importing constants.
import { designTags } from '../../constants';

// importing facades
import { TemplateFacade } from '../../facades';

// importing utilites
import { TemplateUtility as _templateUtil } from '../../utility';

@Component({
  selector: 'tb-template-add-tag',
  template: `
    <form [formGroup]="tagForm" noValidate>
      <h2 mat-dialog-title class="title">
        add new design tag
        <mat-icon aria-hidden="false" (click)="close()" class="close-btn">
          {{ icons.close }}
        </mat-icon>
      </h2>
      <div mat-dialog-content>
        <div class="form-container">
          <mat-form-field appearance="outline" class="tag-form-field">
            <mat-label>tag code </mat-label>
            <input
              type="text"
              matInput
              class="dashboard-input"
              formControlName="tagCode"
            />
          </mat-form-field>
        </div>
        <div class="form-container">
          <mat-form-field appearance="outline" class="tag-form-field">
            <mat-label> tag type </mat-label>
            <mat-select formControlName="tagType" class="mat-dark-select-panel">
              <mat-option
                *ngFor="let t of tagTypes; let i = index"
                [value]="t.value"
              >
                {{ t.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="form-container">
          <mat-form-field appearance="outline" class="tag-form-field">
            <mat-label> name </mat-label>
            <input
              type="text"
              matInput
              class="dashboard-input"
              formControlName="tagDesc"
            />
          </mat-form-field>
        </div>
        <div class="form-container">
          <mat-form-field appearance="outline" class="tag-form-field">
            <mat-label> default value </mat-label>
            <input
              type="text"
              matInput
              class="dashboard-input"
              formControlName="defaultValue"
            />
            <mat-error
              *ngIf="tagForm.get('defaultValue').errors?.required"
              class="mat-tag-error"
            >
              please provide a hex code for the default value
            </mat-error>
            <mat-error
              *ngIf="tagForm.get('defaultValue').errors?.isInValid"
              class="mat-tag-error"
            >
              please provide a valid hex code
            </mat-error>
          </mat-form-field>
        </div>
      </div>
      <div mat-dialog-actions>
        <button
          type="button"
          mat-raised-button
          mat-dialog-close
          class="btns-right"
          color="default"
        >
          cancel
        </button>
        <button
          type="button"
          mat-raised-button
          class="btns-right btn-primary"
          (click)="save(tagForm.value)"
        >
          save
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./template-add-tag.component.scss'],
})
export class TemplateAddTagComponent implements OnInit, OnDestroy {
  public tagForm = this.getAddTagForm();
  public tagTypes = [...designTags];
  public get icons(): typeof icons {
    return icons;
  }

  /**
   *
   * @param {MataDialoRef} _matDiallogRef
   * @param {FormBuilder} _formBuilder
   * @param {TemplateFacade} _facade
   */
  constructor(
    private _matDialogRef: MatDialogRef<TemplateAddTagComponent>,
    private _formBuilder: FormBuilder,
    private _facade: TemplateFacade
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._matDialogRef.close();
  }
  //----------------------------------------------------------------------------
  // @private methods
  //----------------------------------------------------------------------------
  private getAddTagForm(): FormGroup {
    return this._formBuilder.group({
      tagCode: ['', []],
      tagType: ['', []],
      tagDesc: ['', []],
      defaultValue: ['', [Validators.required, validateHex.bind(this)]],
    });
  }
  //-----------------------------------------------------------------------------
  // @public methods
  //-----------------------------------------------------------------------------
  public close() {
    this._matDialogRef.close();
  }
  public save(form: Tag) {
    this._facade.saveDesignTag(_templateUtil.saveDesignTagParser(form));
  }
}

//----------------------------------------------------------
// @NgModule
//----------------------------------------------------------
@NgModule({
  declarations: [TemplateAddTagComponent],
  imports: [
    CommonModule,
    FormsModule,
    ...Material_Modules,
    ReactiveFormsModule,
  ],
  exports: [TemplateAddTagComponent],
})
export class TemplateAddTageComponentModule {}
