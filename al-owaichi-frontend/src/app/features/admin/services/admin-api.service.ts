import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface AdminBike {
  id: string;
  slug: string;
  brand: string;
  model: string;
  typeEn: string;
  typeAr: string;
  engine: string;
  power: string;
  descEn: string;
  descAr: string;
  introEn: string;
  introAr: string;
  featuresEn: string[];
  featuresAr: string[];
  specs: any[];
  emoji: string;
  image: string;
  gallery: string[];
  inStock: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface AdminInquiry {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string;
  source: 'WHATSAPP' | 'FORM' | 'OTHER';
  lang: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
  notes: string | null;
  createdAt: string;
  bike: { id: string; brand: string; model: string; slug: string } | null;
}

/** Matches the actual API response from AnalyticsService.summary() */
export interface AnalyticsSummary {
  bikeId:     string | null;
  slug:       string | null;
  brand:      string | null;
  model:      string | null;
  views:      number;
  cardClicks: number;
  whatsapp:   number;
  inquiries:  number;
  gallery:    number;
  total:      number;
}

export interface UploadFile {
  id: string;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private http = inject(HttpClient);
  private base = `${environment.apiBase}/admin`;

  // ── Bikes ──────────────────────────────────────────────────
  getBikes()                             { return this.http.get<AdminBike[]>(`${this.base}/bikes`); }
  getBike(id: string)                    { return this.http.get<AdminBike>(`${this.base}/bikes/${id}`); }
  createBike(body: Partial<AdminBike>)   { return this.http.post<AdminBike>(`${this.base}/bikes`, body); }
  updateBike(id: string, body: Partial<AdminBike>) { return this.http.patch<AdminBike>(`${this.base}/bikes/${id}`, body); }
  deleteBike(id: string)                 { return this.http.delete<void>(`${this.base}/bikes/${id}`); }

  // ── Inquiries ──────────────────────────────────────────────
  getInquiries(status?: string) {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<AdminInquiry[]>(`${this.base}/inquiries`, { params });
  }
  updateInquiry(id: string, body: { status?: string; notes?: string }) {
    return this.http.patch<AdminInquiry>(`${this.base}/inquiries/${id}`, body);
  }
  deleteInquiry(id: string) { return this.http.delete<void>(`${this.base}/inquiries/${id}`); }

  // ── Analytics ──────────────────────────────────────────────
  getAnalytics(since?: string) {
    let params = new HttpParams();
    if (since) params = params.set('since', since);
    return this.http.get<AnalyticsSummary[]>(`${this.base}/analytics`, { params });
  }

  // ── Uploads ───────────────────────────────────────────────
  getUploads()             { return this.http.get<UploadFile[]>(`${this.base}/uploads`); }
  deleteUpload(id: string) { return this.http.delete<void>(`${this.base}/uploads/${id}`); }
  uploadFile(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<UploadFile>(`${this.base}/uploads`, fd);
  }
}
