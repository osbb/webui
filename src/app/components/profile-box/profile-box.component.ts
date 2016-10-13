import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-box',
  templateUrl: 'profile-box.component.html',
  styleUrls: ['profile-box.component.scss']
})
export class ProfileBoxComponent {
  currentUser: Observable<{}>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = authService.currentUser;
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService
      .logout({ token: '123' })
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
