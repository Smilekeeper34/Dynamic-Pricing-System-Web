import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  console.log(['/login'].includes(req.url))

  if (
    req.url.includes('/login') ||
    req.url.includes('/group/add') ||
    req.url.includes('/changePassword') ||
    req.url.includes('/resetPassword')
  ) {
   const authReq = req.clone({
     headers: req.headers.delete(
       'Authorization',
       sessionStorage.getItem('token')!
     ),
   });
    return next(authReq);
  }
   const authReq = req.clone({
     headers: req.headers.set(
       'Authorization', 'Bearer '+
       sessionStorage.getItem('token')!
     ),
   });
   

  return next(authReq);
};
