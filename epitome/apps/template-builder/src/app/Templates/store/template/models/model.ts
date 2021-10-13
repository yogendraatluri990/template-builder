import {
  Template,
  ConvertTemplateMessage,
  ColorScheme,
  EditTemplate,  
  AppInfo,
  ImageFile,
  DesignScheme,
  SavedResponse,
  StyleSheet,
  InstanceDuplicate
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
  savedResponse: SavedResponse
  styleSheet: StyleSheet,
  moduleInstances: InstanceDuplicate,
  saveTemplateEdit?: any;
}
