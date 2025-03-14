import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';

export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.validateToken()){
    return true;
  }
  return new RedirectCommand(router.parseUrl('/login'));
};
