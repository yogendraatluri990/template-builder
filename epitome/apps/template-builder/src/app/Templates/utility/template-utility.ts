import {
  designSchemeConstants,
  ModuleInstanceCode as _instanceCodes,
} from '../constants';
import {
  ColorScheme,
  DesignScheme,
  EditTemplate,
  ImageFile,
  InstanceDuplicate,
  ModuleInstance,
  Tag,
  TemplateForm,
} from '../types';

export class TemplateUtility {
  // -----------------------
  // @public Methods
  // -----------------------

  public static mapper(template: EditTemplate): TemplateForm {
    /** Edit Template Mapper */
    if (template) {
      console.log(
        template?.Templates?.find(
          (v) => v.TemplateId === template?.SelectedTemplate?.Template_ID
        )?.TemplateId
      );
      return {
        name: template.FormattedName,
        description: template.Description,
        active: template.Active,
        designTemplateId: template?.Templates?.find(
          (v) => v.TemplateId === template?.SelectedTemplate?.Template_ID
        )?.TemplateId,

        industry: 'Default',
        preferences: {
          IntroInstance: template.Preferences.IntroInstance,
          AboutUsInstance: template.Preferences.AboutUsInstance,
          FPSInstanceId: template.Preferences.FPSInstanceId,
          EditorialFeed: template.Preferences.EditorialFeed,
          Newsletter: template.Preferences.Newsletter,
          SocialNetworkFeed: template.Preferences.SocialNetworkFeed,
          VideoInstance: template.Preferences.VideoInstance,
          LogoHeight: template.Preferences.LogoHeight,
          LogoWidth: template.Preferences.LogoWidth,
          CustomPages: template.Preferences.CustomPages,
          mainZoneId: template.Preferences.mainZoneId,
          NewsPage: template.Preferences.NewsPage,
          globalSchedularId:
            template.POTDScheduleDetails.Pref.Indexer.PreferenceItemMatrixId,
        },
        title: template.Title,
        relationShipRole:
          template.Relationship_FLG?.toUpperCase() === 'M'
            ? 'Master'
            : template.Relationship_FLG?.toUpperCase() === 'S'
            ? 'Slave'
            : 'Undefined',
        masterId:
          template.Relationship_FLG?.toUpperCase() === 'S'
            ? template?.RelationshipInfo
              ? template.RelationshipInfo?.SelectedRlationshipInfo
                  ?.Application_ID
              : 0
            : 0,
        visibilty_flg: template.SelectedTemplate?.Visibility_Flg === '1',
      };
    }
  }
  public static getApplicationInfo(templateInfo: TemplateForm) {
    return {
      applicationId: templateInfo.applicationId,
      formattedTitle: templateInfo.title,
      description: templateInfo.description,
      active: templateInfo.active,
      relationship_FLG: templateInfo.relationShipRole === 'Master' ? 'M' : 'S',
      appTitle: templateInfo.name,
      masterApplicationId:
        templateInfo.relationShipRole === 'Master' ? 0 : templateInfo.masterId,
    };
  }
  public static getPreferences(templateInfo: TemplateForm) {
    return {
      applicationId: templateInfo.applicationId,
      marketsSelectedValue: templateInfo.industry ?? '',
      aboutUsInstance: templateInfo.preferences.AboutUsInstance ?? '',
      introInstance: templateInfo.preferences.IntroInstance ?? '',
      fpsInstance: templateInfo.preferences.FPSInstanceId ?? '',
      videoInstance: templateInfo.preferences.VideoInstance ?? '',
      editorialInstance: templateInfo.preferences.EditorialFeed ?? '',
      newsletterInstance: templateInfo.preferences.Newsletter ?? '',
      socialNetworkFeedInstance:
        templateInfo.preferences.SocialNetworkFeed ?? '',
      logoWidth: templateInfo.preferences.LogoWidth ?? '',
      logoHeight: templateInfo.preferences.LogoHeight ?? '',
      customPages: templateInfo.preferences.CustomPages ?? '',
      newsPage: templateInfo.preferences.NewsPage ?? '',
      mainZoneCode: templateInfo.preferences.mainZoneId ?? '',
      potdSelectedValue: templateInfo.preferences.globalSchedularId
        ? templateInfo.preferences.globalSchedularId
        : '',
    };
  }
  //----------------------------------------------------------------------------
  //@Populating Instances
  //----------------------------------------------------------------------------
  static isUnique<T>(arr: Array<T>, key: string): boolean {
    const uniques: Set<T> = new Set(arr.map((item) => item[key]));
    return [...uniques].length === arr.length;
  }
  static getDuplicates<T>(arr: Array<T>, key: string): Array<string> {
    const keys: string[] = arr.map((item) => item[key]);
    return keys.filter((k) => keys.indexOf(k) !== keys.lastIndexOf(k));
  }

