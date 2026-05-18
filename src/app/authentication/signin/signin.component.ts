import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Role, AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthenticationService } from 'app/_services/authentication.service'; //Jairo
import Swal from 'sweetalert2';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';



@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatIcon, MatSuffix, MatError, RouterLink, MatButton]
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
  isAuthenticating= false;
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
    if (this.authenticationService) {
      this.authenticationService.isAuthenticating$.subscribe((isAuthenticating) => {
        this.isAuthenticating = isAuthenticating;
      });
    } else {
      console.error('El servicio AuthenticationService no está inyectado correctamente en el componente.');
    }
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required], //['admin@software.com', Validators.required],
      password: ['', Validators.required], //['admin@123', Validators.required],
    }); 
  } 

  
  
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
    
      // this.authenticationService.login(username, password); //jairo
      this.authenticationService.login(username, password).catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
            Swal.fire('Warning', 'The password is invalid or the user does not have a password.', 'warning');
            break;
          case 'auth/too-many-requests':
            Swal.fire('Warning', 'Too many unsuccessful login attempts. Please try again later.', 'warning');
            break;
          default:
            Swal.fire('Warning', error.message, 'warning');
            break;
        }
      });
      
      
    } 
  }
}

