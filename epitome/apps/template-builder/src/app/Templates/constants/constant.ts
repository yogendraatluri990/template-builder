import { DesignScheme, TagBackground } from '../types';
export namespace Constants {
  export const displayColumns = [
    'AppCode',
    'AppOwner',
    'Title',
    'PackageName',
    'Template',
    'Status',
    'Visibility',
    'Actions',
  ];
  export const pageSizeOptions = [10, 15, 25, 50, 100];
}

export const designSchemeConstants: DesignScheme = {
  AppCode: '',
  ApplicationId: 0,
  Name: '',
  Id: 0,
  Template_Data: '',
  TemplatePreview_Data: '',
  ColorScheme: [],
};

export const designTags: Array<TagBackground> = [
  {
    name: 'COLOR',
    value: 'COLR',
  },
  {
    name: 'Background Image',
    value: 'BGIG',
  },
  {
    name: 'Font Definition',
    value: 'FONT',
  },
];

export enum ModuleInstanceCode {
  ProductCollections = 'PRDATU',
  IntroText = 'ESCNTE',
  PromotionalNewsFeed = 'ECFEED',
  HomePageVideo = 'VIDEOM',
  NewsLetterSignUp = 'NEWLSU',
  SocialNetworkFeeds = 'SOFEED',
  AboutUsText = 'ESCNTE_ABT',
}

export const instanceNames: { [key: string]: string } = {
  PRDATU: 'Product Collections',
  ESCNTE: 'Intro Text',
  ECFEED: 'News Feed',
  VIDEOM: 'Home Page Video',
  NEWLSU: 'News Letter SignUp',
  SOFEED: 'Social Network Feed',
  ESCNTE_ABT: 'About Us Text',
};
export const instanceControllerNames: { [key: string]: string } = {
  PRDATU: 'FPSInstanceId',
  ESCNTE: 'IntroInstance',
  ECFEED: 'EditorialFeed',
  VIDEOM: 'VideoInstance',
  NEWLSU: 'NewsLetter',
  SOFEED: 'SocialNetworkFeed',
  ESCNTE_ABT: 'AboutUsInstance',
};
