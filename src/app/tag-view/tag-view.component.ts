import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlickerApi } from 'src/services/flickr/FlickrApi';
import { Tag } from 'src/services/flickr/photo.interface';
import {
  PhotoSearchRequest,
  PhotoSearchResponse,
} from 'src/services/flickr/search.interface';
import { SearchComponentFields } from '../SearchComponentFields';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.sass'],
})
export class TagViewComponent implements OnInit {
  constructor(
    private flickrService: FlickerApi,
    private route: ActivatedRoute
  ) {}

  tagID: string | null = null;

  photoResults: PhotoSearchResponse | null = null;


  /**
   * gets the tagID -which is a string- from the URL
   * and creates a new URL (.../tags/:tagID) where the 
   * relevant pictures are listed
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.tagID = paramMap.get('tagID');
    });
    console.log(this.tagID)

    if (!this.tagID) throw new Error('tagID null');

    this.flickrService
      .search({ tags: this.tagID })
      .subscribe((x) => (this.photoResults = x));
  }
}
