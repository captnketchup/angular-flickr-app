export interface BaseRequest {
  method?: BaseRequestMethodEnum;
  api_key: string;
  format: 'json';
  nojsoncallback: 1;
}

export enum BaseRequestMethodEnum {
  photoSearch = 'flickr.photos.search',
  getInfo = 'flickr.photos.getInfo'
}
