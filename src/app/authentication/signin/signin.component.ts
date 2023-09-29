import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Role, AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthenticationService } from 'app/_services/authentication.service'; //Jairo

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup; //authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder, //private formBuilder: UntypedFormBuilder,
   private authenticationService: AuthenticationService, //Jairo
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, //Diego
    //private http: HttpClient          /*Diego*/

  ) {
    super();
  }
  
  ngOnInit() {
    
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required], //['admin@software.com', Validators.required],
      password: ['', Validators.required], //['admin@123', Validators.required],
    }); 
  } 

  /*get f() {
    return this.authForm.controls;
  }*/

  

  /*adminSet() {
    this.authForm.get('username')?.setValue('admin@software.com');
    this.authForm.get('password')?.setValue('admin@123');
  }
  employeeSet() {
    this.authForm.get('username')?.setValue('employee@software.com');
    this.authForm.get('password')?.setValue('employee@123');
  }
  clientSet() {
    this.authForm.get('username')?.setValue('client@software.com');
    this.authForm.get('password')?.setValue('client@123');
  } */
  
  
  onSubmit() {
    //this.submitted = true;
    //this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username or Password not valid !';
      return;
    } else {
        
      const username = this.authForm.get('username')?.value.toLowerCase();
      const password = this.authForm.get('password')?.value;
      //console.log('Username:', username);
      //console.log('Password:', password); 
    
      this.authenticationService.login(username, password); //jairo
      
    } 
  }
}

