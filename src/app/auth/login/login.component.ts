import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginError: boolean = false;
  public formSubmitted: boolean = false;

  public loginForm = this.fb.group({
    email: ['elianhers@gmail.com', [Validators.required, Validators.email ] ],
    password:['Test1234', Validators.required]
  })

  constructor( private router: Router, private fb: FormBuilder, private authService : AuthService){}
  
  login(){
    this.formSubmitted = true

    if(this.loginForm.valid){
      this.loginError = false

      this.authService.login(this.loginForm.value)
      .then(response =>{
        this.router.navigateByUrl('/games');
      })
      .catch(error => {
        this.loginError = true
      })
    }
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle()
      .then(response =>{
        this.router.navigateByUrl('/games');
      })
      .catch(error => {
        this.loginError = true
      })
  }

  inputValidations(inputName: string): boolean
  {
    return (this.loginForm.get( inputName )?.invalid && this.formSubmitted) ? true : false;
  }
}
