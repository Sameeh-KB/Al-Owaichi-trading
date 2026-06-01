import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { AdminApiService, AdminInquiry } from '../services/admin-api.service';
import { ExportService }                 from '../services/export.service';

@Component({
  selector: 'aot-admin-inquiries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiries.html',
  styleUrl: './inquiries.scss',
})
export class AdminInquiries implements OnInit {
  private api    = inject(AdminApiService);
  private export = inject(ExportService);

  inquiries   = signal<AdminInquiry[]>([]);
  loading     = signal(true);
  error       = signal('');
  filter      = signal<string>('');

  // edit drawer
  selected    = signal<AdminInquiry | null>(null);
  editNotes   = '';
  editStatus  = '';
  saving      = signal(false);

  get filtered() {
    const f = this.filter();
    return f ? this.inquiries().filter(i => i.status === f) : this.inquiries();
  }

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.api.getInquiries().subscribe({
      next: (data) => { this.inquiries.set(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to load inquiries'); this.loading.set(false); },
    });
  }

  select(inq: AdminInquiry) {
    this.selected.set(inq);
    this.editNotes  = inq.notes ?? '';
    this.editStatus = inq.status;
  }

  saveSelected() {
    const inq = this.selected();
    if (!inq) return;
    this.saving.set(true);
    this.api.updateInquiry(inq.id, { status: this.editStatus as any, notes: this.editNotes }).subscribe({
      next: (updated) => {
        this.inquiries.update(list => list.map(i => i.id === updated.id ? updated : i));
        this.selected.set(updated);
        this.saving.set(false);
      },
      error: () => { alert('Save failed'); this.saving.set(false); },
    });
  }

  deleteSelected() {
    const inq = this.selected();
    if (!inq) return;
    if (!confirm('Delete this inquiry?')) return;
    this.api.deleteInquiry(inq.id).subscribe({
      next: () => {
        this.inquiries.update(list => list.filter(i => i.id !== inq.id));
        this.selected.set(null);
      },
      error: () => alert('Delete failed'),
    });
  }

  statusLabel(s: string) {
    return { NEW: '🆕 New', CONTACTED: '📞 Contacted', CLOSED: '✅ Closed' }[s] ?? s;
  }

  sourceIcon(s: string) {
    return { WHATSAPP: '💬', FORM: '📝', OTHER: '❓' }[s] ?? '?';
  }

  exportXlsx() {
    const rows = this.inquiries().map(i => ({
      Name:    i.name || '',
      Phone:   i.phone || '',
      Email:   i.email || '',
      Source:  i.source,
      Status:  i.status,
      Bike:    i.bike ? `${i.bike.brand} ${i.bike.model}` : '',
      Message: i.message,
      Notes:   i.notes || '',
      Date:    new Date(i.createdAt).toLocaleDateString(),
    }));
    const date = new Date().toISOString().slice(0, 10);
    this.export.toXlsx(rows as any, 'Inquiries', `aot-inquiries-${date}`);
  }
}
