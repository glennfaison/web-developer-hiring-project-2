import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  errorMessage: string;
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;

  constructor(
    private router: Router,
    private alerts: AlertService,
    private authSvc: AuthService,
  ) {}

  async onSubmit() {
    const form = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
    };
    if (!this.validate(form)) { throw new Error(this.errorMessage); }
    await this.authSvc.register(form);
    this.router.navigate(['/dashboard']);
    this.alerts.success('Successfully registered');
  }

  validate(form): boolean {
    if (!form.fullName) {
      this.errorMessage = 'Your full name is required!';
      return false;
    }
    if (form.password !== form.repeatPassword) {
      this.errorMessage = 'Passwords do not match!';
      return false;
    }
    if (!form.password) {
      this.errorMessage = 'Your password is required!';
      return false;
    }
    if (!form.email) {
      this.errorMessage = 'Your username or email is required!';
      return false;
    }
    return true;
  }

}
