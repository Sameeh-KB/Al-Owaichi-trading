import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'STAFF';
}

interface LoginResponse {
  accessToken: string;
  user: AdminUser;
}

const TOKEN_KEY = 'aot_admin_token';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);

  private _user$ = new BehaviorSubject<AdminUser | null>(this._loadUser());
  readonly user$ = this._user$.asObservable();

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.apiBase}/auth/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem(TOKEN_KEY, res.accessToken);
          localStorage.setItem('aot_admin_user', JSON.stringify(res.user));
          this._user$.next(res.user);
        }),
      );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('aot_admin_user');
    this._user$.next(null);
    this.router.navigate(['/admin/login']);
  }

  private _loadUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem('aot_admin_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
