import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService)
  const isAdminFromLocal = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').isAdmin : false;
  console.log('Admin Guard - isAdminFromLocal:', isAdminFromLocal);
  return authService.isAdmin() || isAdminFromLocal;
};
