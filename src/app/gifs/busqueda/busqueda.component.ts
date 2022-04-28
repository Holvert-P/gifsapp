import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent {
  @ViewChild('txtsearch') txtsearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}
  search() {
    const value = this.txtsearch.nativeElement.value;
    if (!value) return;
    this.gifsService.searchGifs(value);
    this.txtsearch.nativeElement.value = '';
  }
}
