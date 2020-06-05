import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ComponentsModule,
  ]
})
export class AuthLayoutModule { }
