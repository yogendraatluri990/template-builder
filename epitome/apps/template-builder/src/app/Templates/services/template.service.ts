import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
// @Importing from Auth
import { SMARTLINK_SERVICE_CONFIG, ServiceConfig } from '@auth';

// @Importing from Environment
import { environment } from '../../../environments/environment';

// @ Importing Rest Client
import { ImageService, Messenger, MessengerPage } from '@assortments';

import {
  AppInfo,
  SAMPLE_APP_PROP,
  Template,
  TemplateForm,
  CONVERT_TO_TEMPLATE,
  RETRIEVE_APP_INFO,
  ConvertTemplateMessage,
  EDIT_TEMPLATE_CONFIG,
  MODULE_INSTANCE_CONFIG,
  EditTemplate,
  ModuleInstance,
  InstanceDuplicate,
  IMAGE_UPLOAD,
  ImageFile,
  ADD_NEW_TEMPLATE,
  SavedResponse,
  ADD_NEW_DESIGN_TAG,
  TEMPLATE_CSS_CONFIG,
  SAVE_APPLICATION_CONFIG,
  SAVE_PREFERENCES_CONFIG,
  SAVE_VISIBILITY_CONFIG,
} from '../types';
import { ModuleInstanceCode as _instanceCodes } from '../constants';
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
    @Inject(SAVE_VISIBILITY_CONFIG) private _saveVisibilityConfig: ServiceConfig
  ) {
    super(_http);
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
      this.getUri() + this._editTemplateConfig.Url + applicationId + '.json'
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
  // -------------------------------------------------------------------------------------------------------------
  // @ Public Methods
  // -------------------------------------------------------------------------------------------------------------

  public getTemplateLists(): Promise<Array<Template>> {
    return this._http
      .get<Template[]>(`${this.getTemplateUri()}`)
      .pipe(catchError(this.handleError))
      .toPromise();
  }
  public getTemplateInfo(applicationId: string): Promise<EditTemplate> {
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
      )
      .toPromise();
  }
  public convertToTemplate(appCode: string): Promise<ConvertTemplateMessage> {
    return this._http
      .post<ConvertTemplateMessage>(`${this.getConvertTemplateUri()}`, {
        appCode: appCode,
      })
      .pipe(catchError(this.handleError))
      .toPromise();
  }
  public retrieveAppInfo(appCode: string): Promise<AppInfo> {
    return this._http
      .get<AppInfo>(`${this.getAppInfoUri(appCode)}`)
      .pipe(catchError(this.handleError))
      .toPromise();
  }
  public addNewTemplate(templateName: string): Promise<SavedResponse> {
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
      )
      .toPromise();
  }
  public saveDesignTag(tag: FormData): Promise<SavedResponse> {
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
      )
      .toPromise();
  }
  public populateModuleInstance(
    applicationId: string,
    masterAppId: string
  ): Promise<InstanceDuplicate> {
    const duplicateInstances: InstanceDuplicate = {
      instances: [],
      nonInstances: [],
    };
    return this._http
      .get(`${this.getModuleInstanceUri(applicationId, masterAppId)}`)
      .pipe(
        catchError(this.handleError),
        map((res: ModuleInstance[]) => {
          res.map((v) => {
            if (v.ModuleCode === _instanceCodes.IntroText) {
              if (v.ModuleName.toLowerCase().indexOf('about') > -1) {
                v.ModuleCode = _instanceCodes.AboutUsText;
              }
            }
            return v;
          });
          if (!_util.isUnique<ModuleInstance>(res, 'ModuleCode')) {
            const duplicateKeys = [
              ..._util.getDuplicates<ModuleInstance>(res, 'ModuleCode'),
            ];
            for (let i = 0; i <= res.length; i++) {
              for (let j = 0; j <= duplicateKeys.length; j++) {
                if (
                  typeof res[i] !== 'undefined' &&
                  typeof duplicateKeys[j] !== 'undefined'
                )
                  if (res[i].ModuleCode === duplicateKeys[j]) {
                    let currentCount = _util.getCurrentCount(
                      res[i].ModuleCode,
                      duplicateKeys
                    );
                    const moduleCode = res[i].ModuleCode;
                    const zones = [];
                    while (currentCount > 0) {
                      if (res[i].ZoneId === duplicateKeys[j]) {
                      zones.push({
                        ZoneId: res[i].ZoneId,
                        InstanceId: res[i].Id,
                        IsPervasive: res[i].IsPervasive ? 'Y' : 'N',
                      });
                      currentCount--;
                      i++;
                    }
                    }
                    duplicateInstances.instances.push({
                      ModuleCode: moduleCode,
                      Zones: [...zones],
                    });
                  }
              }
            }
            Object.keys(_instanceCodes).forEach((k) => {
              if (!res.some((v) => v.ModuleCode === _instanceCodes[k])) {
                duplicateInstances.nonInstances.push({
                  ModuleCode: _instanceCodes[k],
                  ModuleName: k,
                });
              }
            });
          }
          return duplicateInstances;
        })
      )
      .toPromise();
  }

  //----------------------------------------------
  // Saving Edit Template Screen.
  public saveTemplateEdit(templateInfo: TemplateForm): Promise<any> {   
    return this._http
      .post(`${this.getApplicationUri()}`, { ..._util.getApplicationInfo(templateInfo) })
      .pipe(
        catchError(this.handleError),
        mergeMap(() =>
          this._http
            .post(
              `${this.getVisibilityUri(
                templateInfo.applicationId,
                templateInfo.designTemplateId,
                templateInfo.visibilty_flg
              )}`,
              {}
            )
            .pipe(
              catchError(this.handleError),
              mergeMap(() =>
                this._http
                  .post(`${this.getPreferencesUri()}`, {
                    ..._util.getPreferences(templateInfo),
                  })
                  .pipe(catchError(this.handleError))
              )
            )
        )
      )
      .toPromise();
  }

  // -----------------------------------------
  // @image-uploader
  // ------------------------------------------
  public uploadImage<k>(file: FormData): Promise<k> {
    return this._http
      .post<k>(`${this.getImageUploadUri()}`, file)
      .pipe(catchError(this.handleError))
      .toPromise();
  }
}
