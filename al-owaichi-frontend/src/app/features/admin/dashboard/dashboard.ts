import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminApiService, AnalyticsSummary } from '../services/admin-api.service';

@Component({
  selector: 'aot-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class AdminDashboard implements OnInit {
  private api = inject(AdminApiService);

  analytics = signal<AnalyticsSummary[]>([]);
  loading   = signal(true);
  error     = signal('');

  get totalViews()    { return this.analytics().reduce((s, b) => s + (b.totals['VIEW'] ?? 0), 0); }
  get totalClicks()   { return this.analytics().reduce((s, b) => s + (b.totals['CARD_CLICK'] ?? 0), 0); }
  get totalWhatsApp() { return this.analytics().reduce((s, b) => s + (b.totals['WHATSAPP'] ?? 0), 0); }
  get totalInquiry()  { return this.analytics().reduce((s, b) => s + (b.totals['INQUIRY'] ?? 0), 0); }

  get topBikes() { return [...this.analytics()].sort((a, b) => b.total - a.total).slice(0, 5); }

  ngOnInit() {
    this.api.getAnalytics().subscribe({
      next: (data) => { this.analytics.set(data); this.loading.set(false); },
      error: () => { this.error.set('Could not load analytics'); this.loading.set(false); },
    });
  }
}
