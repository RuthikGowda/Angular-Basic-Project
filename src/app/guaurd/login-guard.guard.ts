import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

export const loginGuardGuard: CanActivateFn = (route, state) => {
 const router =  inject(Router);
 const authSvc = inject(AuthService);

 if( authSvc.isLoggedIn()){
   return true;
 }

  return  router.parseUrl('/Login') ;
};
