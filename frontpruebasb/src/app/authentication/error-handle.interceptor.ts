import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export const errorHandleInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(err => {
    if (err.status === 401 || err.status === 0) {
        // auto logout if 401 response returned from api
        localStorage.clear();
        window.location.pathname = 'login';

    }
     throw err;
  }))
};
