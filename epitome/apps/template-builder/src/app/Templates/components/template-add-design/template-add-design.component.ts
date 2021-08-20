import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

// @assortments
import { Material_Modules, validateHex, icons } from '@assortments';
import { CommonModule } from '@angular/common';
import { ColorScheme } from '../../types';

@Component({
  selector: 'tb-design',
  templateUrl: './template-add-design.component.html',
  styleUrls: ['./template-add-design.component.scss'],
})
export class TemplateAddDesignComponent implements OnInit {
  public designForm: FormGroup = this.getDesignForm();
  public get icons(): typeof icons {
    return icons;
  }
  /**
   *
   * @param {MAT_DIALOG_DATA} data
   * @param {MatDialogRef} _matDialogRef
   * @param {FormBuilder} _formGroup
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialogRef: MatDialogRef<TemplateAddDesignComponent>,
    private _formGroup: FormBuilder
  ) {}

  ngOnInit(): void {
    this.designForm.patchValue({
      templateName: this.data.templateName,
      id: this.data.templateId,
      appCode: this.data.appCode
    });
    console.log(this.data);    
  }

  // --------------------------------------------------
  // @Private Methods
  // --------------------------------------------------
  private getDesignForm(): FormGroup {
    return this._formGroup.group({
      Name: ['', [Validators.required]],
      templateName: ['', [Validators.required]],
      id: ['', [Validators.required]],
      appCode: ['', []],
      DesignColor: ['', [Validators.required, validateHex.bind(this)]],
    });
  }

  // --------------------------------------------------
  // @Public Methods
  // --------------------------------------------------
  close() {
    this._matDialogRef.close();
  }
  save(color_scheme: ColorScheme) {
    console.log(color_scheme);
    const tempScheme: ColorScheme = {
      Id: null,
      Name: color_scheme.Name,
      TemplateId: parseInt(color_scheme.Id, 0),
      CSS: '',
      DesignColor: color_scheme.DesignColor,
      MediaId: 0,
      MediaPath: '',
      DesignTags: [{
        Id: null,
        Name: 'PrimaryColor',
        Value: color_scheme.DesignColor
      }]
    }
    console.log('temp-color', tempScheme);
  }
}


@NgModule({
  declarations: [TemplateAddDesignComponent],
  imports: [
      CommonModule,
      FormsModule,
      ...Material_Modules,
      ReactiveFormsModule
  ],
  exports: [TemplateAddDesignComponent]
})
export class TemplateAddDesignComponentModule {}