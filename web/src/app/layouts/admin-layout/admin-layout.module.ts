import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ComponentsModule,
  ]
})
export class AdminLayoutModule { }