  static getDuplicateInstances(
    moduleInstances: ModuleInstance[]
  ): InstanceDuplicate {
    const duplicateInstances: InstanceDuplicate = {
      instances: [],
      nonInstances: [],
    };
    moduleInstances.map((v) =>
      v.ModuleCode === _instanceCodes.IntroText
        ? v.ModuleName.toLowerCase().includes('about')
          ? (v.ModuleCode = _instanceCodes.AboutUsText)
          : null
        : null
    );

    if (!this.isUnique<ModuleInstance>(moduleInstances, 'ModuleCode')) {
      const duplicateKeys = [
        ...this.getDuplicates<ModuleInstance>(moduleInstances, 'ModuleCode'),
      ];

      for (let i = 0; i <= moduleInstances.length; i++) {
        for (let j = 0; j <= duplicateKeys.length; j++) {
          if (
            moduleInstances?.[i] &&
            duplicateKeys?.[j] &&
            moduleInstances[i]?.ModuleCode === duplicateKeys?.[j]
          ) {
            let currentCount = this.getCurrentCount(
              moduleInstances[i]?.ModuleCode,
              duplicateKeys
            );
            const moduleCode = moduleInstances[i]?.ModuleCode;
            const zones = [];
            while (currentCount > 0) {
              if (moduleCode === duplicateKeys[j]) {
                zones.push({
                  ZoneId: moduleInstances[i]?.ZoneId,
                  InstanceId: moduleInstances[i]?.Id,
                  IsPervasive: moduleInstances[i]?.IsPervasive ? 'Y' : 'N',
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
        if (!moduleInstances.some((v) => v.ModuleCode === _instanceCodes[k])) {
          duplicateInstances.nonInstances.push({
            ModuleCode: _instanceCodes[k],
            ModuleName: k,
          });
        }
      });
    }
    return duplicateInstances;
  }

  static getCurrentCount<T>(moduleCode: T, arr: Array<T>): number {
    const count_instance = new Map(
      [...new Set(arr)].map((x) => [x, arr.filter((y) => y === x).length])
    );
    return count_instance.get(moduleCode);
  }
  //----------------------------------------------------
  // Parsing Image with colors Array
  //----------------------------------------------------
  static colorSchemeImageParser(
    color_scheme: ColorScheme,
    currentImage: ImageFile
  ): Array<ColorScheme> {
    console.log('current Image File', currentImage);
    console.log('current row', color_scheme);
    if (currentImage)
      return [
        {
          Id: color_scheme.Id,
          Name: color_scheme.Name,
          TemplateId: color_scheme.TemplateId,
          DesignColor: color_scheme.DesignColor,
          MediaId:
            color_scheme.MediaId === currentImage.Id
              ? color_scheme.MediaId
              : currentImage.Id,
          CSS: color_scheme.CSS,
          MediaPath: color_scheme.MediaPath,
          DesignTags: color_scheme.DesignTags,
        },
      ];
    return [{ ...color_scheme }];
  }
  //--------------------------------------------------------------------------
  // Parsing the design scheme to get the updated colors array
  //--------------------------------------------------------------------------
  static designSchemeColorsParser(
    design_scheme: DesignScheme,
    color_scheme: ColorScheme
  ): DesignScheme {
    const temp_colors: Array<ColorScheme> = design_scheme.ColorScheme.map(
      (v) => {
        if (
          parseInt(v.Id, 0) === parseInt(color_scheme.Id, 0) ||
          v.Name === color_scheme.Name
        ) {
          return color_scheme;
        }
        return v;
      }
    );
    design_scheme.ColorScheme = temp_colors;
    return design_scheme;
  }
  //--------------------------------------------------------------------------
  // Mapping the default designScheme
  //--------------------------------------------------------------------------
  static designSchemeDefaultMapper(
    color_scheme: Array<ColorScheme>
  ): DesignScheme {
    const design_scheme: DesignScheme = {
      ...designSchemeConstants,
      ...color_scheme,
    };
    return design_scheme;
  }

  //-------------------------------------------------------------------------
  // Removing color from the designScheme.Colors Array
  //-------------------------------------------------------------------------
  static designSchemeSpliceMapper(
    current_row: ColorScheme,
    designScheme: DesignScheme
  ): DesignScheme {
    const tempColors = [...designScheme.ColorScheme];
    tempColors.splice(
      tempColors.findIndex(
        (v) => v.Id === current_row.Id || v.Name === current_row.Name
      ),
      1
    );
    designScheme.ColorScheme = [...tempColors];
    return designScheme;
  }
  //----------------------------------------------------------------
  // Saving Design Tag
  //----------------------------------------------------------------
  static saveDesignTagParser(designTag: Tag): FormData {
    const formData = new FormData();
    formData.set('tagCode', designTag.tagCode);
    formData.append('tagType', designTag.tagType);
    formData.append('tagDesc', designTag.tagDesc);
    formData.append('defaultValue', designTag.defaultValue);
    return formData;
  }

  //-------------------------------------------------------------
  // Parsing primary color ColorScheme
  //-------------------------------------------------------------
  static parsingColorScheme(
    current_color: ColorScheme,
    colorScheme: Array<ColorScheme>,
    designName?: string
  ): ColorScheme {
    return Object.assign(
      {},
      ...colorScheme
        .map((v) => {
          if (v.Id === current_color.Id && v.Name === current_color.Name) {
            // tslint:disable-next-line: no-unused-expression
            designName ? (v.Name = designName) : null;
            v.DesignColor = v.DesignTags.map((k) => {
              if (k.Name.toLowerCase().indexOf('primary') > -1) return k.Value;
            })
              .filter((j) => j)
              .toString();
            return v;
          }
        })
        .filter((v) => v)
    );
  }
}
