import {
  Component,
  Input,
  NgModule,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponentFields } from '../SearchComponentFields';

@Component({
  inputs: ['searchField'],
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  searchFields: SearchComponentFields = {
    text: '',
    tag: '',
    owner: '',
  };
  @Output() onSearch = new EventEmitter<SearchComponentFields>();

  /**
   * an event emitter that provides the fields' data to the parent component
   */
  addOnSearch() {
    this.onSearch.emit(this.searchFields);
  }

  constructor() {}

  ngOnInit(): void {}

  /**
   * 
   * @param event - the keyboard event which is typechecked wheter it's ENTER
   * handles event pressing so the user doesn't have to
   * click the search button on a mouse and keyboard system 
   */
  keyPress(event: KeyboardEvent) {
    const key = event.key;
    if (key == 'Enter') {
      this.addOnSearch();
    }
  }
}
