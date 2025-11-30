import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'app/_services/authentication.service';
import { NotificationResetPassService } from 'app/_services/notification-reset-pass.service';
//import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private notificationResetPassService: NotificationResetPassService,
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    } else {
      const email = this.authForm.value.email; // Obtener el correo electrónico del formulario
      
      console.log('EMAIL: ',email)

      //this.authenticationService.changePassword(email)
      
      this.authenticationService.changePassword(email).then((success) => {
        if (success) {
          this.notificationResetPassService.showSuccess(
            `You can receive instructions to reset your password to ${email}`
          );
        } else {
          this.notificationResetPassService.showError('An error occurred while changing the password.');
        }
      });
      
    }
  }
}
