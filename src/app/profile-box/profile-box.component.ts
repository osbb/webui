import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Auth } from '../auth.model';

@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss']
})
export class ProfileBoxComponent {
  auth: Observable<Auth>;

  constructor(private authService: AuthService) {
    this.auth = authService.auth;
  }

  login() {
    this.authService.login({ login: 'admin' });
  }
}