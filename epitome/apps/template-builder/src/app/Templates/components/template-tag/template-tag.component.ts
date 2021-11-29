import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  AssortmentsModule,
  icons,
  Inline,
  Material_Modules,
  Media,
  validateHex,
} from '@assortments';
// @error-handler
import { ErrorSnackService } from '@error-handler';
import { NgxsModule } from '@ngxs/store';
import {
  FileSystemFileEntry,
  NgxFileDropEntry,
  NgxFileDropModule,
} from 'ngx-file-drop';
import { delay, filter, tap } from 'rxjs/operators';
// facades
import { TemplateFacade } from '../../facades';
import { TemplateState } from '../../store';
// @types
import { Colors, ColorScheme, DesignScheme } from '../../types';
// utility
import { TemplateUtility as _util } from '../../utility';
// components & components
import {
  TemplateAddDesignComponent,
  TemplateAddDesignComponentModule,
} from '../template-add-design/template-add-design.component';

@Component({
  selector: 'tb-tags',
  templateUrl: './template-tag.component.html',
  styleUrls: ['./template-tag.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('dataLoad', [
      state('origin', style({ transform: 'translateY(230%)' })),
      state('destination', style({ transform: 'translateY(0%)' })),
      transition('* => *', [animate('1.5s ease-out')]),
    ]),
  ],
})
export class TemplateTagComponent implements OnInit, OnDestroy {
  //-------------------------------------------------------------
  // @PUBLIC ACCESSORIES
  //--------------------------------------------------------------
  columnsToDisplay = ['designName', 'tags', 'css', 'image', 'actions'];
  color_scheme: ColorScheme | null;
  isExecuted = false;
  inlineObj: Inline<number, string>;
  tagForm: FormGroup = this.getTagForm();
  designSchemes$ = this._facade.designScheme$.pipe(
    filter(Boolean),
    delay(1500),
    tap((response: DesignScheme) => this.massageTagForm(response.ColorScheme))
  );

  //-------------------------------------------------------------
  // @INPUT() & @OUTPUT()
  //--------------------------------------------------------------
  @Input() public isStyle = false;
  @Input() public templateName: string;
  @Input() public templateId: number;
  @Input() public appCode: string;
  @Input() public parentForm: FormGroup;

  //-------------------------------------------------------------
  // @CONSTRUCTOR
  //--------------------------------------------------------------
  /**
   *
   * @param {ErrorSnackService} _errorHandler
   * @param {TemplateFacade} _facade
   * @param {MatDialog} _matDialog
   * @param {FormBuilder} _formBuilder
   */

  constructor(
    private _errorHandler: ErrorSnackService,
    private _facade: TemplateFacade,
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {}

  //-------------------------------------------------------------
  // @LIFE CYCLE HOOKS
  //--------------------------------------------------------------

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.isExecuted = false;
    this._facade.storeDesignScheme(null);
  }

  //-------------------------------------------------------------
  // @GETTERS & @SETTERS
  //--------------------------------------------------------------

  get icons(): typeof icons {
    return icons;
  }

