import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  let token = localStorage.getItem('token');
  if (token) {

    request = request.clone({
        setHeaders: {
            Authorization: `${token}`,
        }
    });
}
  return next(request);
};


