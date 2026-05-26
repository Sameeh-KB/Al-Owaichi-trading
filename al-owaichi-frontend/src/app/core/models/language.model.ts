export type Lang = 'en' | 'ar';

export interface Translations {
  // Header
  logoTagline: string;
  langLabel: string;
  // Hero
  heroBrands: string[];
  heroTitle: string;
  heroSub: string;
  browseCatalog: string;
  // Catalog
  ourModels: string;
  tapToInquire: string;
  allModels: string;
  showing: string;
  models: string;
  // Card
  priceRequest: string;
  inquire: string;
  viewDetails: string;
  // Detail page
  backToCatalog: string;
  overview: string;
  keyFeatures: string;
  specifications: string;
  notFoundTitle: string;
  notFoundSub: string;
  // About strip
  authorizedDealer: string;
  basedInLebanon: string;
  whatsappInquiry: string;
  afterSalesService: string;
  // Footer
  footerNote: string;
  // WA message builder
  waMsg: (model: string) => string;
}

export const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    logoTagline:      'Official Motorcycle Dealer — Lebanon',
    langLabel:        'العربية',
    heroBrands:       ['HAOJUE', 'ZONTES', 'LINHAI'],
    heroTitle:        'Find Your Perfect Ride',
    heroSub:          'Browse our full collection of premium motorcycles & scooters. Contact us directly on WhatsApp for pricing and availability.',
    browseCatalog:    'Browse Catalog',
    ourModels:        'Our Models',
    tapToInquire:     'Tap any model to inquire about pricing via WhatsApp',
    allModels:        'All Models',
    showing:          'Showing',
    models:           'models',
    priceRequest:     'Price on request',
    inquire:          'Inquire on WhatsApp',
    viewDetails:      'View Details',
    backToCatalog:    'Back to Catalog',
    overview:         'Overview',
    keyFeatures:      'Key Features',
    specifications:   'Specifications',
    notFoundTitle:    'Model not found',
    notFoundSub:      'We could not find the bike you were looking for.',
    authorizedDealer: 'Authorized Dealer',
    basedInLebanon:   'Based in Lebanon',
    whatsappInquiry:  'WhatsApp Inquiry',
    afterSalesService:'After-Sales Service',
    footerNote:       'All prices are available on request via WhatsApp. Images are for illustration purposes.',
    waMsg: (model) => `Hi! I'm interested in the ${model}. Could you please send me details and pricing? Thank you.`,
  },
  ar: {
    logoTagline:      'وكيل رسمي للدراجات النارية — لبنان',
    langLabel:        'English',
    heroBrands:       ['هاوجيو', 'زونتيس', 'لينهاي'],
    heroTitle:        'اعثر على دراجتك المثالية',
    heroSub:          'تصفح مجموعتنا الكاملة من الدراجات النارية والسكوتر الفاخرة. تواصل معنا مباشرة عبر واتساب للأسعار والتوفر.',
    browseCatalog:    'تصفح الكتالوج',
    ourModels:        'موديلاتنا',
    tapToInquire:     'اضغط على أي موديل للاستفسار عن السعر عبر واتساب',
    allModels:        'كل الموديلات',
    showing:          'عرض',
    models:           'موديل',
    priceRequest:     'السعر عند الطلب',
    inquire:          'استفسر عبر واتساب',
    viewDetails:      'عرض التفاصيل',
    backToCatalog:    'العودة إلى الكتالوج',
    overview:         'نظرة عامة',
    keyFeatures:      'الميزات الرئيسية',
    specifications:   'المواصفات',
    notFoundTitle:    'الموديل غير موجود',
    notFoundSub:      'لم نتمكن من العثور على الدراجة التي تبحث عنها.',
    authorizedDealer: 'وكيل معتمد',
    basedInLebanon:   'متواجدون في لبنان',
    whatsappInquiry:  'استفسار واتساب',
    afterSalesService:'خدمة ما بعد البيع',
    footerNote:       'جميع الأسعار متاحة عند الطلب عبر واتساب. الصور للإيضاح فقط.',
    waMsg: (model) => `مرحبا! أنا مهتم بـ ${model}. هل يمكنك إرسال التفاصيل والسعر؟ شكراً.`,
  },
};
