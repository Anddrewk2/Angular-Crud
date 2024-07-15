import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state): Promise<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return new Promise((resolve, reject) => {
    const user = authService.getCurrentUser();
    if (user) {
      resolve(true); // Người dùng đã đăng nhập, cho phép truy cập
    } else {
      router.navigate(['/login']).then(() => {
        resolve(false);
      }); // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    }
  });
};
