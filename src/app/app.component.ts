import { Component, Input } from '@angular/core';
import { PhotoSearchRequest, PhotoSearchResponse } from 'src/services/flickr/search.interface';
import { SearchComponent } from './search/index';
import { SearchComponentFields } from './SearchComponentFields';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public title = 'angular-flickr';

}

