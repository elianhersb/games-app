import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerError: boolean = false;
  public formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    email: ['elianhers@gmail.com', [Validators.required, Validators.email ] ],
    password:['Test1234', Validators.required]
  })

  constructor( private router: Router, private fb: FormBuilder, private authService : AuthService){}

  register(){

    if(this.registerForm.valid){

      this.registerError = false; 
      this.authService.register( this.registerForm.value )
        .then(response => {
          this.router.navigateByUrl('/games');
        })
        .catch(error=> { this.registerError = true; } )
   
      }
    }

  inputValidations(inputName: string): boolean
  {
    return (this.registerForm.get( inputName )?.invalid && this.formSubmitted) ? true : false;
  }
}
