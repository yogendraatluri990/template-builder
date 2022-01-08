import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
// importing material modules
import { icons, Material_Modules } from '@assortments';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { filter, tap } from 'rxjs/operators';
import { instanceControllerNames, instanceNames } from '../../constants';
// @importing facades
import { TemplateFacade } from '../../facades';
// @importing store
import { TemplateState } from '../../store';
import {
  EditTemplate,
  InstanceDuplicate,
  Preferences,
  TemplateForm,
} from '../../types';
// @importing utility class
import { TemplateUtility as _util } from '../../utility';

@UntilDestroy()
@Component({
  selector: 'tb-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss'],
})
export class TemplateEditComponent implements OnInit, OnDestroy {
  // --------------------------------------------------------------------
  // @PUBLIC ACCESSORIES
  // --------------------------------------------------------------------
  editForm: FormGroup = this.getEditForm();
  codes = { ...instanceNames };
  template$ = this._facade.template$.pipe(
    filter(Boolean),
    tap((response: EditTemplate) => {
      this.editForm.reset({
        ..._util.mapper(response),
        applicationId: this.data.currentApplicationId,
      });
      response.hasOwnProperty('MarketGroupDetails')
        ? this.editForm.get('industry').enable()
        : this.editForm.get('industry').disable();
    })
  );
  moduleInstance$ = this._facade.moduleInstance$.pipe(
    tap((response: InstanceDuplicate) => {
      if (response) {
        response.instances.forEach((v) =>
          this.populateMapper(instanceControllerNames[v.ModuleCode])
        );
        response.nonInstances.forEach((v) =>
          this.populateMapper(instanceControllerNames[v.ModuleCode])
        );
      }
    })
  );

  // --------------------------------------------------------------------
  // @CONSTRUCTOR
  // --------------------------------------------------------------------
  /**
   *
   * @param {MatDialogRef} _matDialogRef
   * @param {MatDialog} _matDialog
   * @param {MAT_DIALOG_DATA} data
   * @param {TemplateFacade} _formBuilder
   * @param {DashboardFacade} _facade
   */

  constructor(
    private _matDialogRef: MatDialogRef<TemplateEditComponent>,
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _facade: TemplateFacade
  ) {}

  // --------------------------------------------------------------------
  // @LIFE CYCLE HOOKS
  // --------------------------------------------------------------------
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.resetPopulate();
    this._matDialogRef.close();
    this._facade.resetEditTemplate();
  }

  // --------------------------------------------------------------------
  // @GETTERS & @SETTERS
  // --------------------------------------------------------------------
  get icons(): typeof icons {
    return icons;
  }

  // --------------------------------------------------------------------
  // PUBLIC METHODS
  // --------------------------------------------------------------------
  resetPopulate($event?: MouseEvent) {
    if ($event) $event.stopPropagation();
    this._facade.resetPopulate();
  }
  close(): void {
    this._matDialogRef.close();
  }
  populate(current_preference: Preferences, masterId: number): void {
    this._facade.populateInstances(this.data.currentApplicationId, masterId);
  }
  save(formData: TemplateForm): void {
    this._facade.saveTemplateEdit(formData);
    this.close();
  }
  addNewTemplate() {
    const _dialogRef = this._matDialog.open(AddNewTemplate, {
      width: '400px',
      disableClose: true,
      data: {
        applicationId: this.data.currentApplicationId,
      },
      position: {
        top: '10%',
      },
    });
  }

  // --------------------------------------------------------------------
  // PRIVATE METHODS
  // --------------------------------------------------------------------
  private getEditForm(): FormGroup {
    return this._formBuilder.group({
      applicationId: ['', []],
      name: ['', []],
      designTemplateId: ['', []],
      relationShipRole: ['', []],
      masterId: ['', []],
      industry: ['', []],
      active: [false, []],
      visibilty_flg: [false, []],
      preferences: new FormGroup({
        IntroInstance: new FormControl('', []),
        AboutUsInstance: new FormControl('', []),
        FPSInstanceId: new FormControl('', []),
        VideoInstance: new FormControl('', []),
        EditorialFeed: new FormControl('', []),
        NewsLetter: new FormControl('', []),
        SocialNetworkFeed: new FormControl('', []),
        LogoWidth: new FormControl('', []),
        LogoHeight: new FormControl('', []),
        CustomPages: new FormControl('', []),
        NewsPage: new FormControl('', []),
        mainZoneId: new FormControl('', []),
        globalSchedularId: new FormControl('', []),
      }),
      title: ['', []],
      description: ['', []],
    });
  }
  private populateMapper(controllerName: string): void {
    this.editForm.get('preferences').get(controllerName?.trim())?.reset('');
  }
}

