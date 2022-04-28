import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  get history() {
    return this.gifsService.history;
  }

  searchGifs(query: string) {
    this.gifsService.searchGifs(query);
  }
  constructor(private gifsService: GifsService) {}
}
