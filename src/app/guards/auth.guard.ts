import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let isLoggedIn = false;
    if (typeof window !== 'undefined' && window.localStorage) {
      isLoggedIn = !!window.localStorage.getItem('token');
    }
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
