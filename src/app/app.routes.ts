import { Routes } from '@angular/router';
import { LoginComponent } from './Feature/Register/login.component';
import { LoginPageComponent } from './Feature/login-page/login-page.component';
import { HomeComponent } from './Feature/home/home.component';
import { loginGuardGuard } from './guaurd/login-guard.guard';
import { HeaderComponent } from './Feature/header/header.component';
import carousel from '@primeng/themes/aura/carousel';

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
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  }, {
    path: 'manage-carousel',
    loadComponent: () =>
      import('./Feature/admin/carousel-manage/carousel-manage.component').then(
        (c) => c.CarouselManageComponent
      )
  },
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
    loadComponent: () =>
      import('./Feature/resetpassword/resetpassword.component').then((c) => c.ResetpasswordComponent),
    title: 'Password Reset'
  }
  ,
  {
    path: '',
    component: HeaderComponent,
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

      },
      {
        path: 'manage-home',
        loadComponent: () =>
          import('./Feature/admin/manage-home/manage-home.component').then(
            (c) => c.ManageHomeComponent
          ),
        title: 'Carousel Manage',
        children: [{
          path: 'carousel-manage',
          loadComponent: () => import('./Feature/admin/carousel-manage/carousel-manage.component')
            .then((c) => c.CarouselManageComponent),
        }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'Home' }
];
