import {
  AppInfo,
  ColorScheme,
  ConvertTemplateMessage,
  DesignScheme,
  EditTemplate,
  ImageFile,
  InstanceDuplicate,
  SavedResponse,
  Template,
  TemplateStyleSheet,
} from '../../../types';

export interface TemplateStateModel {
  templateAppInfo?: AppInfo | null;
  templates: Array<Template>;
  convertTemplate: ConvertTemplateMessage;
  currentTemplate?: Template;
  templateDesign: DesignScheme | null;
  editTemplate?: EditTemplate | null;
  templateImage?: ImageFile | null;
  currentColorScheme?: ColorScheme | null;
  savedResponse: SavedResponse;
  templateStyleSheet: TemplateStyleSheet;
  moduleInstances: InstanceDuplicate;
  templateEditStatus?: boolean;
}
