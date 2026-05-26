import { Component, inject, signal, computed } from '@angular/core';
import { LanguageService }                     from '../../../../core/services/language.service';
import { CatalogService }                      from '../../../../core/services/catalog.service';
import { FilterKey }                           from '../../../../core/models/bike.model';
import { BikeCard }                            from '../bike-card/bike-card';

interface FilterTab {
  key: FilterKey;
  labelEn: string;
  labelAr: string;
}

@Component({
  selector:    'app-catalog',
  standalone:  true,
  imports:     [BikeCard],
  templateUrl: './catalog.html',
  styleUrl:    './catalog.scss',
})
export class Catalog {
  protected readonly langSvc    = inject(LanguageService);
  protected readonly catalogSvc = inject(CatalogService);

  protected readonly activeFilter = signal<FilterKey>('all');

  protected readonly tabs: FilterTab[] = [
    { key: 'all',     labelEn: 'All',      labelAr: 'الكل' },
    { key: 'haojue',  labelEn: 'HAOJUE',   labelAr: 'HAOJUE' },
    { key: 'zontes',  labelEn: 'ZONTES',   labelAr: 'ZONTES' },
    { key: 'linhai',  labelEn: 'LINHAI',   labelAr: 'LINHAI' },
    { key: 'dayang',  labelEn: 'DAYANG',   labelAr: 'DAYANG' },
    { key: 'nexy',    labelEn: 'NEXY',     labelAr: 'NEXY' },
    { key: 'qjmotor', labelEn: 'QJMotor',  labelAr: 'QJMotor' },
    { key: 'yamaha',  labelEn: 'YAMAHA',   labelAr: 'YAMAHA' },
  ];

  protected readonly filteredBikes = computed(() =>
    this.catalogSvc.filter(this.activeFilter())
  );

  protected readonly count = computed(() => this.filteredBikes().length);

  protected tabLabel(tab: FilterTab): string {
    return this.langSvc.lang() === 'ar' ? tab.labelAr : tab.labelEn;
  }

  protected setFilter(key: FilterKey): void {
    this.activeFilter.set(key);
  }
}
