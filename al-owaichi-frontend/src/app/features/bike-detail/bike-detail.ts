import { Component, inject, computed, effect, signal } from '@angular/core';
import { ActivatedRoute, RouterLink }                  from '@angular/router';
import { toSignal }                                    from '@angular/core/rxjs-interop';
import { map }                                         from 'rxjs';

import { CatalogService }  from '../../core/services/catalog.service';
import { LanguageService } from '../../core/services/language.service';
import { BikeSpec }        from '../../core/models/bike.model';

@Component({
  selector:    'app-bike-detail',
  standalone:  true,
  imports:     [RouterLink],
  templateUrl: './bike-detail.html',
  styleUrl:    './bike-detail.scss',
})
export class BikeDetail {
  private readonly route    = inject(ActivatedRoute);
  protected readonly cat    = inject(CatalogService);
  protected readonly lang   = inject(LanguageService);

  protected readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  protected readonly bike = computed(() => this.cat.getBySlug(this.slug()));

  /** Lightbox-style active gallery image */
  protected readonly activeImage = signal<string>('');

  protected readonly intro = computed(() => {
    const b = this.bike();
    if (!b) return '';
    return this.lang.lang() === 'ar' ? b.intro_ar : b.intro_en;
  });

  protected readonly desc = computed(() => {
    const b = this.bike();
    if (!b) return '';
    return this.lang.lang() === 'ar' ? b.desc_ar : b.desc_en;
  });

  protected readonly features = computed(() => {
    const b = this.bike();
    if (!b) return [];
    return this.lang.lang() === 'ar' ? b.features_ar : b.features_en;
  });

  protected readonly type = computed(() => {
    const b = this.bike();
    if (!b) return '';
    return this.lang.lang() === 'ar' ? b.type_ar : b.type_en;
  });

  protected readonly waUrl = computed(() => {
    const b = this.bike();
    if (!b) return '#';
    return this.lang.buildWaUrl(this.cat.waNumber, b.model);
  });

  /** All images: hero first, then gallery (deduped) */
  protected readonly allImages = computed<string[]>(() => {
    const b = this.bike();
    if (!b) return [];
    const set = new Set<string>();
    if (b.image) set.add(b.image);
    (b.gallery ?? []).forEach((g) => set.add(g));
    return [...set];
  });

  constructor() {
    // When bike loads: scroll to top, reset image, fire VIEW event
    effect(() => {
      const b = this.bike();
      if (b) {
        this.activeImage.set(this.allImages()[0] ?? '');
        window.scrollTo({ top: 0, behavior: 'auto' });
        this.cat.track('VIEW', b.slug);
      }
    });
  }

  specLabel(spec: BikeSpec): string {
    return this.lang.lang() === 'ar' ? spec.label_ar : spec.label_en;
  }

  specValue(spec: BikeSpec): string {
    return this.lang.lang() === 'ar' && spec.value_ar
      ? spec.value_ar
      : spec.value;
  }

  setImage(url: string): void {
    this.activeImage.set(url);
    this.cat.track('GALLERY', this.slug());
  }

  onWhatsApp(): void {
    this.cat.track('WHATSAPP', this.slug());
  }
}
