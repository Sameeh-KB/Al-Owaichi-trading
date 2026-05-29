import {
  Component, EventEmitter, inject, Input, OnChanges, Output, signal, ViewChild, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, AdminBike, UploadFile } from '../services/admin-api.service';

type BikeDraft = Partial<AdminBike>;

@Component({
  selector: 'aot-bike-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bike-form-modal.html',
  styleUrl: './bike-form-modal.scss',
})
export class BikeFormModal implements OnChanges {
  private api = inject(AdminApiService);

  @Input() bike: AdminBike | null = null;
  @Output() saved     = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  saving    = signal(false);
  uploading = signal(false);
  error     = signal('');

  draft: BikeDraft = this.blank();

  ngOnChanges() {
    this.draft = this.bike ? { ...this.bike } : this.blank();
    this.error.set('');
  }

  blank(): BikeDraft {
    return {
      brand: '', model: '', slug: '',
      typeEn: '', typeAr: '',
      engine: '', power: '',
      descEn: '', descAr: '',
      introEn: '', introAr: '',
      featuresEn: [], featuresAr: [],
      specs: [],
      emoji: '🏍', image: '', gallery: [],
      inStock: true, published: true, sortOrder: 0,
    };
  }

  get title() { return this.bike ? 'Edit bike' : 'Add bike'; }

  // ── Tag inputs ──────────────────────────────────────────
  featEnInput = '';
  featArInput = '';

  addFeatEn() {
    const v = this.featEnInput.trim();
    if (v) { this.draft.featuresEn = [...(this.draft.featuresEn ?? []), v]; this.featEnInput = ''; }
  }
  removeFeatEn(i: number) { this.draft.featuresEn = this.draft.featuresEn?.filter((_, idx) => idx !== i); }

  addFeatAr() {
    const v = this.featArInput.trim();
    if (v) { this.draft.featuresAr = [...(this.draft.featuresAr ?? []), v]; this.featArInput = ''; }
  }
  removeFeatAr(i: number) { this.draft.featuresAr = this.draft.featuresAr?.filter((_, idx) => idx !== i); }

  // ── Auto-slug ────────────────────────────────────────────
  autoSlug() {
    if (!this.bike) {
      this.draft.slug = `${this.draft.brand}-${this.draft.model}`
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }
  }

  // ── Image upload ─────────────────────────────────────────
  triggerUpload() { this.fileInput.nativeElement.click(); }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading.set(true);
    this.api.uploadFile(file).subscribe({
      next: (upload: UploadFile) => {
        this.draft.image = upload.url;
        this.uploading.set(false);
      },
      error: () => {
        this.error.set('Image upload failed');
        this.uploading.set(false);
      },
    });
  }

  // ── Submit ────────────────────────────────────────────────
  submit() {
    this.saving.set(true);
    this.error.set('');

    const req = this.bike
      ? this.api.updateBike(this.bike.id, this.draft)
      : this.api.createBike(this.draft);

    req.subscribe({
      next:  () => { this.saving.set(false); this.saved.emit(); },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Save failed');
        this.saving.set(false);
      },
    });
  }
}
