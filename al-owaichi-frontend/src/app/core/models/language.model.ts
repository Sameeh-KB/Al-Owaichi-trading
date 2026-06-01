export type Lang = 'en' | 'ar';

export interface Translations {
  // Header
  logoTagline: string;
  langLabel:   string;
  navProducts: string;
  navShowroom: string;
  navBrands:   string;
  navInquire:  string;
  // Hero
  heroBrands:   string[];
  heroOverline: string;
  heroTitle:    string;
  heroSub:      string;
  browseCatalog: string;
  // Hero stat bar
  statBrands:   string;
  statModels:   string;
  statService:  string;
  statDelivery: string;
  statBrandsLabel:   string;
  statModelsLabel:   string;
  statServiceLabel:  string;
  statDeliveryLabel: string;
  // Catalog
  ourModels:   string;
  tapToInquire: string;
  allModels:   string;
  showing:     string;
  models:      string;
  // Card
  priceRequest: string;
  inquire:      string;
  viewDetails:  string;
  // Detail page
  backToCatalog:  string;
  overview:       string;
  keyFeatures:    string;
  specifications: string;
  notFoundTitle:  string;
  notFoundSub:    string;
  // About strip
  authorizedDealer: string;
  basedInLebanon:   string;
  whatsappInquiry:  string;
  afterSalesService: string;
  // Footer
  footerNote: string;
  // Products page
  noResults:    string;
  // Brands page
  ourBrands:    string;
  ourBrandsSub: string;
  viewModels:   string;
  series:       string;
  // Showroom page
  visitShowroom:    string;
  visitShowroomSub: string;
  location:         string;
  openingHours:     string;
  contactUs:        string;
  getDirections:    string;
  whatWeOffer:      string;
  openInMaps:       string;
  closedLabel:      string;
  services:         string[];
  // WA message builder
  waMsg: (model: string) => string;
}

export const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    logoTagline:      'Official Motorcycle Dealer',
    langLabel:        'العربية',
    navProducts:      'Products',
    navShowroom:      'Showroom',
    navBrands:        'Brands',
    navInquire:       'Inquire Now',
    heroBrands:       ['HAOJUE', 'ZONTES', 'LINHAI', 'DAYANG', 'NEXY', 'QJMOTOR', 'YAMAHA'],
    heroOverline:     'Official Dealer · Lebanon',
    heroTitle:        'Find Your Perfect Ride',
    heroSub:          'Premium motorcycles & scooters from the world\'s leading brands. Contact us directly for pricing and availability.',
    browseCatalog:    'Browse Catalog',
    statBrands:       '7',
    statModels:       '14+',
    statService:      '24h',
    statDelivery:     '100%',
    statBrandsLabel:  'Brands',
    statModelsLabel:  'Models',
    statServiceLabel: 'Response',
    statDeliveryLabel:'Genuine Parts',
    ourModels:        'Our Models',
    tapToInquire:     'Browse our full range — tap any model for details and pricing',
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
    noResults:        'No bikes match this filter.',
    ourBrands:        'Our Brands',
    ourBrandsSub:     'Official dealer for 7 international motorcycle and scooter manufacturers.',
    viewModels:       'View Models',
    series:           'Series',
    visitShowroom:    'Visit Our Showroom',
    visitShowroomSub: 'Come see the full range in person. Our team is ready to help you find the right bike.',
    location:         'Location',
    openingHours:     'Opening Hours',
    contactUs:        'Contact Us',
    getDirections:    'Get Directions',
    whatWeOffer:      'What We Offer',
    openInMaps:       'Open in Google Maps',
    closedLabel:      'Closed',
    services: [
      'Authorized sales for all 7 brands',
      'Genuine spare parts',
      'After-sales service and maintenance',
      'Test rides available on request',
      'WhatsApp inquiry and pricing',
    ],
    waMsg: (model) => `Hi! I'm interested in the ${model}. Could you please send me details and pricing? Thank you.`,
  },
  ar: {
    logoTagline:      'وكيل رسمي للدراجات النارية',
    langLabel:        'English',
    navProducts:      'المنتجات',
    navShowroom:      'المعرض',
    navBrands:        'الماركات',
    navInquire:       'استفسر الآن',
    heroBrands:       ['هاوجيو', 'زونتيس', 'لينهاي', 'دايانج', 'نيكسي', 'كيوجي', 'ياماها'],
    heroOverline:     'وكيل رسمي · لبنان',
    heroTitle:        'اعثر على دراجتك المثالية',
    heroSub:          'دراجات نارية وسكوتر فاخرة من أبرز العلامات التجارية العالمية. تواصل معنا مباشرة للأسعار والتوفر.',
    browseCatalog:    'تصفح الكتالوج',
    statBrands:       '٧',
    statModels:       '١٤+',
    statService:      '٢٤س',
    statDelivery:     '١٠٠%',
    statBrandsLabel:  'ماركة',
    statModelsLabel:  'موديل',
    statServiceLabel: 'استجابة',
    statDeliveryLabel:'قطع أصلية',
    ourModels:        'موديلاتنا',
    tapToInquire:     'تصفح مجموعتنا الكاملة — اضغط على أي موديل للتفاصيل والأسعار',
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
    noResults:        'لا توجد دراجات تطابق هذا الفلتر.',
    ourBrands:        'ماركاتنا',
    ourBrandsSub:     'وكيل رسمي لـ 7 شركات عالمية للدراجات النارية والسكوترات.',
    viewModels:       'عرض الموديلات',
    series:           'سيريز',
    visitShowroom:    'زوروا معرضنا',
    visitShowroomSub: 'تفضلوا لرؤية المجموعة الكاملة شخصياً. فريقنا جاهز لمساعدتكم في اختيار الدراجة المناسبة.',
    location:         'الموقع',
    openingHours:     'ساعات العمل',
    contactUs:        'تواصل معنا',
    getDirections:    'احصل على الاتجاهات',
    whatWeOffer:      'ما نقدمه',
    openInMaps:       'افتح في خرائط جوجل',
    closedLabel:      'مغلق',
    services: [
      'مبيعات موكّلة لجميع الماركات السبع',
      'قطع غيار أصلية',
      'خدمة ما بعد البيع والصيانة',
      'تجربة قيادة متاحة عند الطلب',
      'استفسار عبر واتساب والأسعار',
    ],
    waMsg: (model) => `مرحبا! أنا مهتم بـ ${model}. هل يمكنك إرسال التفاصيل والسعر؟ شكراً.`,
  },
};
