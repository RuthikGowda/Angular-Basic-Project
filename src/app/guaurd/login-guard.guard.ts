import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuardGuard: CanActivateFn = (route, state) => {
 const router =  inject(Router);
  return !!sessionStorage.getItem('user')  || router.parseUrl('/Login') 
};
