import { Component, ViewChild, ElementRef } from '@angular/core';
import { Hero }        from './components/hero/hero';
import { Catalog }     from './components/catalog/catalog';
import { AboutStrip }  from './components/about-strip/about-strip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Catalog, AboutStrip],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  @ViewChild('catalogSection') catalogSection!: ElementRef<HTMLElement>;

  scrollToCatalog(): void {
    this.catalogSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
