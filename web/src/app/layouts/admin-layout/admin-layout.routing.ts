import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', },
      { path: 'my-profile', component: ProfileComponent, pathMatch: 'full', },
      { path: '', pathMatch: 'prefix', redirectTo: 'dashboard', },
    ],
  },
];
