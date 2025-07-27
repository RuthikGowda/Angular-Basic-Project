import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('JWT');
  let headers = req.headers.set('Content-Type', 'application/json');
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  const clonedReq = req.clone({ headers });
  return next(clonedReq);
};
