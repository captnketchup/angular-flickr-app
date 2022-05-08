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

  addOnSearch() {
    this.onSearch.emit(this.searchFields);
  }

  constructor() {}

  ngOnInit(): void {}

  keyPress(event: KeyboardEvent) {
    const key = event.key;
    if (key == 'Enter') {
      this.addOnSearch();
    }
  }
}
