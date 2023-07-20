import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DetailComponent } from './detail.component';
import { GameService } from 'src/app/services/game.service';
import { IGame } from 'src/app/interfaces/IGame.interface';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockGame: IGame = {
    
      id: 540,
      title: "Overwatch 2",
      thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
      status: "Live",
      short_description: "A hero-focused first-person team shooter from Blizzard Entertainment.",
      description: "The tale of the hero organization Overwatch continues in Overwatch 2. This new take on the popular team shooter changes up things a little with five-man teams, redefined classes, and new playable characters. With the adjustment to 5v5, players now have more individual impact than in the previous game.\r\n\r\nChallenge yourself in all-new modes. Take control of a robot with your team in Push and take it to the enemy base before the enemy can take it from you. Explore all new areas, including iconic real-world cities such as New York, Rome, Monte Carlo, Toronto, and more.\r\n\r\nOverwatch 2 features an update schedule that drops new content every nine weeks. It also boasts a regular battle pass – both free and premium. This is where some of the game’s characters will be obtained.",
      game_url: "https://www.freetogame.com/open/overwatch-2",
      genre: "Shooter",
      platform: "Windows",
      publisher: "Activision Blizzard",
      developer: "Blizzard Entertainment",
      release_date: "2022-10-04",
      freetogame_profile_url: "https://www.freetogame.com/overwatch-2",
      minimum_system_requirements: {
          os: "Windows 10 64-bit",
          processor: "Intel Core i3 or AMD Phenom X3 8650",
          memory: "6 GB",
          graphics: "NVIDIA GeForce GTX 600 series or AMD Radeon HD 7000 series",
          storage: "50 GB"
      },
      screenshots: [
          {
              id: 1334,
              image: "https://www.freetogame.com/g/540/overwatch-2-1.jpg"
          },
          {
              id: 1335,
              image: "https://www.freetogame.com/g/540/overwatch-2-2.jpg"
          },
          {
              id: 1336,
              image: "https://www.freetogame.com/g/540/overwatch-2-3.jpg"
          }
      ]
  
  };

  beforeEach(async () => {   
    mockGameService = jasmine.createSpyObj('GameService', ['getGame']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        { provide: Router, useValue: mockRouter  },
        { provide: ActivatedRoute, useValue: { params: of({ id: 540 }) } },
        { provide: GameService, useValue: mockGameService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  it('Componente creado', () => {
    expect(component).toBeTruthy();
  });



  it('estable en falso el loading luego de cargar la data', () => {
    mockGameService.getGame.and.returnValue(of(mockGame));

    component.ngOnInit();

    expect(component.loading).toBeFalse();
  });



  it('debe navegar de regreso a /games cuando se llama back()', () => {
    component.back();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/games');
  });
});