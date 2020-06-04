import { Routes } from '@angular/router';

import { RegisterComponent } from 'src/app/pages/register/register.component';
import { LoginComponent } from 'src/app/pages/login/login.component';


export const AuthLayoutRoutes: Routes = [
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: '', pathMatch: 'prefix', redirectTo: 'login', },
];
