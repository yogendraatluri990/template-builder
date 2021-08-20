import { Component, Inject, OnInit, NgModule } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {tap} from 'rxjs/operators';
import { NgxsModule } from '@ngxs/store';

// @assorments
import { Material_Modules, icons } from '@assortments';
// importing facades
import { TemplateFacade } from '../../facades';

// @Importing Store
import {TemplateState} from '../../store';

@Component({
  selector: 'tb-template-convertion',
  templateUrl: './template-convertion.component.html',
  styleUrls: ['./template-convertion.component.scss'],
})
export class TemplateConvertionComponent implements OnInit {
  public convertionForm: FormGroup = this.getForm();
  public get icons(): typeof icons {return icons };
  public templateAppInfo$ = this._facade.templateAppInfo$.pipe(tap((response) => {
    if (response)
    this.convertionForm.patchValue({
      validTemplate: response.IsValidToConvertIntoTemplate
    });
  }));
  public templateConvertion$ = this._facade.convertToTemplate$;
  /**
   *
   * @param {MatDialogRef} _matDialogRef
   * @param {MAT_DIALOG_DATA} data
   * @param {DashboardFacade} _dashboardFacade
   */

  constructor(
    private _matDialogRef: MatDialogRef<TemplateConvertionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _facade: TemplateFacade
  ) {}

  ngOnInit(): void {}

  // ----------------------------------------------------------------
  // @Private Methods
  // ----------------------------------------------------------------

  // ----------------------------------------------------------------
  // @ Public Methods
  // ----------------------------------------------------------------
  public getForm(): FormGroup {
    return this._formBuilder.group({
      appCode: ['', [Validators.required]],
      validTemplate: [false, [Validators.required]]
    });
  }
  public onClose() {
    this._matDialogRef.close();
  }
  public findAppCode(appCode: string) {
    this._facade.getAppInfo(appCode);
  }
  public onConvert(appCode: string) {
    if (appCode) this._facade.convertToTemplate(appCode);
  }
}

@NgModule({
  declarations: [TemplateConvertionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ...Material_Modules,
    NgxsModule.forFeature([TemplateState]),
    ReactiveFormsModule,
  ],
  exports: [TemplateConvertionComponent],
})
export class TemplateConvertionComponentModule {}
