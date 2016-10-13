import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn !== null);
  }

  canActivate(): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return this.isLoggedIn;
  }
}
