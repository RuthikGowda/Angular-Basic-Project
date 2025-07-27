import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {   HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
 
import { AuthService } from './Service/auth.service';
import { CommonModule } from '@angular/common';
import {   NgOtpInputModule } from 'ng-otp-input';
import { SweetAlertzService } from './Service/sweet-alertz.service';
import { httpInterceptor } from './interceptor/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
 

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor])), CommonModule,
    AuthService, NgOtpInputModule,  SweetAlertzService, provideAnimationsAsync(),
       providePrimeNG({ theme: { preset: Aura } }) 

     
  ]
};
