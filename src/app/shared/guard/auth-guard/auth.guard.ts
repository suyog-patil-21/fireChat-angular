import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { LoginComponent } from '../../../auth/login/login.component';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const autheService = inject(AuthService);
  if (!autheService.user()) {
    router.navigateByUrl(LoginComponent.route);
    return false;
  }
  return true;
};
