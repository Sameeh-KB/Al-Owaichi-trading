import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'aot-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  auth     = inject(AdminAuthService);
  sideOpen = signal(true);

  toggle() { this.sideOpen.update(v => !v); }

  logout() { this.auth.logout(); }
}
