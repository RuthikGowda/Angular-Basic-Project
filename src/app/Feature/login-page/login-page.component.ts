import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ILoginCred } from '../../Model/ilogin-cred';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { SweetAlertzService } from '../../Service/sweet-alertz.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

declare var window: any;

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink, 
    ReactiveFormsModule,  ButtonModule  
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  authSrv = inject(AuthService);
  router = inject(Router);
  sweetAlertzService = inject(SweetAlertzService);
  userCred: ILoginCred = {
    email: '',
    password: '',
    rememberMe: false,
  };
  resetPasswordError: string = '';
  isLoading: boolean = false;
  loginAlert: boolean = false;
  passwordLink: string = '';

  emailforgot: FormControl = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);

  LoginSubmit() {
    this.sweetAlertzService.showLoading('Trying to login... Please wait');
    console.log('Login form submitted:', this.userCred);
    this.authSrv.Login(this.userCred).subscribe({
      next: (response) => {
        debugger;
        this.sweetAlertzService.closeLoading();
        if (response.success === true) {
          console.log('response:', response);
           
           this.authSrv.setLoggedIn(true); 
           this.authSrv.storeToken(response.data);
            sessionStorage.setItem('user', this.userCred.email);
            window.location.href = '/Home';
            this.sweetAlertzService.SuccessTopEnd(
              'Login successful! Redirecting...'
            ); 
           // this.router.navigate(['/Home']); // Redirect to home or any other route after successful login
          }  
          else if (response.data === -2)
            this.sweetAlertzService.commonPopUp(
              'Invalid input',
              'Please check your credentials.',
              'error'
            );
          else if (response.data === -1)
            this.sweetAlertzService.commonPopUp(
              'User not found!!',
              'Please register',
              'error'
            );
          else if (response.data === 0)
            this.sweetAlertzService.commonPopUp(
              'Login failed',
              'Incorrect email/password. Please try again.',
              'error'
            );
          else this.sweetAlertzService.ApiError();
          console.error('Login failed:', response.message);
        
      },
      error: (error) => {
        this.sweetAlertzService.closeLoading();
        console.error('Login error:', error);
        console.error('Login error1:', error.error.errors);
        const validationErrors = error?.error?.errors;
          if (validationErrors) {
          const errorMessages = Object.values(validationErrors).flat();
          console.error('Validation errors:', errorMessages.join(', '));
          this.sweetAlertzService.commonPopUp(
            'Validation Error',
            errorMessages.join(', '),
            'error'
          );
        } else {
          this.sweetAlertzService.ApiError();
        }
      },
    });
  }

  resetPassword() {
    this.isLoading = true;
    this.loginAlert = false;
    this.resetPasswordError = '';
    console.log('Reset password for email:', this.emailforgot.value);
    this.authSrv
      .resetPassword(this.emailforgot.value)
      .pipe(
        
        tap(res=> console.log('Response from resetPassword API:', res)),
        catchError((err: HttpErrorResponse) => {
          console.info('catched error in catchError of pipe', err);
 
          const validationErrors = err?.error?.errors ?? null;
          if (validationErrors) {
            console.error('Validation errors:', validationErrors);
            const errorMessages = Object.values(validationErrors)
              .flat()
              .join(', ');
            this.resetPasswordError = errorMessages;
          } else {
            console.error('An unexpected error occurred:', err);
            this.resetPasswordError =
              'An unexpected error occurred. Try again later.';
            // this.sweetAlertzService.commonPopUp(
            //   'Error',
            //   'An unexpected error occurred.',
            //   'error'
            // );
          }
          return EMPTY;
        }),
        finalize(() => {
          console.log('Reset password request completed');
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          console.log('got response from resetPassword API', res);
          if (res.success === true) {
            this.sweetAlertzService.SuccessTopEnd(
              'Password reset email sent successfully!'
            );

            const modalEl = document.getElementById('passwordResetMpdal');
            if (modalEl) {
              const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
              modal.hide();
            }
            this.passwordLink = res.data;
            this.loginAlert = true;
          } else {
            this.resetPasswordError = res.message || 'Unknown error occurred.';

            //  this.sweetAlertzService.commonPopUp('Error', res.message, 'error');
          }
        },
        error: (err) => {},
        complete: () => {
          console.log('Complete');
          
        },
      });
  }
}
