import { Inject, Injectable } from '@angular/core';
import { Media as media } from '@assortments';
import { ServiceConfig, SMARTLINK_SERVICE_CONFIG } from '@auth';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { lastValueFrom, throwError } from 'rxjs';
// import services
import { TemplateService } from '../../../services';
// types
import {
  AppInfo,
  ColorScheme,
  ConvertTemplateMessage,
  DesignScheme,
  EditTemplate,
  ImageFile,
  IMAGE_UPLOAD,
  InstanceDuplicate,
  SavedResponse,
  StyleSheet,
  Template,
} from '../../../types';
// utilites
import { TemplateUtility as _templateUtil } from '../../../utility';
// actions
import { TemplateAction as templateActions } from '../actions/actions';
// model
import { TemplateStateModel } from '../models/model';

const TEMPLATE_LIST_DEFAULT: Array<Template> | null = null,
  CONVERT_TO_TEMPLATE_DEFAULT: ConvertTemplateMessage = {
    Message: '',
  },
  STYLE_SHEET_DEFAULT: StyleSheet = {
    templateId: '',
    templateName: '',
    templateCSS: '',
    templatePreview: '',
  };

@State<TemplateStateModel>({
  name: 'TemplateState',
  defaults: {
    templates: TEMPLATE_LIST_DEFAULT,
    convertTemplate: { ...CONVERT_TO_TEMPLATE_DEFAULT },
    templateDesign: null,
    editTemplate: null,
    templateAppInfo: null,
    templateImage: null,
    currentColorScheme: null,
    savedResponse: {
      Message: null,
      Success: null,
    },
    styleSheet: STYLE_SHEET_DEFAULT,
    moduleInstances: null,
  },
})
@Injectable({
  providedIn: 'root',
})
export class TemplateState {
  /**
   *
   * @param {DashboardService} _dashboardService
   */
  constructor(
    private _templateService: TemplateService,
    @Inject(IMAGE_UPLOAD) private _imageUrl: ServiceConfig,
    @Inject(SMARTLINK_SERVICE_CONFIG) private _smartlinkConfig: ServiceConfig
  ) {}
  // ------------------------------------------------------------------
  // @Selectors
  // ------------------------------------------------------------------
  /**
   * Template List Page
   **/
  @Selector()
  static getTemplateList(state: TemplateStateModel): Template[] {
    return state.templates;
  }

  @Selector()
  static getConvertToTemplate(
    state: TemplateStateModel
  ): ConvertTemplateMessage {
    return state.convertTemplate;
  }

  @Selector()
  static getCurrentTemplate(state: TemplateStateModel): Template {
    return state.currentTemplate;
  }

  @Selector()
  static getTemplateAppInfo(state: TemplateStateModel): AppInfo {
    return state.templateAppInfo;
  }

  /**
   * Tempalte Design Page
   **/
  @Selector()
  static getDesignScheme(state: TemplateStateModel): DesignScheme {
    return state.templateDesign;
  }

  @Selector()
  static getImageUploadInfo(state: TemplateStateModel): ImageFile {
    return state.templateImage;
  }

  /**
   * Template Edit Page
   **/
  @Selector()
  static getTemplateInfo(state: TemplateStateModel): EditTemplate {
    return state.editTemplate;
  }

  @Selector()
  static getAddedTemplateResponse(state: TemplateStateModel): SavedResponse {
    return state.savedResponse;
  }

  @Selector()
  static getModuleInstances(state: TemplateStateModel): InstanceDuplicate {
    return state.moduleInstances;
  }
  // -----------------------------------------------------------------
  // @Actions
  // -----------------------------------------------------------------
  /**
   * Template List Page
   **/
  // GET Sample App Properties
  @Action(templateActions.GetTemplates)
  async getTemplates(ctx: StateContext<TemplateStateModel>) {
    try {
      const templateList = await lastValueFrom(
        this._templateService.getTemplateLists()
      );
      ctx.patchState({
        templates: templateList,
      });
    } catch (error) {
      throwError(() => error);
    }
  }
  // POST Conver Into Template
  @Action(templateActions.ConvertToTemplate)
  async convertToTemplate(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.ConvertToTemplate
  ) {
    try {
      const message: ConvertTemplateMessage = await lastValueFrom(
        this._templateService.convertToTemplate(event.appCode)
      );
      ctx.patchState({
        convertTemplate: { ...message },
      });
      ctx.dispatch(new templateActions.GetTemplates());
    } catch (error) {
      throwError(() => error);
    }
  }

  @Action(templateActions.GetAppInfo)
  async getAppInfo(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.GetAppInfo
  ) {
    try {
      ctx.patchState({
        templateAppInfo: {
          ...(await lastValueFrom(
            this._templateService.retrieveAppInfo(event.appCode)
          )),
        },
      });
    } catch (error) {
      throwError(() => error);
    }
  }

