import { EditTemplate } from './edit-template';
import { ImageFile } from './image-file';

export interface ConvertTemplateMessage {
  Message: string;
}

export interface Template {
  Id?: number;
  AppCode?: string;
  AppOwner?: number;
  AppName?: string;
  Title?: string;
  FormattedTitle?: string;
  FormattedTitleId?: number;
  PackageName?: string;
  IsVisible?: boolean;
  Active?: string;
  ApplicationId?: number;
  TemplateId?: number;
  TemplateName?: string;
  RelationshipFlag?: string;
  CreateDate?: string;
}

export interface Templates {
  Template: Template;
  EditTemplate: EditTemplate;
  ConvertToTemplate: ConvertTemplateMessage;
  Image: ImageFile;
}
