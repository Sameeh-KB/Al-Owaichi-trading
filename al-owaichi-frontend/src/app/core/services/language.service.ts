import { Injectable, signal, computed, effect } from '@angular/core';
import { Lang, TRANSLATIONS, Translations } from '../models/language.model';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang   = signal<Lang>('en');
  readonly isRtl  = computed(() => this.lang() === 'ar');
  readonly t      = computed<Translations>(() => TRANSLATIONS[this.lang()]);

  constructor() {
    // Keep html[lang] and html[dir] in sync
    effect(() => {
      const html = document.documentElement;
      html.lang = this.lang();
      html.dir  = this.isRtl() ? 'rtl' : 'ltr';
    });
  }

  toggle(): void {
    this.lang.update((l) => (l === 'en' ? 'ar' : 'en'));
  }

  /** Build a WhatsApp URL for the given bike model */
  buildWaUrl(waNumber: string, model: string): string {
    const msg = this.t().waMsg(model);
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  }
}
