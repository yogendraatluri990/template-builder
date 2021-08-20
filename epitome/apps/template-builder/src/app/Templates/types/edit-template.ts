interface Pages {
  _instances: Array<string> | null;
  _removeInstances: [];
  _pageData: string;
  _instanceMetaData: {};
  _preferences: null;
}

interface PageSet {
  Pages: Array<Pages>;
  Count: number;
}
interface AppData {
  _catalog: string | null;
  _pageSet: PageSet;
  _metaData: string | null;
  _selectedPage: number;
  _applicationData: string;
  _memberTypes: Array<string> | null;
  _memberStatuses: Array<string> | null;
  _domains: Array<string> | null;
  _preferences: Array<string> | null;
}
interface Zones {
  Indexer: {
    Id: number;
    LayoutId: number;
    ZoneId: string;
    Index: number | null;
    AllowedModuleTypes: string;
    Width: string;
  };
}
interface Templates {
  TemplateId: number;
  TemplateName: string;
}



interface SampleAppRecord {
  Indexer: {
    ApplicationId: number;
    HelpId: number;
    HelpTopicId: number;
    SuiteId: number;
    SuiteName: string;
    ApplicationCode: string;
    ApplicationName: string;
    ApplicationTitle: string;
    Description: string;
    StartDate: string;
    EndDate: string;
    ApplicationVersion: string;
    StatusCode: string;
    IconFile: string;
    AppRank: number;
    Keywords: string;
    LogoFile: string;
    DefaultLanguage: string;
    DefaultThemeId: number;
    LoginPage: string;
    RenderingPage: string;
    BrowserTarget: string;
    ExternalUrl: string;
    IsLicenseRequired: boolean;
    IsDefault: number;
    ParentId: number;
    OwnerEntityId: number;
    OwnerEntityType: string;
    CreateDate: string;
    UpdateDate: string;
    UpdateSource: string;
    ApplicationSecret: string;
    AppOfferGroupCD: string;
    ObjectState: number;
  };
}

interface POTDScheduleDetails {
  POTDScheduleList: { [key: string]: string };
  Pref: {
    Indexer: {
      PreferenceItemName: string;
      PreferenceItemId: number;
      DefaultValue: string;
      SystemAxisCode: string;
      SystemAxisValue: number;
      BusinessAxisCode: string;
      BusinessAxisValue: number;
      SequenceNumber: number;
      PreferenceItemMatrixId: number;
      PreferenceItemValueId: number;
      CorporateCompanyId: number;
      CompanyId: number;
      SignonId: number;
      SignonProfileId: number;
      PreferenceMatrixValue: string;
      IsOverrideAllowed: string;
      IsASIBusinessPreference: string;
      CanBeAssigned: number;
      Id: number;
      ExclusionList: string;
      MatrixId: string;
    };
  };
}
interface MarketGroupDataIndexer {
  Indexer: {
    Text: string;
    Value: string;
    Selected: number;
  };
}
interface MarketGroupOrderData {
  Text: string;
  Value: string;
}
interface MarketGroupDetails {
  Data: Array<MarketGroupDataIndexer>;
  OrderedData: Array<MarketGroupOrderData>;
  MarkedGroup: {};
}
interface SelectedTemplate {
  ApplicationTemplate_ID: number;
  Application_ID: number;
  DataObject: {
    Indexer: {
      ApplicationTemplate_ID: number;
      ApplicationVersion_ID: number;
      Application_ID: number;
      Template_ID: number;
      Visibility_Flg: string;
    };
  };
  Exceptions: [];
  Template_ID: number;
  Visibility_Flg: string;
}

interface RelationshipInfoData {
  /** Information for both Master Data & Ordered Data */
  Application_ID: number;
  ApplicationTitle: string;
}

interface RelationshipInfo {
  MasterData: Array<RelationshipInfoData>;
  OrderedData: Array<RelationshipInfo>;
  SelectedRlationshipInfo: RelationshipInfoData; // Spelling for this property is wrong in api Object.
}
interface Instances{
  ModuleCode?: string;
  Zones?: Array<ModuleZones>;
}
interface NonInstances {
  ModuleName?: string;
  ModuleCode?: string;
}
export interface ModuleZones {  
    ZoneId: string,
    IsPervasive: string,
    InstanceId: number  
}

export interface InstanceDuplicate {
    instances: Array<Instances>;
    nonInstances: Array<NonInstances>;
  }
export interface ModuleInstance {
  Id: number;
  IsPervasive: boolean;
  ModuleCode: string;
  ModuleName: string;
  ZoneId: string;
  NonInstances?: [{
    ModuleCode: number;
    ModuleName: string;
  }];  
}
export interface Preferences {
  AppData?: AppData;
  AboutUsInstance: string;
  IntroInstance: string;
  FPSInstanceId: string;
  EditorialFeed: string;
  VideoInstance: string;
  Newsletter: string;
  SocialNetworkFeed: string;
  LogoWidth: string;
  LogoHeight: string;
  CustomPages: string;
  NewsPage: string;
  mainZoneId: string;
  zones?: Array<Zones>;
}

export interface TemplateForm {
  applicationId?: number;
  name: string;
  designTemplateId: number;
  relationShipRole: string;
  relationShipId?: number;
  masterId: number;
  industry: string;
  active: boolean;
  visibilty_flg: boolean;
  preferences: {
    AboutUsInstance: string;
    IntroInstance: string;
    FPSInstanceId: string;
    EditorialFeed: string;
    VideoInstance: string;
    Newsletter: string;
    SocialNetworkFeed: string;
    LogoWidth: string;
    LogoHeight: string;
    CustomPages: string;
    NewsPage: string;
    mainZoneId: string;
    globalSchedularId: number;
  };
  title: string;
  description: string;
}

export interface EditTemplate {
  Preferences: Preferences;
  Templates: Array<Templates>;
  SelectedTemplate: SelectedTemplate;
  Title: string;
  Description: string;
  Active: boolean;
  SampleAppRecord: SampleAppRecord;
  FormattedName: string;
  RelationshipInfo: RelationshipInfo;
  Relationship_FLG: string;
  POTDScheduleDetails: POTDScheduleDetails;
  MarketGroupDetails: MarketGroupDetails;
}
