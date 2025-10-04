import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.error = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        const user = response.user;
        if (user.role === 'patient') {
          this.router.navigate(['/patient-dashboard']);
        } else if (user.role === 'doctor') {
          this.router.navigate(['/doctor-dashboard']);
        } else if (user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Invalid credentials. Please try again.';
        this.loading = false;
      }
    });
  }
}