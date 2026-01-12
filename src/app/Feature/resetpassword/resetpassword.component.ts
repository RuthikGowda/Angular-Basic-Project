import { Component, ErrorHandler, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { resetpswd } from '../../Model/passwrd-res';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpSvcService } from '../../Service/http-svc.service';
import { environment } from '../../../environments/environment.production';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule,CommonModule, RouterLink],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent  {

  isloader = true;
  router = inject(ActivatedRoute);
  httpSrv = inject(HttpSvcService)

  invalidAction: boolean = false;
  showSuccess: boolean = false;
  errorMessage: string = '';
  resetform : resetpswd ={
      email :'',
      password :'',
      confirmPassword:'',
      resetId:'',
  }
   
  resetId: string | null='';

  constructor(){ 
    this.router.queryParamMap.subscribe( (param) =>{
    this.resetform.email=param.get('email');
    this.resetform.resetId=param.get('resetId'); 
    console.log(this.resetform.email,this.resetId);
     this.validate();
  });
}
  validate(): void {
    debugger;
    if(!this.resetform.email || !this.resetform.resetId) {
      this.isloader = false;
       this.invalidAction = true;
       this.errorMessage= "<strong>Invalid action!</strong> Please try again.";
       return;
    }else{
      this.httpSrv.httpPost<boolean,any>(`${environment.ASPNET_API_URL}${environment.resetpswdvalid}`,
      {email:this.resetform.email,resetId:this.resetform.resetId}).subscribe({
        
        next: (response) => {
          this.isloader = false;
          console.log('Response from reset password validation:', response);
          
          if (response.success) {
             this.invalidAction = false;
          } else {
            this.invalidAction = true;
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.isloader = false;
          this.invalidAction = true;
          console.error('Error validating reset password:', error);
          this.errorMessage= "<strong>Some error occurred!</strong> Please try again.";
          
        }
      });

    } 
  }


  resetPassword(): void {

    this.isloader = true;

    this.httpSrv.httpPost<any,any>(`${environment.ASPNET_API_URL}${environment.resetPassword}`, this.resetform)
    .pipe(
      catchError((err:HttpErrorResponse)=>{  
        this.isloader=false;
        this.invalidAction=true;
        this.errorMessage= "<strong>Some error occurred!</strong> Please try again later.";
        return EMPTY;
      })
    ) 
    .subscribe({
      next : (response)=>{
        this.isloader= false;
        if(response.success){
           this.showSuccess = true;
        }
        else{
          this.invalidAction = true;
          this.errorMessage = response.message;
        }
      }

    });
  }
}

 
