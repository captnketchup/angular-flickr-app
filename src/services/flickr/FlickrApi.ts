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

  /**
   * 
   * @param psr - The 3 search params coupled in an interface (text, tags, ownerid)
   * @returns the filled Observable<PhotoSearchResponse>
   * by using angular's http service (observable) the request is async
   */
  public search(psr: PhotoSearchRequest): Observable<PhotoSearchResponse> {
    const baseUrl = this.createBaseUrl({
      ...this.baseRequest,
      method: BaseRequestMethodEnum.photoSearch,
    } as BaseRequest);
    const url = this.completeSearchUrl(baseUrl, psr);
    console.log(url.toString());
    return this.http.get<PhotoSearchResponse>(url.toString());
  }

  /**
   * 
   * @param pmr - the ID of a photo to fetch information for
   * @returns - the filled Observable<PhotoMeta>
   * bye using Observable<T> the http call is async
   */
  public getPhotoInfo(pmr: PhotoMetaRequest): Observable<PhotoMeta> {
    const baseUrl = this.createBaseUrl({
      ...this.baseRequest,
      method: BaseRequestMethodEnum.getInfo,
    } as BaseRequest);
    baseUrl.searchParams.append('photo_id', pmr.id);
    const url = baseUrl;
    return this.http.get<PhotoMeta>(url.toString());
  }

  /**
   * 
   * @param options the options for the api call
   * @returns the base url, which is always the same
   */
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


  /**
   * 
   * @param base the previously built base URL
   * @param psr the search parameters (text, tags or ownerid)
   * @returns the complete search URL to which the search parameters were added
   */
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
