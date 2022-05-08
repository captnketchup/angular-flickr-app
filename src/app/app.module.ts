import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GridViewComponent } from './grid-view/grid-view.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { MatIconModule } from '@angular/material/icon';
import { TagViewComponent } from './tag-view/tag-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    GridViewComponent,
    PhotoViewComponent,
    PhotoListComponent,
    TagViewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