// ---------------------------------------------------------------------
//  @Component for nested dialog
// ---------------------------------------------------------------------
@Component({
  template: `
    <h2 mat-dialog-title class="title">
      add new template
      <mat-icon aria-hidden="false" (click)="close()" class="close-btn">
        {{ icons.close }}
      </mat-icon>
    </h2>
    <div mat-dialog-content>
      <form [formGroup]="templateForm" noValidate>
        <div class="form-container">
          <mat-form-field appearance="outline" class="edit-form-field">
            <mat-label>Template Name</mat-label>
            <input
              type="text"
              matInput
              class="dashboard-input"
              formControlName="name"
            />
          </mat-form-field>
        </div>
      </form>
    </div>
    <div mat-dialog-actions>
      <button
        type="button"
        mat-raised-button
        mat-dialog-close
        class="btns-right"
        color="default"
        (click)="close()"
      >
        Cancel
      </button>
      <button
        type="button"
        mat-raised-button
        class="btns-right btn-u btn-primary"
        (click)="add(templateForm.get('name').value)"
      >
        Save
      </button>
    </div>
  `,
  styleUrls: ['./template-edit.component.scss'],
})
export class AddNewTemplate implements OnDestroy {
  // -------------------------------------------------------------
  // @PUBLIC ACCESSORIES
  // -------------------------------------------------------------
  templateForm = this.getAddTemplateForm();

  // -------------------------------------------------------------
  // @CONSTRUCTOR
  // -------------------------------------------------------------
  /**
   * @param {MatDialogRef} _matDialogRef
   * @param {FormBuilder} _formBuilder
   * @param {MAT_DIALOG_DATA} data,
   * @param {TemplateFacade} _facade
   */
  constructor(
    private _matDialogRef: MatDialogRef<AddNewTemplate>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _facade: TemplateFacade
  ) {}

  // -------------------------------------------------------------
  // @LIFE CYCLE HOOKS
  // -------------------------------------------------------------
  ngOnDestroy(): void {
    this._matDialogRef.close();
  }

  // -------------------------------------------------------------
  // @GETTERS & @SETTERS
  // -------------------------------------------------------------
  get icons(): typeof icons {
    return icons;
  }

  // -------------------------------------------------------------
  // @PUBLIC METHODS
  // -------------------------------------------------------------
  close() {
    this._matDialogRef.close();
  }
  add(templateName: string) {
    this._facade.addNewTemplate(templateName, this.data.applicationId);
    this._matDialogRef.close();
  }

  // -------------------------------------------------------------
  // @PRIVATE METHODS
  // -------------------------------------------------------------
  private getAddTemplateForm(): FormGroup {
    return this._formBuilder.group({
      name: ['', []],
    });
  }
}

@NgModule({
  declarations: [TemplateEditComponent, AddNewTemplate],
  imports: [
    CommonModule,
    FormsModule,
    ...Material_Modules,
    NgxsModule.forFeature([TemplateState]),
    NgxsFormPluginModule,
    ReactiveFormsModule,
  ],
  exports: [TemplateEditComponent],
})
export class TemplateEditComponentModule {}
