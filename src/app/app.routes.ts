import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'patient-dashboard', 
    component: PatientDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'patient' }
  },
  { 
    path: 'doctor-dashboard', 
    component: DoctorDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  }
];