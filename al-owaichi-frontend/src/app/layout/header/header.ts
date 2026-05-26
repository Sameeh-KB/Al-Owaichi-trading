import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService }    from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector:    'app-header',
  standalone:  true,
  imports:     [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl:    './header.scss',
})
export class Header {
  protected readonly themeSvc = inject(ThemeService);
  protected readonly langSvc  = inject(LanguageService);
  protected readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
