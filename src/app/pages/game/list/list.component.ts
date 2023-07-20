import { Component, OnInit } from '@angular/core';
import { IGames } from 'src/app/interfaces/IGames.interface';
import { GameService } from 'src/app/services/game.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: []
})
export class ListComponent implements OnInit  {
  public games: IGames[] = [];
  public loading: Boolean = true;
  public pageSize: number = 8; 
  public currentPage: number = 1;

  public platforms: String[] = [
    "pc", 
    "browser",
  ];

  public categories: String[] = [
    "mmorpg",
    "shooter",
    "strategy",
    "moba",
    "racing",
    "sports",
    "social",
    "sandbox",
    "open-world",
    "survival",
    "pvp",
    "pve",
    "pixel",
    "voxel",
    "zombie",
    "turn-based",
    "first-person",
    "third-Person",
    "top-down",
    "tank",
    "space",
    "sailing",
    "side-scroller",
    "superhero",
    "permadeath",
    "card",
    "battle-royale",
    "mmo",
    "mmofps",
    "mmotps",
    "3d",
    "2d",
    "anime",
    "fantasy",
    "sci-fi",
    "fighting",
    "action-rpg",
    "action",
    "military",
    "martial-arts",
    "flight",
    "low-spec",
    "tower-defense",
    "horror",
    "mmorts"
  ];

  public filters = this.fb.group({
    title: [''],
    platform:[''],
    category:['']
  });



  constructor(private gameService: GameService, private fb: FormBuilder){}
  
  ngOnInit(){
    window.scrollTo(0, 0);
    this.getListGame();
  }

  getListGame() : void
  {
    this.setLoading(true);
    
    this.gameService.getGames(this.filters.value).subscribe(
      (response: IGames[] ) => {
        this.games = response;
        this.setLoading(false);
        this.currentPage = 1;
      },
      (error) => {
        this.games = []
        this.setLoading(false);
      },
    );
  }

  setLoading( value: boolean): void
  {
    this.loading = value;
  }

  onPageChange(pageNumber: number) {
    if(this.currentPage != pageNumber) window.scrollTo(0, 0);
    
    this.currentPage = pageNumber;
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.games.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

}
