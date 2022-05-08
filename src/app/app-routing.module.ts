import { NgModule } from '@angular/core';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './../app/app.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { TagViewComponent } from './tag-view/tag-view.component';

const routes: Routes = [
  {path: '', component: PhotoListComponent},
  {path: 'photo/:photoID', component: PhotoViewComponent},
  {path: 'tag/:tagID', component: TagViewComponent}
]

export const ROUTE_PROVIDER = [provideRoutes(routes)];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
