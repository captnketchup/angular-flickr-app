import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { BaseRequest, BaseRequestMethodEnum } from './base.interface';
import type {
  PhotoMetaRequest,
  PhotoSearchRequest,
  PhotoSearchResponse,
} from './search.interface';
import { PhotoMeta } from './photo.interface';

// TODO don't exactly know what this decorator does but without this the app doesn't work 🥺👉👈
@Injectable({
  providedIn: 'root',
})
export class FlickerApi {
  apiKey: string;
  baseRequest: BaseRequest;

  constructor(private http: HttpClient) {
    if (!environment.apiKey) {
      throw new Error('apiKey is null');
    }

    this.apiKey = environment.apiKey;
    this.baseRequest = {
      api_key: this.apiKey,
      format: 'json',
      nojsoncallback: 1,
    };
  }

  // by using angular's http service (observable) the request is async
  public search(psr: PhotoSearchRequest): Observable<PhotoSearchResponse> {
    const baseUrl = this.createBaseUrl({
      ...this.baseRequest,
      method: BaseRequestMethodEnum.photoSearch,
    } as BaseRequest);
    const url = this.completeSearchUrl(baseUrl, psr);
    console.log(url.toString());
    return this.http.get<PhotoSearchResponse>(url.toString());
  }

  public getPhotoInfo(pmr: PhotoMetaRequest): Observable<PhotoMeta> {
    const baseUrl = this.createBaseUrl({
      ...this.baseRequest,
      method: BaseRequestMethodEnum.getInfo,
    } as BaseRequest);
    baseUrl.searchParams.append('photo_id', pmr.id);
    const url = baseUrl;
    return this.http.get<PhotoMeta>(url.toString());
  }

  // creates the base url which is always the same
  private createBaseUrl(options: BaseRequest): URL {
    const { method, api_key, format, nojsoncallback } = options;
    if (!method) throw new Error('search Api Method is undefined');
    let url = new URL('https://www.flickr.com/services/rest/');
    url.searchParams.append('method', method);
    url.searchParams.append('api_key', api_key);
    url.searchParams.append('format', format);
    url.searchParams.append('nojsoncallback', String(nojsoncallback));
    return url;
  }

  // completes the previously built url with additional search parameters: checks which search params are
  // given and then builds those into the url
  private completeSearchUrl(base: URL, psr: PhotoSearchRequest): URL {
    if (psr.text) base.searchParams.append('text', psr.text);
    if (psr.tags)
      // checks whether tags is a string or string[] and then joins them if need be
      base.searchParams.append('tags', typeof psr.tags === "string" ? psr.tags : psr.tags.join(','));
    if (psr.user_id) base.searchParams.append('user_id', psr.user_id);
    base.searchParams.append('sort', "relevance");
    return base;
  }
}
