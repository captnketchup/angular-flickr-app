import { Component, Input, OnInit } from '@angular/core';
import { Photo, PhotoSearchResponse } from 'src/services/flickr/search.interface';


@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.sass']
})
export class GridViewComponent implements OnInit {

  constructor() { }

  @Input() photoResult: PhotoSearchResponse | null = null;

  ngOnInit(): void {
  }
  
  /**
   * 
   * @param image 
   * @returns a URL in the likeness of this:
   * https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg
   * src: https://www.flickr.com/services/api/misc.urls.html
   */
  makeImageUrl(image: Photo){
    return `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
  }
  

}
