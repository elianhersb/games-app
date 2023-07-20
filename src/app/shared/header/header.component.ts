import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  headerItems: any[];

  constructor(private headerService: HeaderService, private authService: AuthService,  private router: Router,){
    this.headerItems =  headerService.header;
  }

  logout()
  {
    this.authService.logout()
      .then(response => {
        this.router.navigateByUrl('/login')
      })
  }


}
