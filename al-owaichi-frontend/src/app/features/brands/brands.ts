import { Component, inject, computed } from '@angular/core';
import { RouterLink }      from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { CatalogService }  from '../../core/services/catalog.service';
import { ThemeService }    from '../../core/services/theme.service';
import { BrandKey }        from '../../core/models/bike.model';

interface BrandInfo {
  key:          BrandKey;
  name:         string;
  manufacturer: string;
  logoDark:     string;   // shown on light mode backgrounds
  logoLight:    string;   // shown on dark mode backgrounds
  origin:       string;
  desc_en:      string;
  desc_ar:      string;
}

@Component({
  selector:    'app-brands',
  standalone:  true,
  imports:     [RouterLink],
  templateUrl: './brands.html',
  styleUrl:    './brands.scss',
})
export class Brands {
  protected readonly langSvc    = inject(LanguageService);
  protected readonly catalogSvc = inject(CatalogService);
  protected readonly themeSvc   = inject(ThemeService);

  protected readonly brandList: BrandInfo[] = [
    {
      key:          'haojue',
      name:         'HAOJUE',
      manufacturer: 'HAOJUE',
      logoDark:     'haojue-removebg-dark.png',
      logoLight:    'haojue-removebg-light.png',
      origin:       'China',
      desc_en: 'Suzuki-joint-venture manufacturer known for reliable commuter scooters and sport bikes. One of China\'s largest two-wheeler brands.',
      desc_ar: 'شركة مشتركة مع سوزوكي، معروفة بالدراجات الاقتصادية الموثوقة. من أكبر علامات الدراجات في الصين.',
    },
    {
      key:          'zontes',
      name:         'ZONTES',
      manufacturer: 'ZONTES',
      logoDark:     'ZONTES-removebg-dark.png',
      logoLight:    'ZONTES-removebg-light.png',
      origin:       'China',
      desc_en: 'Premium Chinese brand specialising in mid-displacement and large-displacement motorcycles with advanced technology and aggressive styling.',
      desc_ar: 'علامة صينية مميزة متخصصة في الدراجات متوسطة وكبيرة المحرك بتقنية متقدمة وتصميم عدواني.',
    },
    {
      key:          'linhai',
      name:         'LINHAI',
      manufacturer: 'LINHAI',
      logoDark:     'Linhai-removebg-dark.png',
      logoLight:    'Linhai-removebg-light.png',
      origin:       'China',
      desc_en: 'Established manufacturer offering a wide range of ATVs, utility vehicles, and scooters. Built for durability in demanding conditions.',
      desc_ar: 'مصنّع راسخ يقدم مجموعة واسعة من الدراجات الرباعية والمركبات متعددة الاستخدامات.',
    },
    {
      key:          'dayang',
      name:         'DAYANG',
      manufacturer: 'DAYANG',
      logoDark:     'Dayang-removebg-dark.png',
      logoLight:    'Dayang-removebg-light.png',
      origin:       'China',
      desc_en: 'One of China\'s oldest motorcycle manufacturers, producing dependable commuter and cargo motorcycles trusted across the region.',
      desc_ar: 'من أقدم مصنّعي الدراجات النارية الصينية، ينتج دراجات اقتصادية وشحن موثوقة على نطاق واسع.',
    },
    {
      key:          'nexy',
      name:         'NEXY',
      manufacturer: 'KL Motor',
      logoDark:     'KL Moto-dark.png',
      logoLight:    'KL Moto-light.png',
      origin:       'China',
      desc_en: 'NEXY is the flagship scooter model by KL Motor — a modern urban scooter offering lightweight design and fuel-efficient performance for city commuting.',
      desc_ar: 'نيكسي هو موديل السكوتر الرئيسي من KL Motor — سكوتر حضري حديث بتصميم خفيف وأداء اقتصادي مثالي للمدينة.',
    },
    {
      key:          'qjmotor',
      name:         'QJMotor',
      manufacturer: 'QJMotor',
      logoDark:     'QJMOTOR-removebg-dark.png',
      logoLight:    'QJMOTOR-removebg-light.png',
      origin:       'China',
      desc_en: 'Subsidiary of Qianjiang Group (Benelli\'s parent company), producing high-performance motorcycles combining Italian heritage with Chinese manufacturing.',
      desc_ar: 'تابعة لمجموعة قيانجيانج (الشركة الأم لبينيلي)، تجمع بين الإرث الإيطالي والتصنيع الصيني.',
    },
    {
      key:          'yamaha',
      name:         'YAMAHA',
      manufacturer: 'YAMAHA',
      logoDark:     'YAMAHA-removebg-dark.png',
      logoLight:    'YAMAHA-removebg-light.png',
      origin:       'Japan',
      desc_en: 'Global Japanese icon with over 65 years of motorsport heritage. Renowned for precision engineering, reliability and performance across all categories.',
      desc_ar: 'أيقونة يابانية عالمية بأكثر من 65 عامًا في عالم رياضة المحركات. معروفة بالدقة الهندسية والأداء المتميز.',
    },
  ];

  /** Returns the correct logo file based on current theme */
  protected logo(brand: BrandInfo): string {
    return this.themeSvc.theme() === 'dark'
      ? brand.logoLight
      : brand.logoDark;
  }

  protected modelCount(key: BrandKey): number {
    const bikes = this.catalogSvc.bikes();
    if (!bikes) return 0;
    return bikes.filter(b => b.brand === key).length;
  }

  protected desc(brand: BrandInfo): string {
    return this.langSvc.lang() === 'ar' ? brand.desc_ar : brand.desc_en;
  }
}
