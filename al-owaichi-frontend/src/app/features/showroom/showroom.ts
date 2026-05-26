import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector:    'app-showroom',
  standalone:  true,
  templateUrl: './showroom.html',
  styleUrl:    './showroom.scss',
})
export class Showroom {
  protected readonly langSvc = inject(LanguageService);

  protected readonly hours = [
    { day_en: 'Monday – Friday',   day_ar: 'الاثنين – الجمعة',   time: '9:00 – 18:00' },
    { day_en: 'Saturday',          day_ar: 'السبت',               time: '9:00 – 16:00' },
    { day_en: 'Sunday',            day_ar: 'الأحد',               time: 'Closed'       },
  ];

  protected day(h: { day_en: string; day_ar: string }): string {
    return this.langSvc.lang() === 'ar' ? h.day_ar : h.day_en;
  }
}
