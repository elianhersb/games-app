import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  header: any[] =[
    {
      title:'Juegos',
      url:'/games'
    },
  ]

  constructor() { }
}
