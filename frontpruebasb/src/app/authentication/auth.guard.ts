import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  if (localStorage.getItem("token") != null) {
    return true;
  } else {
    localStorage.clear();
    // this.routes.navigate(['/authentication/login']);
    return false;
  }
};
