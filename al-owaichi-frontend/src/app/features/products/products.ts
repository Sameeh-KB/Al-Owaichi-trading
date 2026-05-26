import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { CatalogService }  from '../../core/services/catalog.service';
import { FilterKey, BrandKey } from '../../core/models/bike.model';
import { BikeCard }        from '../home/components/bike-card/bike-card';

interface FilterTab {
  key: FilterKey;
  labelEn: string;
  labelAr: string;
}

@Component({
  selector:    'app-products',
  standalone:  true,
  imports:     [BikeCard],
  templateUrl: './products.html',
  styleUrl:    './products.scss',
})
export class Products implements OnInit {
  protected readonly langSvc    = inject(LanguageService);
  protected readonly catalogSvc = inject(CatalogService);
  private  readonly route       = inject(ActivatedRoute);

  protected readonly activeFilter = signal<FilterKey>('all');

  protected readonly tabs: FilterTab[] = [
    { key: 'all',     labelEn: 'All',      labelAr: 'الكل'   },
    { key: 'haojue',  labelEn: 'HAOJUE',   labelAr: 'HAOJUE' },
    { key: 'zontes',  labelEn: 'ZONTES',   labelAr: 'ZONTES' },
    { key: 'linhai',  labelEn: 'LINHAI',   labelAr: 'LINHAI' },
    { key: 'dayang',  labelEn: 'DAYANG',   labelAr: 'DAYANG' },
    { key: 'nexy',    labelEn: 'NEXY',     labelAr: 'NEXY'   },
    { key: 'qjmotor', labelEn: 'QJMotor',  labelAr: 'QJMotor'},
    { key: 'yamaha',  labelEn: 'YAMAHA',   labelAr: 'YAMAHA' },
  ];

  private readonly validBrands: BrandKey[] =
    ['haojue','zontes','linhai','dayang','nexy','qjmotor','yamaha'];

  ngOnInit(): void {
    const brand = this.route.snapshot.queryParamMap.get('brand') as BrandKey | null;
    if (brand && this.validBrands.includes(brand)) {
      this.activeFilter.set(brand);
    }
  }

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
