import {
  Component, inject, OnInit, signal,
  ElementRef, ViewChild,
} from '@angular/core';
import { CommonModule }                            from '@angular/common';
import { RouterModule }                            from '@angular/router';
import { AdminApiService, AnalyticsSummary }       from '../services/admin-api.service';
import { ExportService }                           from '../services/export.service';
import { Chart, registerables }                    from 'chart.js';

Chart.register(...registerables);

@Component({
  selector:    'aot-admin-dashboard',
  standalone:  true,
  imports:     [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl:    './dashboard.scss',
})
export class AdminDashboard implements OnInit {
  private api    = inject(AdminApiService);
  private export = inject(ExportService);

  @ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;

  analytics = signal<AnalyticsSummary[]>([]);
  loading   = signal(true);
  error     = signal('');

  private chart?: Chart;

  // ── Totals ────────────────────────────────────────────────
  get totalViews()    { return this.analytics().reduce((s, b) => s + b.views,      0); }
  get totalClicks()   { return this.analytics().reduce((s, b) => s + b.cardClicks, 0); }
  get totalWhatsApp() { return this.analytics().reduce((s, b) => s + b.whatsapp,   0); }
  get totalInquiry()  { return this.analytics().reduce((s, b) => s + b.inquiries,  0); }
  get totalGallery()  { return this.analytics().reduce((s, b) => s + b.gallery,    0); }
  get totalEngagement() {
    return this.totalViews + this.totalClicks + this.totalWhatsApp + this.totalInquiry + this.totalGallery;
  }

  get topBikes() { return [...this.analytics()].sort((a, b) => b.total - a.total).slice(0, 5); }

  // ── Lifecycle ─────────────────────────────────────────────
  ngOnInit() {
    this.api.getAnalytics().subscribe({
      next:  (data) => {
        this.analytics.set(data);
        this.loading.set(false);
        // defer until after Angular re-renders the @else branch with the canvas
        setTimeout(() => this.buildChart(), 0);
      },
      error: () => { this.error.set('Could not load analytics'); this.loading.set(false); },
    });
  }

  // ── Chart ─────────────────────────────────────────────────
  private buildChart() {
    const el = this.chartCanvas?.nativeElement;
    if (!el) return;

    const top5 = this.topBikes;
    const labels = top5.map(b => `${b.brand} ${b.model}`);

    this.chart?.destroy();
    this.chart = new Chart(el, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Views',
              data: top5.map(b => b.views),
              backgroundColor: 'rgba(217,123,26,.85)',
              borderRadius: 4,
              borderSkipped: false,
            },
            {
              label: 'WhatsApp',
              data: top5.map(b => b.whatsapp),
              backgroundColor: 'rgba(37,211,102,.6)',
              borderRadius: 4,
              borderSkipped: false,
            },
            {
              label: 'Inquiries',
              data: top5.map(b => b.inquiries),
              backgroundColor: 'rgba(99,179,237,.65)',
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              position: 'top',
              labels: { color: '#9090b0', font: { size: 11 }, boxWidth: 12, padding: 16 },
            },
            tooltip: {
              backgroundColor: '#1a1a24',
              borderColor: '#2a2a3e',
              borderWidth: 1,
              titleColor: '#e2e2f0',
              bodyColor: '#9090b0',
              padding: 10,
            },
          },
          scales: {
            x: {
              ticks: { color: '#6868a0', font: { size: 11 }, maxRotation: 30 },
              grid:  { color: 'transparent' },
              border: { color: '#1f1f2e' },
            },
            y: {
              ticks: { color: '#6868a0', font: { size: 11 } },
              grid:  { color: 'rgba(255,255,255,.04)' },
              border: { color: '#1f1f2e' },
            },
          },
        },
      });
  }

  // ── XLSX export ────────────────────────────────────────────
  exportXlsx() {
    const rows = this.analytics().map(b => ({
      Brand:     b.brand,
      Model:     b.model,
      Views:     b.views,
      'Card Clicks': b.cardClicks,
      WhatsApp:  b.whatsapp,
      Inquiries: b.inquiries,
      Gallery:   b.gallery,
      Total:     b.total,
    }));
    this.export.toXlsx(rows as any, 'Analytics', `aot-analytics-${today()}`);
  }
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}
