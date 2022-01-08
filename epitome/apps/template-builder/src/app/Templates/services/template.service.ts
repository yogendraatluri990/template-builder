import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// @ Importing Rest Client
import { ImageService, Messenger, MessengerPage } from '@assortments';
// @Importing from Auth
import { ServiceConfig, SMARTLINK_SERVICE_CONFIG } from '@auth';
import { concatMap, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// @Importing from Environment
import { environment } from '../../../environments/environment';
import {
  ADD_NEW_DESIGN_TAG,
  ADD_NEW_TEMPLATE,
  AppInfo,
  ConvertTemplateMessage,
  CONVERT_TO_TEMPLATE,
  DesignScheme,
  EditTemplate,
  EDIT_TEMPLATE_CONFIG,
  ImageFile,
  IMAGE_UPLOAD,
  InstanceDuplicate,
  ModuleInstance,
  MODULE_INSTANCE_CONFIG,
  RETRIEVE_APP_INFO,
  SAMPLE_APP_PROP,
  SavedResponse,
  SAVE_APPLICATION_CONFIG,
  SAVE_PREFERENCES_CONFIG,
  SAVE_VISIBILITY_CONFIG,
  Template,
  TemplateForm,
  TEMPLATE_CSS_CONFIG,
  TEMPLATE_DESIGN_DATA,
} from '../types';
import { TemplateUtility as _util } from '../utility';

@Injectable({
  providedIn: 'root',
})
export class TemplateService extends ImageService<ImageFile> {
  /**
   * @param {HttpClient} _http
   * @param {MatSnackBar} _snackBar
   * @param {SMARTLINK_SERVICE_CONFIG} _smartLinkConfig
   * @param {SAMPLE_APP_PROP} _sampleAppPropConfig
   * @param {CoNVERT_TO_TEMPLATE} _convertToTemplate
   * @param {RETRIEVE_APP_INFO} _retrieveAppInfo
   * @param {EDIT_TEMPLATE_CONFIG} _editTemplateConfig
   * @param {IMAGE_UPLOAD} _imageUploadConfig
   * @param {ADD_NEW_TEMPLATE} _addNewTemplate
   * @param {ADD_NEW_DESIGN_TAG} _addNewDesignTag
   * @param {TEMPLATE_CSS_CONFIG} _templateCssConfig
   * @param {MODULE_INSTANCE_CONFIG} _moduleInstanceConfig
   * @param {SAVE_APPLICATION_CONFIG} _saveApplicationConfig
   * @param {SAVE_PREFERENCES_CONFIG} _savePreferencesConfig
   * @param {SAVE_VISIBILITY_CONFIG} _saveVisibilityConfig
   * @param {TEMPLATE_DESIGN_DATA} _getTemplateConfig
   */
  constructor(
    protected _http: HttpClient,
    private _snackBar: MatSnackBar,
    @Inject(SMARTLINK_SERVICE_CONFIG) private _smartLinkConfig: ServiceConfig,
    @Inject(SAMPLE_APP_PROP) private _sampleAppPropConfig: ServiceConfig,
    @Inject(CONVERT_TO_TEMPLATE) private _convertToTemplate: ServiceConfig,
    @Inject(RETRIEVE_APP_INFO) private _retrieveAppInfo: ServiceConfig,
    @Inject(EDIT_TEMPLATE_CONFIG) private _editTemplateConfig: ServiceConfig,
    @Inject(IMAGE_UPLOAD) private _imageUploadConfig: ServiceConfig,
    @Inject(ADD_NEW_TEMPLATE) private _addNewTemplate: ServiceConfig,
    @Inject(ADD_NEW_DESIGN_TAG) private _addNewDesignTag: ServiceConfig,
    @Inject(TEMPLATE_CSS_CONFIG) private _templateCssConfig: ServiceConfig,
    @Inject(MODULE_INSTANCE_CONFIG)
    private _moduleInstanceConfig: ServiceConfig,
    @Inject(SAVE_APPLICATION_CONFIG)
    private _saveApplicationConfig: ServiceConfig,
    @Inject(SAVE_PREFERENCES_CONFIG)
    private _savePreferencesConfig: ServiceConfig,
    @Inject(SAVE_VISIBILITY_CONFIG)
    private _saveVisibilityConfig: ServiceConfig,
    @Inject(TEMPLATE_DESIGN_DATA) private _getTemplateConfig: ServiceConfig
  ) {
    super(_http);
  }

  // -------------------------------------------------------------------------------------------------------------
  // @ Public Methods
  // -------------------------------------------------------------------------------------------------------------

  getTemplateLists(): Observable<Array<Template>> {
    return this._http
      .get<Template[]>(`${this.getTemplateUri()}`)
      .pipe(catchError(this.handleError));
  }

  getTemplateInfo(applicationId: string): Observable<EditTemplate> {
    return this._http
      .get<EditTemplate>(`${this.getTemplateInfoUri(applicationId)}`)
      .pipe(
        catchError(this.handleError),
        map((response: EditTemplate) => {
          if (response) {
            response['RelationshipRoles'] = ['Undefined', 'Master', 'Slave'];
            return response;
          }
        })
      );
  }

  getTemplateDesignData(applicationId: number): Observable<DesignScheme> {
    return this._http.get<DesignScheme>(
      `${this.getTemplateDesignDataUri()}/${applicationId}.json`
    );
  }

  convertToTemplate(appCode: string): Observable<ConvertTemplateMessage> {
    return this._http
      .post<ConvertTemplateMessage>(`${this.getConvertTemplateUri()}`, {
        appCode: appCode,
      })
      .pipe(catchError(this.handleError));
  }

  retrieveAppInfo(appCode: string): Observable<AppInfo> {
    return this._http
      .get<AppInfo>(`${this.getAppInfoUri(appCode)}`)
      .pipe(catchError(this.handleError));
  }

  addNewTemplate(templateName: string): Observable<SavedResponse> {
    return this._http
      .post<SavedResponse>(`${this.getAddNewTemplateUri(templateName)}`, {})
      .pipe(
        catchError(this.handleError),
        map((response) => {
          const config: Messenger = {
            Data: {
              message: response.Message,
              icon: 'done',
            },
            panelClass: ['success-message'],
          };
          this.messenger(config);
          return response;
        })
      );
  }

  saveDesignTag(tag: FormData): Observable<SavedResponse> {
    return this._http
      .post<SavedResponse>(`${this.getAddNewDesignTagUri()}`, tag)
      .pipe(
        catchError(this.handleError),
        map((response) => {
          const config: Messenger = {
            Data: {
              message: response.Message,
              icon: 'done',
            },
            panelClass: ['success-message'],
          };
          this.messenger(config);
          return response;
        })
      );
  }

  populateModuleInstance(
    applicationId: string,
    masterAppId: string
  ): Observable<InstanceDuplicate> {
    return this._http
      .get(`${this.getModuleInstanceUri(applicationId, masterAppId)}`)
      .pipe(
        catchError(this.handleError),
        map((res: ModuleInstance[]) => _util.getDuplicateInstances(res))
      );
  }

  //----------------------------------------------
  // Saving Edit Template Screen.
  //-------------------------------------------------
  saveTemplateEdit(templateInfo: TemplateForm): Observable<Object> {
    const sampleApplication = this._http
      .post(`${this.getApplicationUri()}`, {
        ..._util.getApplicationInfo(templateInfo),
      })
      .pipe(catchError(this.handleError));
    const visibility = this._http
      .post(
        `${this.getVisibilityUri(
          templateInfo.applicationId,
          templateInfo.designTemplateId,
          templateInfo.visibilty_flg
        )}`,
        {}
      )
      .pipe(catchError(this.handleError));
    const preferences = this._http
      .post(`${this.getPreferencesUri()}`, {
        ..._util.getPreferences(templateInfo),
      })
      .pipe(catchError(this.handleError));
    return sampleApplication.pipe(
      concatMap(() => visibility.pipe(concatMap(() => preferences)))
    );
  }

  // -----------------------------------------
  // @image-uploader
  // ------------------------------------------
  uploadImage<k>(file: FormData): Observable<k> {
    return this._http
      .post<k>(`${this.getImageUploadUri()}`, file)
      .pipe(catchError(this.handleError));
  }

  // ------------------------------------------------------------------------------------------------------------
  // @ Private Methods
  // -------------------------------------------------------------------------------------------------------------
  private getUri(): string {
    return `${
      environment.production
        ? this._smartLinkConfig.Url
        : environment.localDev
        ? this._smartLinkConfig.Dev_Url
        : this._smartLinkConfig.Uat_Url
    }`;
  }

  private getTemplateDesignDataUri(): string {
    return `${this.getUri() + this._getTemplateConfig.Url}`;
  }

  private getTemplateUri(): string {
    return `${this.getUri() + this._sampleAppPropConfig.Url}`;
  }

  private getConvertTemplateUri(): string {
    return `${this.getUri() + this._convertToTemplate.Url}`;
  }

  private getAppInfoUri(appCode: string): string {
    return `${this.getUri() + this._retrieveAppInfo.Url + appCode}`;
  }

  private getTemplateInfoUri(applicationId: string): string {
    return `${
      this.getUri() +
      this._editTemplateConfig.Url +
      applicationId +
      '.json' +
      '?RefreshCache=1'
    }`;
  }

  private getImageUploadUri(): string {
    return `${this.getUri() + this._imageUploadConfig.Url}`;
  }

  private getAddNewTemplateUri(templateName): string {
    return `${this.getUri() + this._addNewTemplate.Url}${templateName}.json`;
  }

  private getAddNewDesignTagUri(): string {
    return `${this.getUri()}${this._addNewDesignTag.Url}.json`;
  }

  private getTemplateCssUri(): string {
    return `${this.getUri()}${this._templateCssConfig.Url}.json`;
  }

  private getApplicationUri(): string {
    return `${this.getUri()}${this._saveApplicationConfig.Url}`;
  }
  private getVisibilityUri(
    applicationId: number,
    templateId: number,
    isVisible: boolean
  ): string {
    return `${this.getUri()}${
      this._saveVisibilityConfig.Url
    }/${applicationId}/template/${templateId}/visibility/${isVisible}`;
  }

  private getPreferencesUri(): string {
    return `${this.getUri()}${this._savePreferencesConfig.Url}`;
  }

  private getModuleInstanceUri(
    applicationId: string,
    masterAppId: string
  ): string {
    return `${this.getUri()}${
      this._moduleInstanceConfig.Url
    }appId=${applicationId}&masterAppId=${masterAppId}`;
  }

  //------------------------------------------------------------
  // @MAT_SNACKBAR Implementation
  //------------------------------------------------------------
  private openSnackBar(config: Messenger) {
    this._snackBar.openFromComponent(MessengerPage, {
      duration: config.Duration,
      data: config.Data,
      panelClass: config.panelClass,
      verticalPosition: config.verticalPosition,
      horizontalPosition: config.horizontalPosition,
    });
  }

  private messenger(config: Messenger): void {
    const configs: Messenger = {
      ...config,
      Duration: 500000,
      verticalPosition: 'top',
      horizontalPosition: 'start',
    };
    this.openSnackBar(configs);
  }
}
