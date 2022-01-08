import {
  ColorScheme,
  DesignScheme,
  ImageFile,
  Template,
  TemplateForm,
} from '../../../types';

export namespace TemplateAction {
  /**
   * Template List Page
   */
  export class GetTemplates {
    static readonly type = '[template-list] Get Sample App';
  }
  export class ConvertToTemplate {
    static readonly type = '[template-list] Convert To Template';
    constructor(public appCode: string) {}
  }
  export class GetAppInfo {
    static readonly type = '[template-list] Get App Info';
    constructor(public appCode: string) {}
  }
  export class CurrentTemplate {
    static readonly type = '[template-list] Current Template';
    constructor(public currentTemplate: Template) {}
  }

  /**
   * Template Design Page
   **/
  export class GetTemplateDesignData {
    static readonly type = '[template-design] Template Data';
    constructor(public applicationId: number, public title: string) {}
  }
  export class StoreTemplateDesign {
    static readonly type = '[template-design] Color-Schemes';
    constructor(public design: DesignScheme | null) {}
  }
  export class ImageUpload {
    static readonly type = '[template-design] Upload Template Image';
    constructor(public image: FormData, public current_row: ColorScheme) {}
  }
  export class UpdateColorScheme {
    static readonly type = '[template-design] Update ColorScheme';
    constructor(
      public color_scheme: ColorScheme,
      public currentImage: ImageFile | null,
      public mediaPathFlg: boolean
    ) {}
  }
  export class DeleteColorScheme {
    static readonly type = '[template-design] Delete ColorScheme';
    constructor(public color_scheme: ColorScheme) {}
  }
  export class SaveDesignTag {
    static readonly type = '[template-design] Save Design Tag';
    constructor(public tag: FormData) {}
  }
  export class SaveStyleSheet {
    static type = '[template-design] Save Template Style Sheet';
    constructor(public styleSheet: StyleSheet) {}
  }

  /**
   * Template Edit Page
   **/
  export class GetTemplateInfo {
    static readonly type = '[template-edit] Get Amenities';
    constructor(public applicationId: string) {}
  }

  export class ResetEditTemplate {
    static readonly type = '[template-edit] Reset Edit Template Info';
  }
  export class AddNewTemplate {
    static readonly type = '[template] Add New Template';
    constructor(public name: string, public applicationId: string) {}
  }
  export class PopulateModuleInstance {
    static readonly type = '[template-edit] Retrieve Module Instances';
    constructor(
      public applicationId?: string,
      public masterAppId?: string,
      public reset?: boolean
    ) {}
  }
  export class SaveTemplateEdit {
    static readonly type = '[template-edit] Save Template Edit Screen';
    constructor(public templateInfo: TemplateForm) {}
  }
  export class SaveTemplateEditSuccess {
    static readonly type = '[template-edit-success] Save Template Edit Success';
    constructor(public status: boolean) {}
  }
}
