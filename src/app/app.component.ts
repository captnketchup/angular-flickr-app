import { Component, Input } from '@angular/core';
import { FlickerApi } from 'src/services/flickr/FlickrApi';
import { PhotoSearchRequest, PhotoSearchResponse } from 'src/services/flickr/search.interface';
import { SearchComponent } from './search/index';
import { SearchComponentFields } from './SearchComponentFields';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(private flickrService: FlickerApi){}

  public title = 'angular-flickr';
  public appSearchField: SearchComponentFields = {text: '', owner: '', tag: ''};
  public photoResults: PhotoSearchResponse | null = null;

  searchText(newSearch: SearchComponentFields){
    this.appSearchField = newSearch;
    const psr: PhotoSearchRequest = {
      text: this.appSearchField.text,
      user_id: this.appSearchField.owner,
      tags: this.appSearchField.tag.length > 0 ? this.appSearchField.tag.split(' ') : this.appSearchField.tag
    }
      this.flickrService.search(this.flickrService.baseRequest, psr).subscribe(x => {
        this.photoResults = x;
        console.log(x)
      });  // have to subscribe to return of observable to get the data inside
      
      
  }
}

