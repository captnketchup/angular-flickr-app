import { Component, OnInit } from '@angular/core';
import {
  PhotoSearchRequest,
  PhotoSearchResponse,
} from 'src/services/flickr/search.interface';
import { SearchComponentFields } from '../SearchComponentFields';
import { FlickerApi } from 'src/services/flickr/FlickrApi';
import { BaseRequestMethodEnum } from 'src/services/flickr/base.interface';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.sass'],
})
export class PhotoListComponent implements OnInit {
  constructor(private flickrService: FlickerApi) {}

  ngOnInit(): void {}
  public appSearchField: SearchComponentFields = {
    text: '',
    owner: '',
    tag: '',
  };
  public photoResults: PhotoSearchResponse | null = null;

  searchText(newSearch: SearchComponentFields) {
    this.appSearchField = newSearch;
    const psr: PhotoSearchRequest = {
      text: this.appSearchField.text,
      user_id: this.appSearchField.owner,
      tags:
        this.appSearchField.tag.length > 0
          ? this.appSearchField.tag.split(' ')
          : this.appSearchField.tag,
    };
    this.flickrService
      .search(psr)
      .subscribe((x) => {
        this.photoResults = x;
        console.log(x);
      }); // have to subscribe to return of observable to get the data inside
  }
}
