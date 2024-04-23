import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../tools/services/alert.service';


export const errInterceptor: HttpInterceptorFn = (req, next) => {
  var alert = new AlertService();
  
  return next(req).pipe(
    catchError((error) => {
      console.log(error);
      if ([401, 403].includes(error.status)) {
        alert.error('Unauthorized request');
      }
      else if ([404].includes(error.status)) { alert.error(error.error.detail); }
      else if ([400].includes(error.status)) {
        alert.error(error.error.detail);
      }
      else {
        alert.error(error.error.detail );
        }
    
      return throwError(() => error);
    })
  );
};
