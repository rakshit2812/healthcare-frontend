import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    role: 'patient'
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

    this.authService.register(this.formData).subscribe({
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
        this.error = 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}