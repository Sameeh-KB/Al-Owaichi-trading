import { Component, inject, computed } from '@angular/core';
import { RouterLink }     from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector:    'app-hero',
  standalone:  true,
  imports:     [RouterLink],
  templateUrl: './hero.html',
  styleUrl:    './hero.scss',
})
export class Hero {
  protected readonly langSvc = inject(LanguageService);

  protected readonly heroLine1 = computed(() => {
    const title = this.langSvc.t().heroTitle;
    if (this.langSvc.lang() === 'ar') return title;
    const words = title.split(' ');
    const mid = Math.ceil(words.length / 2);
    return words.slice(0, mid).join(' ');
  });

  protected readonly heroLine2 = computed(() => {
    const title = this.langSvc.t().heroTitle;
    if (this.langSvc.lang() === 'ar') return '';
    const words = title.split(' ');
    const mid = Math.ceil(words.length / 2);
    return words.slice(mid).join(' ');
  });
}
