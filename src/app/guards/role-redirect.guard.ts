import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    if (token) {
      if (role === 'teacher') {
        this.router.navigate(['/manage-courses']);
      } else {
        this.router.navigate(['/dashboard']);
      }
      return false;
    }
  
    return true; // אין טוקן → נשארים ב־HomeComponent
  }
  
}