  @Action(templateActions.CurrentTemplate)
  currentTemplate(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.CurrentTemplate
  ) {
    try {
      ctx.patchState({
        currentTemplate: event.currentTemplate,
      });
    } catch (error) {
      throwError(() => error);
    }
  }
  /**
   * Template Design Page
   **/
  @Action(templateActions.GetTemplateDesignData)
  async templateDesignData(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.GetTemplateDesignData
  ) {
    try {
      const templateDesignData = await lastValueFrom(
        this._templateService.getTemplateDesignData(event.applicationId)
      );
      ctx.dispatch(new templateActions.StoreTemplateDesign(templateDesignData));
    } catch (error) {
      throwError(() => error);
    }
  }

  @Action(templateActions.StoreTemplateDesign)
  colorScheme(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.StoreTemplateDesign
  ) {
    try {
      ctx.patchState({
        templateDesign: event.design ? { ...event.design } : null,
      });
    } catch (error) {
      throwError(() => error);
    }
  }

  @Action(templateActions.ImageUpload)
  async uploadImage(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.ImageUpload
  ) {
    try {
      const image: ImageFile = {
        ...(await lastValueFrom(
          this._templateService.uploadImage(event.image)
        )),
      };
      ctx.patchState({
        currentColorScheme: { ...event.current_row },
        templateImage: image,
      });
      ctx.dispatch(
        new templateActions.UpdateColorScheme(event.current_row, image, true)
      );
    } catch (error) {
      console.log(error);
      throwError(() => error);
    }
  }

  @Action(templateActions.UpdateColorScheme)
  updateColorScheme(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.UpdateColorScheme
  ) {
    try {
      const current_row: ColorScheme = {
        ...media.getMediaPath<ColorScheme>(
          _templateUtil.colorSchemeImageParser(
            event.color_scheme,
            event.currentImage
          ),
          ctx.getState().templateImage?.Name,
          this._imageUrl.Uat_Url,
          this._smartlinkConfig.Uat_Url,
          this._imageUrl.cdn_path,
          event.mediaPathFlg
        )[0],
      };
      console.log(current_row);
      ctx.patchState({
        templateDesign: {
          ..._templateUtil.designSchemeColorsParser(
            { ...ctx.getState().templateDesign },
            current_row
          ),
        },
      });
    } catch (error) {
      console.log(error);
      throwError(() => error);
    }
  }

  @Action(templateActions.SaveDesignTag)
  async saveDesignTag(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.SaveDesignTag
  ) {
    try {
      ctx.patchState({
        savedResponse: {
          ...(await lastValueFrom(
            this._templateService.saveDesignTag(event.tag)
          )),
        },
      });
    } catch (error) {
      throwError(() => error);
    }
  }

  @Action(templateActions.DeleteColorScheme)
  deleteColorScheme(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.DeleteColorScheme
  ) {
    try {
      ctx.patchState({
        templateDesign: {
          ..._templateUtil.designSchemeSpliceMapper(event.color_scheme, {
            ...ctx.getState().templateDesign,
          }),
        },
      });
    } catch (error) {
      console.log(error);
      throwError(() => error);
    }
  }

  /**
   * Template Edit Page
   **/
  @Action(templateActions.GetTemplateInfo)
  async getAmenities(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.GetTemplateInfo
  ) {
    try {
      const templateInfo = {
        ...(await lastValueFrom(
          this._templateService.getTemplateInfo(event.applicationId)
        )),
      };
      ctx.patchState({
        editTemplate: templateInfo,
      });
    } catch (error) {
      throwError(() => error);
    }
  }

  @Action(templateActions.ResetEditTemplate)
  resetEditTemplate(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.ResetEditTemplate
  ) {
    try {
      ctx.patchState({
        editTemplate: null,
      });
    } catch (error) {
      throwError(() => error);
    }
  }

  @Action(templateActions.AddNewTemplate)
  async addNewTemplate(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.AddNewTemplate
  ) {
    try {
      ctx.patchState({
        savedResponse: {
          ...(await lastValueFrom(
            this._templateService.addNewTemplate(event.name)
          )),
        },
      });
      ctx.dispatch(new templateActions.GetTemplateInfo(event.applicationId));
    } catch (error) {
      throwError(() => error);
    }
  }

  @Action(templateActions.PopulateModuleInstance)
  async populateInstances(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.PopulateModuleInstance
  ) {
    try {
      ctx.patchState({
        moduleInstances: !event.reset
          ? {
              ...(await lastValueFrom(
                this._templateService.populateModuleInstance(
                  event.applicationId,
                  event.masterAppId
                )
              )),
            }
          : null,
      });
    } catch (error) {
      console.log(error);
      throwError(() => error);
    }
  }

  @Action(templateActions.SaveTemplateEdit)
  async saveTemplateEdit(
    ctx: StateContext<TemplateStateModel>,
    event: templateActions.SaveTemplateEdit
  ) {
    try {
      const savedTemplate = await lastValueFrom(
        this._templateService.saveTemplateEdit(event.templateInfo)
      );
      console.log(savedTemplate);
      ctx.patchState({
        saveTemplateEdit: {
          ...savedTemplate,
        },
      });
    } catch (error) {
      console.log(error);
      throwError(() => error);
    }
  }
}
