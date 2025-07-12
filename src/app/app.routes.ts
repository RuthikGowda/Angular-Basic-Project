import { Routes } from '@angular/router';
import { LoginComponent } from './Feature/login/login.component';
import { LoginPageComponent } from './Feature/login-page/login-page.component';
import { HomeComponent } from './Feature/home/home.component';
import { AddEmployeeComponent } from './Feature/Employee/add-employee/add-employee.component';
import { loginGuardGuard } from './guaurd/login-guard.guard';
import { ResetpasswordComponent } from './Feature/resetpassword/resetpassword.component';
import { HeaderComponent } from './Feature/header/header.component';

// export const routes: Routes = [
//   {
//     path: 'Register',
//     component: LoginComponent,
//     title: "Register"
//   },
//   {
//     path: 'Login',
//     component: LoginPageComponent,
//     title: "Login"
//   },
//   {
//     path: 'resetpassword',
//     component:ResetpasswordComponent,
//     title: "Password Reset"
//   },
//   {
//     path: 'Home',
//     component: HomeComponent,
//     title: "Home",
//     canActivate:[loginGuardGuard]
//   },
//   // {
//   //   path: 'manageEmployee',
//   //   component : AddEmployeeComponent
//   // }
//   {
//     path: 'manageEmployee',
//      loadComponent: ()=>
//       import('./Feature/Employee/add-employee/add-employee.component').then(
//         (c)=>c.AddEmployeeComponent
//       ),
//       title:"Manage Employee",
//       canActivate:[loginGuardGuard]
     
//   }
// ];

export const routes: Routes = [
  {
    path:'',
    redirectTo :'Login',
    pathMatch:'full'
  }
     ,
      {
        path: 'Login',
        component: LoginPageComponent,
        title: 'Login'
      },
      {
        path: 'Register',
        component: LoginComponent,
        title: 'Register'
      },
      {
        path: 'resetpassword',
        component: ResetpasswordComponent,
        title: 'Password Reset'
      }
    ,
  {
    path: '',
    component:HeaderComponent,
    canActivate: [loginGuardGuard],
    children: [
      {
        path: 'Home',
        component: HomeComponent,
        title: 'Home',
        
      },
      {
        path: 'manageEmployee',
        loadComponent: () =>
          import('./Feature/Employee/add-employee/add-employee.component').then(
            (c) => c.AddEmployeeComponent
          ),
        title: 'Manage Employee',
         
      }
    ]
  },
  { path: '**', redirectTo: 'Home' }
];
