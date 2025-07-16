import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IUserCred } from '../../Model/iuser-cred';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Service/auth.service';
import { NgOtpInputComponent } from 'ng-otp-input';
import { routes } from '../../app.routes';
import { Router, RouterLink } from '@angular/router';
import { SweetAlertzService } from '../../Service/sweet-alertz.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { ApiResponse } from '../../Model/ApiRes';
 
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, NgOtpInputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent    {
  
  @ViewChild("otpModal") otpModalRef!: ElementRef;
  
 

  constructor(private router: Router) {
    
  }
   
  sweetAlertzService = inject(SweetAlertzService);

   

  // Define the OTP variable to hold the OTP value
  otp: string = '';
  otpResponse: string = '';
  enableOTPbtn: boolean = false;
  isOTPSubmitting: boolean = false; 
  registerErrorMSg: string='';
  otpErrorMSg: string='';
 

  onOtpSubmit(): void { 
    this.isOTPSubmitting = true;
    this.otpErrorMSg = '';
    this.Authsrv.ValidateRegOtp<ApiResponse<string>>(this.user.email, this.otp)
     .pipe(
      catchError((err:any)=>{ console.error('error in validating OTP:', err);
        this.isOTPSubmitting= false;
        return EMPTY;
      })).subscribe({
        next : (res)=>{
          if(res.success === true){
              this.sweetAlertzService.SuccessTopEnd(
        'OTP submitted successfully! Redirecting to login page...'
      );
       this.otpModalRef.nativeElement.style.display="none";
       this.router.navigate(['/Login']); 
          } 
          else{
            this.otpErrorMSg = res.message;
          }
          this.isOTPSubmitting= false;
        }
      }) 
  }

  onOtpChange($event: string) {
     if( $event.length===6){
      this.onOtpSubmit();
     }
  }

  readonly Authsrv = inject(AuthService);

  response: any;
  termsChecked = false;
  user: IUserCred = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  onSubmit() {
    this.sweetAlertzService.showLoading('Trying to Register... Please wait');
    this.registerErrorMSg ='';
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
        }),
        finalize(()=>this.sweetAlertzService.closeLoading())
      )
      .subscribe({
        next: (response: any) => {
          if (response.success === true) {
            console.log('Login successful!' + response);
            this.sweetAlertzService.SuccessTopEnd(
              'Your request is processing. Enter OTP sent to your email.'
            );
             this.otpModalRef.nativeElement.style.display="block";
              
          } else { 
           this.registerErrorMSg = response.message;  
          }
        },
      });
  }
}
