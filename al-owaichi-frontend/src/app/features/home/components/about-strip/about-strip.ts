import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-about-strip',
  standalone: true,
  templateUrl: './about-strip.html',
  styleUrl: './about-strip.scss',
})
export class AboutStrip {
  protected readonly langSvc = inject(LanguageService);
}
