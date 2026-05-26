import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient }                           from '@angular/common/http';
import { toSignal }                             from '@angular/core/rxjs-interop';
import { catchError, of, tap }                  from 'rxjs';
import { Bike, FilterKey }                      from '../models/bike.model';

const API = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);

  /** WhatsApp number for Al Owaichi Trading */
  readonly waNumber = '96170000000';

  /** All bikes loaded from the API — null while loading, [] on error */
  readonly bikes = toSignal(
    this.http.get<Bike[]>(`${API}/bikes`).pipe(
      catchError(() => of([] as Bike[])),
    ),
    { initialValue: null },
  );

  /** True while the initial fetch is in flight */
  readonly loading = computed(() => this.bikes() === null);

  // ── Single-bike cache (slug → Bike) ────────────────────────
  private readonly _cache = new Map<string, Bike>();

  filter(key: FilterKey): Bike[] {
    const all = this.bikes() ?? [];
    return key === 'all' ? all : all.filter((b) => b.brand === key);
  }

  getBySlug(slug: string): Bike | undefined {
    return (this.bikes() ?? []).find((b) => b.slug === slug);
  }

  // ── Analytics helpers ───────────────────────────────────────
  track(event: 'VIEW' | 'CARD_CLICK' | 'WHATSAPP' | 'INQUIRY' | 'GALLERY',
        slug?: string): void {
    if (!slug) return;
    this.http.post(`${API}/analytics/event`, { slug, event }, { observe: 'response' })
      .pipe(catchError(() => of(null)))
      .subscribe();
  }
}
