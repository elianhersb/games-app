import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { Observable, of } from 'rxjs';
import { IGames } from 'src/app/interfaces/IGames.interface';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockGameService: MockGameService;

  beforeEach(async () => {
    mockGameService = new MockGameService();

    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: GameService, useValue: mockGameService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creacion de componente', () => {
    expect(component).toBeTruthy();
  });

  it('loading en falso después de obtener los juegos', () => {
  
    component.getListGame();

    expect(component.loading).toBe(false);
  });

  it('establecer el array de juegos después de obtener los juegos', () => {
    
    const mockGames = [{
        id: 540,
        title: "Overwatch 2",
        thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
        short_description: "A hero-focused first-person team shooter from Blizzard Entertainment.",
        game_url: "https://www.freetogame.com/open/overwatch-2",
        genre: "Shooter",
        platform: "PC (Windows)",
        publisher: "Activision Blizzard",
        developer: "Blizzard Entertainment",
        release_date: "2022-10-04",
        freetogame_profile_url: "https://www.freetogame.com/overwatch-2"
    }];
    spyOn(mockGameService, 'getGames').and.returnValue(of(mockGames));

    
    component.getListGame();

  
    expect(component.games).toEqual(mockGames);
  });



});

class MockGameService {
  getGames(): Observable<IGames[]> {
    return of([]); // Puedes cambiar [] por datos simulados para las pruebas
  }
}
