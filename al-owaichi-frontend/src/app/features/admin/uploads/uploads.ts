import { Component, inject, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApiService, UploadFile } from '../services/admin-api.service';

@Component({
  selector: 'aot-admin-uploads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uploads.html',
  styleUrl: './uploads.scss',
})
export class AdminUploads implements OnInit {
  private api = inject(AdminApiService);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  uploads   = signal<UploadFile[]>([]);
  loading   = signal(true);
  uploading = signal(false);
  error     = signal('');
  copied    = signal('');

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.api.getUploads().subscribe({
      next:  (data) => { this.uploads.set(data); this.loading.set(false); },
      error: ()     => { this.error.set('Could not load uploads'); this.loading.set(false); },
    });
  }

  triggerUpload() { this.fileInput.nativeElement.click(); }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files?.length) return;
    this.uploading.set(true);
    this.error.set('');

    // Upload sequentially — support multi-select
    const upload = (i: number) => {
      if (i >= files.length) { this.uploading.set(false); this.load(); return; }
      this.api.uploadFile(files[i]).subscribe({
        next:  () => upload(i + 1),
        error: () => {
          this.error.set(`Upload failed for "${files[i].name}"`);
          this.uploading.set(false);
        },
      });
    };
    upload(0);

    // Reset input so same file can be picked again
    (event.target as HTMLInputElement).value = '';
  }

  copyUrl(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      this.copied.set(url);
      setTimeout(() => this.copied.set(''), 2000);
    });
  }

  confirmDelete(file: UploadFile) {
    if (!confirm(`Delete "${file.filename}"? This cannot be undone.`)) return;
    this.api.deleteUpload(file.id).subscribe({
      next:  () => this.uploads.update(list => list.filter(u => u.id !== file.id)),
      error: () => this.error.set('Delete failed'),
    });
  }

  formatBytes(bytes: number) {
    if (bytes < 1024)        return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
