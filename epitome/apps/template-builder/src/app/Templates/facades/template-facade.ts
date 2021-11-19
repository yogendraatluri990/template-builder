import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { TemplateAction as templateActions, TemplateState } from '../store';
import { ColorScheme, DesignScheme, Template, TemplateForm } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TemplateFacade {
  /**
   *
   * @param {Store} _store
   */

  // -------------------------------------------------------
  // @ Public Accessors
  // -------------------------------------------------------
  /**
   * Template List Page
   */
  templateAppInfo$ = this._store.select(TemplateState.getTemplateAppInfo);
  templateList$ = this._store.select(TemplateState.getTemplateList);
  convertToTemplate$ = this._store.select(TemplateState.getConvertToTemplate);
  /**
   * Template Design Page
   */
  designScheme$ = this._store.select(TemplateState.getDesignScheme);

  currentTemplate$ = this._store.select(TemplateState.getCurrentTemplate);
  /**
   * Template Edit Page
   */
  template$ = this._store.select(TemplateState.getTemplateInfo);
  templateAddedResponse$ = this._store.select(
    TemplateState.getAddedTemplateResponse
  );
  moduleInstance$ = this._store.select(TemplateState.getModuleInstances);

  constructor(private _store: Store) {}

  // -------------------------------------------------------
  // @ Public Methods
  // -------------------------------------------------------
  /**
   * Template List Page
   */
  getTemplateList(): void {
    this._store.dispatch(new templateActions.GetTemplates());
  }

  getAppInfo(appCode: string): void {
    this._store.dispatch(new templateActions.GetAppInfo(appCode));
  }

  convertToTemplate(appCode: string): void {
    this._store.dispatch(new templateActions.ConvertToTemplate(appCode));
  }

  storeCurrentTemplate(currentTemplate: Template): void {
    this._store.dispatch(new templateActions.CurrentTemplate(currentTemplate));
  }
  /**
   * Template Design Page
   **/
  getTemplateDesignData(applicationId: number): void {
    this._store.dispatch(
      new templateActions.GetTemplateDesignData(applicationId)
    );
  }

  storeDesignScheme(design: DesignScheme | null): void {
    this._store.dispatch(new templateActions.StoreTemplateDesign(design));
  }

  uploadTemplateImage(f: FormData, current_row: ColorScheme): void {
    this._store.dispatch(new templateActions.ImageUpload(f, current_row));
  }

  saveDesignTag(tag: FormData): void {
    this._store.dispatch(new templateActions.SaveDesignTag(tag));
  }

  saveDesignRow(currentRow: ColorScheme): void {
    this._store.dispatch(
      new templateActions.UpdateColorScheme(currentRow, null, false)
    );
  }

  deleteDesignRow(currentRow: ColorScheme): void {
    this._store.dispatch(new templateActions.DeleteColorScheme(currentRow));
  }
  /**
   * Template Edit Page
   **/
  getTemplateInfo(applicationId: string): void {
    this._store.dispatch(new templateActions.GetTemplateInfo(applicationId));
  }

  resetEditTemplate(): void {
    this._store.dispatch(new templateActions.ResetEditTemplate());
  }

  addNewTemplate(name: string, applicationId: string): void {
    this._store.dispatch(
      new templateActions.AddNewTemplate(name, applicationId)
    );
  }

  populateInstances(applicationId: number, masterAppId: number): void {
    this._store.dispatch(
      new templateActions.PopulateModuleInstance(
        applicationId.toString(),
        masterAppId.toString(),
        false
      )
    );
  }

  resetPopulate(): void {
    this._store.dispatch(
      new templateActions.PopulateModuleInstance(null, null, true)
    );
  }

  saveTemplateEdit(templateInfo: TemplateForm): void {
    this._store.dispatch(new templateActions.SaveTemplateEdit(templateInfo));
  }
}
