import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRole = authService.getRole();
  
  const expectedRoles = route.data['roles'] as Array<string>;

  if (authService.isLoggedIn() && expectedRoles.includes(userRole)) {
    return true;
  }

  // Redirect based on role or to login
  if (userRole === 'Staff') return router.createUrlTree(['/staff/dashboard']);
  if (userRole === 'Admin') return router.createUrlTree(['/admin/dashboard']);
  
  return router.createUrlTree(['/complaints']);
};
