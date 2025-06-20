import { Routes } from '@angular/router';
import { LoginComponent } from './Feature/login/login.component';
import { LoginPageComponent } from './Feature/login-page/login-page.component';
import { HomeComponent } from './Feature/home/home.component';

export const routes: Routes = [
  {
    path: 'Register',
    component: LoginComponent,
  },
  {
    path: 'Login',
    component: LoginPageComponent,
  },
  {
    path: 'Home',
    component: HomeComponent,
  },
];
