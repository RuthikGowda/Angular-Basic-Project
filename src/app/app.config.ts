import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {   provideHttpClient } from '@angular/common/http';
 
import { AuthService } from './Service/auth.service';
import { CommonModule } from '@angular/common';
import {   NgOtpInputModule } from 'ng-otp-input';
import { SweetAlertzService } from './Service/sweet-alertz.service';

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(), CommonModule,
    AuthService, NgOtpInputModule,  SweetAlertzService
  ]
};
