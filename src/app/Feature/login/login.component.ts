import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IUserCred } from '../../Model/iuser-cred';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Service/auth.service';
import { NgOtpInputComponent } from 'ng-otp-input';
import { routes } from '../../app.routes';
import { Router, RouterLink } from '@angular/router';
import { SweetAlertzService } from '../../Service/sweet-alertz.service';
import { catchError, EMPTY } from 'rxjs';
 
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, NgOtpInputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent implements AfterViewInit{
  
  @ViewChild("otpModal") otpModalRef!: ElementRef;
 

  constructor(private router: Router) {}
  sweetAlertzService = inject(SweetAlertzService);

  ngAfterViewInit(): void {
   this.otpModalRef.nativeElement.style.display="block";
  }

  // Define the OTP variable to hold the OTP value
  otp: string = '';
  otpResponse: string = '';
  enableOTPbtn: boolean = false;
  onOtpSubmit(form: NgForm) {
    this.sweetAlertzService.showLoading();
     this.otpModalRef.nativeElement.style.display="none";
    console.log('OTP submitted', this.otp, this.otpResponse);
    if (
      this.otp === this.otpResponse &&
      this.otp !== '' &&
      this.otpResponse !== ''
    ) {
      this.sweetAlertzService.SuccessTopEnd(
        'OTP submitted successfully! Redirecting to login page...'
      );
      this.router.navigate(['/Login']); // Redirect to home or any other route after successful OTP submission
      //this.Authsrv.setLoggedIn(true);
    } else {
      this.sweetAlertzService.ErrorTopEnd("OTP verification failed, Try again")
    }

    // You can handle the OTP submission here
    // For example, you might want to validate it or send it to the server
  }

  onOtpChange($event: string) {
    console.log('OTP changed:', $event);
    // You can handle the OTP change event here
    // For example, you might want to store it or validate it
  }

  readonly Authsrv = inject(AuthService);

  response: any;
  termsChecked = false;
  user: IUserCred = {
    id: 0,
    email: '',
    password: '',
    confirmPassword: '',
  };
  onSubmit() {
    this.sweetAlertzService.showLoading('Trying to Register... Please wait');
    console.log('Form submitted:', this.user);
    this.Authsrv.Register(this.user)
      .pipe(
        catchError((error: 
          any) => {
          console.error('Error occurred during registration:', error);
          const validationErrors = error?.error?.errors;
          if (validationErrors) {
            this.sweetAlertzService.commonPopUp(
              'Registration Failed',
              validationErrors[0].message,
              'error'
            );
          } else {
            this.sweetAlertzService.commonPopUp(
              'Registration Failed',
              error.statusText,
              'error'
            );
          }

          return EMPTY;
        })
      )
      .subscribe({
        next: (response: any) => {
          if (response.success === true) {
            console.log('Login successful!' + response.message);
            this.sweetAlertzService.SuccessTopEnd(
              'Your request is processing. Enter OTP sent to your email.'
            );
             this.otpModalRef.nativeElement.style.display="block";
             
            sessionStorage.setItem('user', response.data);

            this.otpResponse = response.data.otp;
            console.log(
              'In submit() ',
              sessionStorage.getItem('user'),
              ' otp response',
              this.otpResponse
            );
          } else {
            this.sweetAlertzService.commonPopUp(
              'Registration Failed',
              response.message,
              'error'
            );
            console.log('Registration failes!' + response.message);
            this.Authsrv.setLoggedIn(false);
          }
        },
      });
  }
}
