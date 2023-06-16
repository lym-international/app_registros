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

//import { HttpClient, HttpHeaders } from '@angular/common/http'; //Diego

import { AuthenticationService } from 'app/_services/authentication.service'; //Jairo
//import { throwError } from 'rxjs'; //Diego
//import { catchError } from 'rxjs'; //Diego

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: FormGroup; //authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: FormBuilder, //private formBuilder: UntypedFormBuilder,
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
      username: ['admin@software.com', Validators.required], //['admin@software.com', Validators.required],
      password: ['admin@123', Validators.required], //['admin@123', Validators.required],
    });
  }

  //Diego
  login() {
    const username = this.authForm.get('username')?.value;
    const password = this.authForm.get('password')?.value;
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
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username or Password not valid !';
      return;
    } else {
        
      const username = this.authForm.get('username')?.value;
      const password = this.authForm.get('password')?.value;
      console.log('Usernameee:', username);
      console.log('Password:', password); 
    
      this.authenticationService.login(username, password); //jairo
      
      //Diego inicio
      /*this.authenticationService.login(username, password)
      .pipe(
        catchError((error) => {
        this.error = error.message;
        this.loading = false;
        return throwError(error);
        })
      )
      .subscribe(() => {
        this.loading = false;
      });*/
      //Diego final
      
      // console.log("response", response)
      /*this.authenticationService.login(username, password)
      .then((response) => {
        if(response){
          this.router.navigate(['/admin/dashboard/main']);
          alert("exito!")
          this.loading = false;
        }
        // console.log("respuesta:", response);
        // Realiza las acciones correspondientes cuando el inicio de sesión sea exitoso
      })
      .catch((error) => {
        console.log("error:", error);
        this.loading = false;
        // Realiza las acciones correspondientes cuando haya un error en el inicio de sesión
      });*/

      /*
      let formData = {
        username: "", //username: "jairo@gmail.com",
        password: "" // password: "jairo123"
      };
      
      fetch(`https://us-central1-highkeystaff.cloudfunctions.net/auth/login`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => console.error(error));

        */
       //this.subs.sink = this.authService //

       /* .login(this.authForm.get('username')?.value, this.authForm.get('password')?.value)
        .subscribe(
          (res) => {
            if (res) {
              setTimeout(() => {
                const role = this.authService.currentUserValue.role;
                if (role === Role.All || role === Role.Admin) {
                  this.router.navigate(['/admin/search-order']);
                } else if (role === Role.Employee) {
                  this.router.navigate(['/employee/dashboard']);
                } else if (role === Role.Client) {
                  this.router.navigate(['/client/dashboard']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
                this.loading = false;
              }, 1000);
            } else {
              this.error = 'Invalid Login';
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        ); */
        
      //Este código es de la plantilla
      /* this.subs.sink = this.authService
        .login(this.f['username'].value, this.f['password'].value)
        .subscribe(
          (res) => {
            if (res) {
              setTimeout(() => {
                const role = this.authService.currentUserValue.role;
                if (role === Role.All || role === Role.Admin) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else if (role === Role.Employee) {
                  this.router.navigate(['/employee/dashboard']);
                } else if (role === Role.Client) {
                  this.router.navigate(['/client/dashboard']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
                this.loading = false;
              }, 1000);
            } else {
              this.error = 'Invalid Login';
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );*/
    } 
  }
}

