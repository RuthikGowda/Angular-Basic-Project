import { Routes } from '@angular/router';
import { LoginComponent } from './Feature/login/login.component';
import { LoginPageComponent } from './Feature/login-page/login-page.component';
import { HomeComponent } from './Feature/home/home.component';
import { AddEmployeeComponent } from './Feature/Employee/add-employee/add-employee.component';

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
  {
    path: 'manageEmployee',
    component : AddEmployeeComponent
  }
];
