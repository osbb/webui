import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequestModel } from '../../models/login-request.model';

@Component({
  selector: 'app-auth-form',
  templateUrl: 'auth-form.component.html',
  styleUrls: ['auth-form.component.scss']
})
export class AuthFormComponent {
  data: LoginRequestModel = { email: null, password: null };

  constructor(private authService: AuthService, private router: Router) {
  }

  submit() {
    this.authService.loginWithPassword(this.data).then(res => {
      if (res) {
        this.router.navigate(['/']);
      }
    });
  }

}
