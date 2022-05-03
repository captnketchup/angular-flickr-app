import { Component, Input, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponentFields } from '../SearchComponentFields';

@Component({
  inputs: ["searchField"],
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  @Input() searchField = '';
  @Output() onSearch = new EventEmitter<SearchComponentFields>();

  addOnSearch(value: SearchComponentFields){
    this.onSearch.emit(value);
  }
  
  // search = {
  //   text: "input"
  // }

  constructor() { }

  ngOnInit(): void {
  }


  searchEvent(event?: MouseEvent){
    
  }
}
