import { Component, inject, output } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly langSvc = inject(LanguageService);

  /** Emits when the CTA button is clicked */
  readonly scrollToCatalog = output<void>();
}
