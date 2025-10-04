import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    router.navigate(['/login']);
    return false;
  }
  
  const user = JSON.parse(userStr);
  const requiredRole = route.data['role'];
  
  if (user.role === requiredRole) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};