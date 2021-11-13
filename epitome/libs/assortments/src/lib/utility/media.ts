export class Media {
  // ----------------------
  // @public static method
  // ---------------------
  public static fileValidation(media: File): FormData | Error {
    if (typeof media !== 'undefined' && media) {
      const fileName: string = media.name,
        fileSize: number = parseFloat((media.size / (1024 * 1024)).toFixed(2)),
        fileUpload: File = media,
        formData: FormData = new FormData();
      if (
        (fileName.includes('.png') ||
          fileName.includes('.jpg') ||
          fileName.includes('.jpeg') ||
          fileName.includes('.PNG') ||
          fileName.includes('.JPG') ||
          fileName.includes('.JPEG')) &&
        fileSize < 2
      ) {
        formData.set('MediaType', 'GNRL');
        formData.append('entities', fileUpload, fileUpload.name);
        return formData;
      } else {
        const err: Error = {
          message: `Please upload a valid image type and image size should be less then 2MB`,
          name: 'Incorrect file',
          stack: 'Media-Path',
        };
        return err;
      }
    }
  }
  public static getMediaPath<T>(
    mediaObject: Array<T>,
    mediaName: string,
    MediaPath: string,
    smartLinkUrl: string,
    cdn_Path: string,
    MediaPathFlg: boolean
  ): Array<T> {
    const mediaCollection: Array<T> = [];
    if (MediaPathFlg) {
      mediaObject?.forEach((v, k) => {
        if (v['UseCustomMedia'] === true || v['IsCustomImage'] === 'Y') {
          v['MediaPath'] = `${smartLinkUrl}+${MediaPath}.json`;
          mediaCollection.push(v);
        } else {
          let media_path: string;
          const mediaResponsePath: string = v.hasOwnProperty('MediaId')
            ? v['MediaId'].toString()
            : '';
          if (mediaResponsePath.length > 4) {
            media_path = mediaResponsePath.substring(
              0,
              mediaResponsePath.length - 4
            );
            media_path = media_path + '0000';
            if (!(v['MediaId'].toString().indexOf('12345') > -1))
              v[
                'MediaPath'
              ] = `${cdn_Path}${media_path}/${mediaResponsePath}/${mediaName}`;
            mediaCollection.push(v);
          } else {
            if (mediaResponsePath.length > 0 && mediaResponsePath.length < 4) {
              media_path = '10000';
              if (!(v['MediaId'].indexOf('12345') > -1))
                v[
                  'MediaPath'
                ] = `${cdn_Path}${media_path}/${mediaResponsePath}.jpg`;
              mediaCollection.push(v);
            } else {
              console.log('not possible');
            }
          }
        }
      });
      return mediaCollection;
    } else {
      return mediaObject;
    }
  }
}