  // ----------------------------------------------------------
  // @Public Methods
  // ----------------------------------------------------------
  designNameChange($event: Inline<number, string>) {
    if ($event) this.inlineObj = { ...$event };
  }
  save(color_scheme: ColorScheme, tagForm: DesignScheme): void {
    this._facade.saveDesignRow(
      _util.parsingColorScheme(
        color_scheme,
        tagForm.ColorScheme,
        parseInt(color_scheme.Id, 0) === this.inlineObj?.key
          ? this.inlineObj?.currentValue
          : null
      )
    );
    this.isExecuted = false;
  }
  delete(current_row: ColorScheme, tagForm: DesignScheme): void {
    // stop further $event.bubbling

    this._facade.deleteDesignRow(
      _util.parsingColorScheme(current_row, tagForm.ColorScheme)
    );
  }
  onColorSchemeDrop($event: NgxFileDropEntry[]): void {
    if ($event) {
      for (const file of $event) {
        if (file.fileEntry.isFile) {
          const fileUploadEntry = file.fileEntry as FileSystemFileEntry;
          fileUploadEntry.file((f: File) => {
            this.fileReader(f);
          });
        }
      }
    }
  }
  onFileImport(files: FileList, $event: Event): void {
    if (files) {
      const file: File = files[0];
      this.fileReader(file);
      if ($event) $event.target['value'] = '';
    }
  }
  onImageDropped($event: NgxFileDropEntry[], color_scheme: ColorScheme): void {
    let fileEntry: FileSystemFileEntry;
    if ($event) {
      for (const file of $event) {
        if (file.fileEntry.isFile)
          fileEntry = file.fileEntry as FileSystemFileEntry;
        if (fileEntry)
          fileEntry.file((f: File) => {
            this.imageUploadDispatcher(f, color_scheme);
          });
      }
    }
  }
  onImageImport(files: FileList, color_scheme: ColorScheme): void {
    if (files) {
      this.imageUploadDispatcher(files[0], color_scheme);
    }
  }
  addDesign(): void {
    const modalRef = this._matDialog.open(TemplateAddDesignComponent, {
      width: '400px',
      data: {
        appCode: this.appCode,
        templateName: this.templateName,
        templateId: this.templateId,
      },
      disableClose: true,
      position: {
        top: '10%',
      },
    });
  }
  // ---------------------------------------------------------
  // @Private Methods
  // ---------------------------------------------------------
  private getTagForm(): FormGroup {
    return this._formBuilder.group({
      ColorScheme: this._formBuilder.array([this.getColors()]),
    });
  }
  private getColors(): FormGroup {
    return this._formBuilder.group({
      Id: ['', []],
      Name: ['', []],
      DesignColor: ['', []],
      MediaId: ['', []],
      MediaPath: ['', []],
      CSS: ['', []],
      DesignTags: this._formBuilder.array([this.getTags()]),
    });
  }
  private getTags(): FormGroup {
    return this._formBuilder.group({
      Id: ['', []],
      designName: ['', []],
      Name: ['', []],
      Value: ['', []],
    });
  }
  private massageTagForm(colors: ColorScheme[]): void {
    if (
      typeof colors !== 'undefined' &&
      colors !== null &&
      colors?.length > 0
      // &&
      // !this.isExecuted
    ) {
      this.deletFormArrays();
      this.tagForm.reset();
      colors.forEach((v, i) => {
        if (
          typeof v !== 'undefined' &&
          typeof v === 'object' &&
          v !== null &&
          i <= 8
        )
          if (
            v.Name !== null &&
            v.DesignColor !== null &&
            v.DesignTags !== null
          )
            (<FormArray>this.tagForm.get('ColorScheme')).push(
              new FormGroup({
                Id: new FormControl(v.Id, []),
                Name: new FormControl(v.Name, []),
                DesignColor: new FormControl(v.DesignColor, []),
                MediaId: new FormControl(v.MediaId, []),
                MediaPath: new FormControl(v.MediaPath, []),
                CSS: new FormControl(v.CSS, []),
                DesignTags: this.getTagArray(v.DesignTags),
              })
            );
      });
      this.isExecuted = true;
    }
  }
  private deletFormArrays(): void {
    const colors = this.tagForm.get('ColorScheme') as FormArray;
    if (colors.length > 0)
      for (let i = colors.length - 1; i >= 0; i--) {
        colors.removeAt(i);
      }
  }
  private getTagArray(tags: Colors[]): FormArray {
    if (typeof tags !== 'undefined' && tags !== null && tags.length > 0) {
      const tag: FormArray = new FormArray([]);
      tags
        .filter((v) => typeof v !== 'undefined' && v && typeof v === 'object')
        .forEach((v, _k) => {
          tag.push(
            new FormGroup({
              Id: new FormControl(v.Id, []),
              Name: new FormControl(v.Name, []),
              Value: new FormControl(v.Value, [
                Validators.required,
                validateHex.bind(this),
              ]),
            })
          );
        });
      return tag;
    }
  }
  private fileReader(file: File): void {
    if (file.name.indexOf('schemes.txt') > -1) {
      const fr: FileReader = new FileReader();
      fr.onload = async () => {
        try {
          const formattedData: Array<ColorScheme> = await JSON.parse(
            fr.result.toString().replace(/\\\\/g, '/')
          );
          this.isExecuted = false;
          this.tagForm.reset();

          this._facade.storeDesignScheme(
            _util.designSchemeDefaultMapper(formattedData)
          );
        } catch (error) {
          this.throwErrorMessage(error);
        }
      };
      fr.readAsText(file);
    } else {
      const err: Error = {
        message: 'Please upload the correct color-schemes file.',
        name: 'file-reader-error',
      };
      this.throwErrorMessage(err);
    }
  }
  private imageUploadDispatcher(f: File, current_row: ColorScheme) {
    if (Media.fileValidation(f) instanceof FormData) {
      this._facade.uploadTemplateImage(
        Media.fileValidation(f) as FormData,
        current_row
      );
      this.isExecuted = !this.isExecuted;
    } else {
      const err = Media.fileValidation(f) as Error;
      this.throwErrorMessage(err);
    }
  }
  private throwErrorMessage(error: Error): void {
    this._errorHandler.handleError(error);
  }
}
// ---------------------------------------------------------------------------------------------------
// @NgModule
// ---------------------------------------------------------------------------------------------------
@NgModule({
  declarations: [TemplateTagComponent],
  imports: [
    CommonModule,
    FormsModule,
    ...Material_Modules,
    NgxsModule.forFeature([TemplateState]),
    NgxFileDropModule,
    ReactiveFormsModule,
    AssortmentsModule,
    TemplateAddDesignComponentModule,
  ],
  exports: [TemplateTagComponent, TemplateAddDesignComponentModule],
})
export class TemplateTagComponentModule {}
