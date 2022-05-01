import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiKey } from './../constants';
import { BaseRequest, BaseRequestMethodEnum } from './base.interface';
import type {
  PhotoSearchRequest,
  PhotoSearchResponse,
} from './search.interface';

@Injectable()
export class FlickerApi {
  apiKey: string;
  baseRequest: BaseRequest;

  constructor(private http: HttpClient) {
    if (apiKey === null || apiKey === '') {
      throw new Error('apiKey is null');
    }

    this.apiKey = apiKey;
    this.baseRequest = {
      api_key: this.apiKey,
      format: 'json',
      method: BaseRequestMethodEnum.photoSearch,
      nojsoncallback: 1,
    };
  }

  // by using angular's http service the request is async
  public search(
    options: BaseRequest,
    psr: PhotoSearchRequest
  ): Observable<PhotoSearchResponse> {
    const baseUrl = this.createBaseUrl(options);
    const url = this.completeSearchUrl(baseUrl, psr);
    return this.http.get<PhotoSearchResponse>(url.toString());
  }

  // creates the base url which is always the same
  private createBaseUrl(options: BaseRequest): URL {
    let url = new URL('https://www.flickr.com/services/rest/');
    url.searchParams.append('method', options.method);
    url.searchParams.append('api_key', options.api_key);
    url.searchParams.append('format', options.format);
    url.searchParams.append('nojsoncallback', String(options.nojsoncallback));
    return url;
  }

  // completes the previously built url with additional search parameters
  private completeSearchUrl(base: URL, psr: PhotoSearchRequest): URL {
    if (psr.text !== undefined) base.searchParams.append('text', psr.text);
    if (psr.tags !== undefined)
      // using the spread operator [...] the tags are joined by commas (they are comma-delimited src:documentation)
      base.searchParams.append('tags', [...psr.tags].join(','));
    if (psr.user_id !== undefined)
      base.searchParams.append('user_id', psr.user_id);
    return base;
  }
}
