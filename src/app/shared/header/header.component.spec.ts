import { ComponentFixture, TestBed, waitForAsync  } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('componete creado', () => {
    expect(component).toBeTruthy();
  });

  it('mostar los items', () => {
    const headerItems = fixture.nativeElement.querySelectorAll('.nav-link');
  
    expect(headerItems.length).toBe(2);
    expect(headerItems[0].textContent).toContain('Juegos');
    expect(headerItems[1].textContent).toContain('logout');
  });

  it('cerrar sesion y navegar la login', () => {
    spyOn(authService, 'logout').and.returnValue(Promise.resolve());
    spyOn(router, 'navigateByUrl');
    
    const logoutLink = fixture.nativeElement.querySelector('.nav-link[style="cursor: pointer;"]');
    logoutLink.click();

    expect(authService.logout).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });
});



class MockAuthService {
  logout() {
    return Promise.resolve();
  }
}
