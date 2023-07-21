import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGames } from '../interfaces/IGames.interface';
import { IGame } from '../interfaces/IGame.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public headers =  new HttpHeaders({ 
    'X-RapidAPI-Key': environment.XRapidAPIKey,
    'X-RapidAPI-Host': environment.XRapidAPIHost
  });

  constructor(private http: HttpClient) {}

  getGames( params:any ) : Observable<IGames[]> 
  {
    const queryParams = this.getQueryParams(params);

    return this.http.get<IGames[]>(`${environment.API_URL}/games${queryParams}`,{ headers: this.headers }).pipe(
      map((response) => response.filter(item => item.title?.toLowerCase().indexOf(params.title.toLowerCase()) !== -1))
    );
  }

  getGame( id: string ): Observable<IGame> 
  {
    return this.http.get<IGame>(`${environment.API_URL}/game?id=${id}`,{ headers: this.headers });
  }

  getQueryParams(params: any): string
  {

    if(params.platform == '' && params.category == '') return '';

    const filter = {
      platform: params.platform,
      category: params.category
    }

    const query = Object.keys(filter)
      .map((clave) =>  (params[clave] != '' )? `${encodeURIComponent(clave)}=${encodeURIComponent(params[clave])}`: '')
      .filter((valor) => {
        return valor !== null && valor !== undefined && valor !== '' && (!Array.isArray(valor) || valor.length > 0);
      })
      .join('&');
      
    return `?${query}`;
    
  }

}
