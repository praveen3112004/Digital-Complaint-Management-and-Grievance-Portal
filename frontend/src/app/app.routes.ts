import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { ComplaintDetailsComponent } from './components/complaint-details/complaint-details.component';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { 
    path: 'complaints', 
    component: ComplaintListComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'complaints/new', 
    component: ComplaintDetailsComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'staff/dashboard', 
    component: StaffDashboardComponent, 
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Staff'] }
  },
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin'] }
  },
  { path: '**', redirectTo: '' }
];
