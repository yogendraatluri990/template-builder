import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { TemplateAction as templateActions, TemplateState } from '../store';

import { Template, ColorScheme, DesignScheme, TemplateForm } from '../types';

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
  public templateAppInfo$ = this._store.select(
    TemplateState.getTemplateAppInfo
  );
  public templateList$ = this._store.select(TemplateState.getTemplateList);
  public convertToTemplate$ = this._store.select(
    TemplateState.getConvertToTemplate
  );
  /**
   * Template Design Page
   */
  public designScheme$ = this._store.select(TemplateState.getDesignScheme);

  public currentTemplate$ = this._store.select(
    TemplateState.getCurrentTemplate
  );
  /**
   * Template Edit Page
   */
  public template$ = this._store.select(TemplateState.getTemplateInfo);
  public templateAddedResponse$ = this._store.select(
    TemplateState.getAddedTemplateResponse
  );
  public moduleInstance$ = this._store.select(TemplateState.getModuleInstances);

  constructor(private _store: Store) {}

  // -------------------------------------------------------
  // @ Public Methods
  // -------------------------------------------------------
  /**
   * Template List Page
   */
  public getTemplateList(): void {
    this._store.dispatch(new templateActions.GetTemplates());
  }
  public getAppInfo(appCode: string): void {
    this._store.dispatch(new templateActions.GetAppInfo(appCode));
  }
  public convertToTemplate(appCode: string): void {
    this._store.dispatch(new templateActions.ConvertToTemplate(appCode));
  }
  public storeCurrentTemplate(currentTemplate: Template): void {
    this._store.dispatch(new templateActions.CurrentTemplate(currentTemplate));
  }
  /**
   * Template Design Page
   **/
  public storeDesignScheme(design: DesignScheme | null): void {
    this._store.dispatch(new templateActions.StoreTemplateDesign(design));
  }
  public uploadTemplateImage(f: FormData, current_row: ColorScheme): void {
    this._store.dispatch(new templateActions.ImageUpload(f, current_row));
  }
  public saveDesignTag(tag: FormData): void {
    this._store.dispatch(new templateActions.SaveDesignTag(tag));
  }
  public saveDesignRow(currentRow: ColorScheme): void {
    this._store.dispatch(
      new templateActions.UpdateColorScheme(currentRow, null, false)
    );
  }
  public deleteDesignRow(currentRow: ColorScheme): void {
    this._store.dispatch(new templateActions.DeleteColorScheme(currentRow));
  }
  /**
   * Template Edit Page
   **/
  public getTemplateInfo(applicationId: string): void {
    this._store.dispatch(new templateActions.GetTemplateInfo(applicationId));
  }
  public resetEditTemplate(): void {
    this._store.dispatch(new templateActions.ResetEditTemplate());
  }
  public addNewTemplate(name: string, applicationId: string): void {
    this._store.dispatch(
      new templateActions.AddNewTemplate(name, applicationId)
    );
  }
  public populateInstances(applicationId: number, masterAppId: number): void {
    this._store.dispatch(
      new templateActions.PopulateModuleInstance(
        applicationId.toString(),
        masterAppId.toString(),
        false
      )
    );
  }
  public resetPopulate(): void {
    this._store.dispatch(
      new templateActions.PopulateModuleInstance(null, null, true)
    );
  }
  public saveTemplateEdit(templateInfo: TemplateForm): void {
    this._store.dispatch(new templateActions.SaveTemplateEdit(templateInfo));
  }
}
