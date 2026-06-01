import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminApiService, AdminBike } from '../services/admin-api.service';
import { ExportService }              from '../services/export.service';
import { BikeFormModal }              from './bike-form-modal';

@Component({
  selector: 'aot-admin-bikes',
  standalone: true,
  imports: [CommonModule, RouterModule, BikeFormModal],
  templateUrl: './bikes.html',
  styleUrl: './bikes.scss',
})
export class AdminBikes implements OnInit {
  private api    = inject(AdminApiService);
  private export = inject(ExportService);

  bikes    = signal<AdminBike[]>([]);
  loading  = signal(true);
  error    = signal('');

  // modal state
  showModal  = signal(false);
  editTarget = signal<AdminBike | null>(null);

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.api.getBikes().subscribe({
      next: (data) => { this.bikes.set(data); this.loading.set(false); },
      error: () => { this.error.set('Failed to load bikes'); this.loading.set(false); },
    });
  }

  openCreate() { this.editTarget.set(null); this.showModal.set(true); }
  openEdit(bike: AdminBike) { this.editTarget.set(bike); this.showModal.set(true); }
  closeModal() { this.showModal.set(false); this.editTarget.set(null); }

  onSaved() { this.closeModal(); this.load(); }

  deleteBike(bike: AdminBike) {
    if (!confirm(`Delete "${bike.brand} ${bike.model}"? This cannot be undone.`)) return;
    this.api.deleteBike(bike.id).subscribe({
      next: () => this.bikes.update(list => list.filter(b => b.id !== bike.id)),
      error: () => alert('Delete failed'),
    });
  }

  togglePublished(bike: AdminBike) {
    this.api.updateBike(bike.id, { published: !bike.published }).subscribe({
      next: (updated) => this.bikes.update(list => list.map(b => b.id === updated.id ? updated : b)),
      error: () => alert('Update failed'),
    });
  }

  toggleInStock(bike: AdminBike) {
    this.api.updateBike(bike.id, { inStock: !bike.inStock }).subscribe({
      next: (updated) => this.bikes.update(list => list.map(b => b.id === updated.id ? updated : b)),
      error: () => alert('Update failed'),
    });
  }

  exportXlsx() {
    const rows = this.bikes().map(b => ({
      Brand:      b.brand,
      Model:      b.model,
      Slug:       b.slug,
      Engine:     b.engine,
      Type:       b.typeEn,
      'In Stock': b.inStock ? 'Yes' : 'No',
      Published:  b.published ? 'Yes' : 'No',
      'Sort Order': b.sortOrder,
    }));
    const date = new Date().toISOString().slice(0, 10);
    this.export.toXlsx(rows as any, 'Bikes', `aot-bikes-${date}`);
  }
}
