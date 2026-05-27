import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'aot-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class AdminLogin {
  private auth   = inject(AdminAuthService);
  private router = inject(Router);

  email    = '';
  password = '';
  error    = signal('');
  loading  = signal(false);

  submit() {
    this.error.set('');
    this.loading.set(true);

    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Invalid credentials');
        this.loading.set(false);
      },
    });
  }
}
