import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { IGame } from 'src/app/interfaces/IGame.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: []
})
export class DetailComponent implements OnInit {

  public loading: boolean = true;
  public game: IGame = {};
  public error: Boolean = false;

  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router ){}

  ngOnInit(): void 
  {
    window.scrollTo(0, 0);

    this.route.params.subscribe((params: Params) => {
      this.getGame(params['id'])
    });
  }

  getGame(param: string): void
  {
    this.setLoading(true);

    this.gameService.getGame(param).subscribe(
      (response:IGame ) => {
        this.game = response;
        this.setLoading(false);
      },
      (error) => {
        this.setLoading(false);
        this.error = true;
      },
    );
  }

  setLoading( value: boolean ): void 
  {
    this.loading =  value;
  }

  back(): void {
    this.router.navigateByUrl("/games");
  }
}
