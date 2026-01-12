import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

import { AuthService } from './Service/auth.service';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { SweetAlertzService } from './Service/sweet-alertz.service';
import { httpInterceptor } from './interceptor/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import lara from '@primeng/themes/lara';
import { $dt, definePreset } from '@primeng/themes';

const MyPreset = definePreset(lara, {
  semantic: {
    primary: {
      color: '#43187bff',
      contrastColor: '#ffffff',
      hoverColor: '#891c14ff',
      activeColor: '#891c14ff',
      focusColor: '#891c14ff',
    },

    focusRing: {
      light: {
        width: '2px',
        color: '#4f0ea5ff', // fallback to a red hex if value is undefined
        offset: '4px'
      },
      dark: {
        width: '2px',
        color: '#4f0ea5ff',
        offset: '4px'
      }
    },
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: '#82312bff',
          focusBorderColor: '#4f0ea5ff'
        }
      },
      dark: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      }
    },
  }
});

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(withInterceptors([httpInterceptor])), CommonModule,
    AuthService, NgOtpInputModule, SweetAlertzService, provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: false || 'none'
        
      }
    },

  })


  ]

 
};

