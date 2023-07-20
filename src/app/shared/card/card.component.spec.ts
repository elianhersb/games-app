import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('creacion de componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostar el titulo y la descripcion del juego', () => {
    const testGame = {
      id: 1,
      title: 'Test Game',
      thumbnail: 'test-thumbnail.jpg',
      short_description: 'This is a test game.',
    };

    // Asignar el objeto testGame a la propiedad 'declarations'
    component.declarations = testGame;
    fixture.detectChanges();

    // Verificar que el título y la descripción del juego se muestren correctamente en la plantilla
    const cardTitle = fixture.nativeElement.querySelector('.card-title');
    const cardDescription = fixture.nativeElement.querySelector('.card-text');

    expect(cardTitle.textContent).toContain(testGame.title);
    expect(cardDescription.textContent).toContain(testGame.short_description);
  });

  it('debe tener btn de detalle con el parametro indicado ', () => {
    const testGame = {
      id: 1,
      title: 'Test Game',
      thumbnail: 'test-thumbnail.jpg',
      short_description: 'This is a test game.',
    };

    // Asignar el objeto testGame a la propiedad 'declarations'
    component.declarations = testGame;
    fixture.detectChanges();

    // Verificar que el atributo routerLink se haya establecido correctamente en el enlace "Ver Detalle"
    const routerLink = fixture.nativeElement.querySelector('.btn-primary');
    expect(routerLink.getAttribute('ng-reflect-router-link')).toBe(testGame.id.toString());
  });
});
