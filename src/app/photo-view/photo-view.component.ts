import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseRequestMethodEnum } from 'src/services/flickr/base.interface';
import { FlickerApi } from 'src/services/flickr/FlickrApi';
import { Photo, PhotoMeta } from 'src/services/flickr/photo.interface';
import {
  PhotoSearchRequest,
  PhotoSearchResponse,
  PhotoMetaRequest,
} from 'src/services/flickr/search.interface';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.sass'],
})
export class PhotoViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private flickrService: FlickerApi,
  ) {}

  photoID: string | null = null;
  pageContent: Photo | null = null;
  photoResponse: PhotoMeta | null = null;
  
  
  /**
   *  gets photoID from url (.../photo/:photoID)
   *  https://angular.io/guide/router#accessing-query-parameters-and-fragments
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.photoID = paramMap.get('photoID');
    });

    if (this.photoID === null) throw new Error('invalid image num'); // TODO route back to main page

    this.flickrService.getPhotoInfo({ id: this.photoID }).subscribe((x) => {
      this.photoResponse = x;
      this.pageContent = x.photo;
      console.log(x);
    });
  }

  /**
   * 
   * @param pageContent - the current content of the page
   * @returns the url which leads to the picture
   */
  makeImageUrl(pageContent: Photo | null) {
    if (!pageContent) throw new Error('photo object null');
    return `https://live.staticflickr.com/${pageContent.server}/${pageContent.id}_${pageContent.secret}.jpg`;
  }

  /**
   * Navigates back from the stack
   */
  goBack(){
    window.history.back()
  }
}
