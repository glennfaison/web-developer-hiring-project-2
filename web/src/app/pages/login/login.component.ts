import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  errorMessage: string;
  email: string;
  password: string;

  constructor(
    private router: Router,
    private alerts: AlertService,
    private authSvc: AuthService,
  ) {}

  async onSubmit() {
    const form = {
      email: this.email,
      password: this.password,
    };
    if (!this.validate(form)) { throw new Error(this.errorMessage); }
    await this.authSvc.login(this.email, this.password);
    this.router.navigate(['/dashboard']);
    this.alerts.success('Successfully signed in');
  }

  validate(form): boolean {
    if (!form.email) {
      this.errorMessage = 'Your username or email is required!';
      return false;
    }
    if (!form.password) {
      this.errorMessage = 'Your password is required!';
      return false;
    }
    return true;
  }

}
