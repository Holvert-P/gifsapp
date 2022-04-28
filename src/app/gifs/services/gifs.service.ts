import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[] = [];
  private APIKey: string = 'vPHJuxs6s0iUQPktiqIMzckXjpqVFWrM';
  private URL: string = 'https://api.giphy.com/v1/gifs';
  public data: Gif[] = [];
  public limit: number = 10;

  get history() {
    return [...this._history];
  }

  // Buscar gifs
  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    // verificar si ya se busco
    if (this._history.includes(query)) {
      // si ya se busco, eliminar de historial y agregar al principio
      let i = this._history.indexOf(query);
      this._history.splice(i, 1);
    }
    this._history.unshift(query);
    this._history = this._history.splice(0, 10);

    // guardar en localStorage el historial
    localStorage.setItem('history', JSON.stringify(this._history));
    const params = new HttpParams()
      .set('api_key', this.APIKey)
      .set('q', query)
      .set('limit', this.limit.toString())
      .set('lang', 'es');

    this.http
      .get<SearchGifsResponse>(`${this.URL}/search?`, { params })
      .subscribe(({ data }) => {
        const optimizedData = data.map(({ images, title }) => ({
          images: { downsized_large: { url: images.downsized_large.url } },
          title,
        }));
        this.data = optimizedData;

        // guardar en localStorage los datos
        localStorage.setItem('data', JSON.stringify(this.data));
      });
  }
  // end::searchGifs[]
  constructor(private http: HttpClient) {
    // cargar de localStorage
    if (localStorage.getItem('history')) {
      this._history = JSON.parse(localStorage.getItem('history')!) || [];
    }
    if (localStorage.getItem('data')) {
      this.data = JSON.parse(localStorage.getItem('data')!) || [];
    }
  }
}
