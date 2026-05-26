/**
 * Seed — Al Owaichi Trading
 *
 * Bikes sourced from the official client inventory sheet (Motorcycles.pdf).
 * Photos are served from backend/uploads/ (copied from the Media library).
 * Detail-page links are stored in the specs array for admin reference.
 *
 * Run:  npm run db:seed
 * Safe to re-run — wipes bikes and re-inserts; admin user is upserted.
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const BASE = 'http://localhost:3000/uploads';

async function main() {

  // ── Admin user ─────────────────────────────────────────────────────────
  const email    = process.env.ADMIN_EMAIL    ?? 'admin@alowaichi.com';
  const password = process.env.ADMIN_PASSWORD ?? 'Admin1234!';
  const name     = process.env.ADMIN_NAME     ?? 'Admin';

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.upsert({
    where:  { email },
    update: {},
    create: { email, passwordHash, name, role: 'ADMIN' },
  });
  console.log(`✅ Admin: ${user.email}`);

  // ── Wipe existing bikes ────────────────────────────────────────────────
  await prisma.bikeEvent.deleteMany({});
  await prisma.inquiry.deleteMany({});
  await prisma.bike.deleteMany({});
  console.log('🗑️  Cleared existing bikes\n');

  // ── Bike data ──────────────────────────────────────────────────────────
  const bikes = [

    /* ══════════════════════════════════════════════
       HAOJUE
    ══════════════════════════════════════════════ */
    {
      slug:    'haojue-uhr-150',
      brand:   'haojue',
      model:   'UHR 150',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '150cc',
      power:   '—',
      descEn:  'Stylish premium scooter with modern lines, full LED lighting, and a refined 150cc engine for smooth urban commuting.',
      descAr:  'سكوتر فاخر أنيق بتصميم عصري وإضاءة LED كاملة ومحرك 150cc مصقول للتنقل الحضري السلس.',
      introEn: 'The UHR 150 brings premium scooter design to the everyday commuter. Its sharp, aerodynamic bodywork conceals a refined 150cc engine built for Lebanese city traffic — effortless to ride, easy to park, and built to last.',
      introAr: 'يجلب UHR 150 تصميم السكوتر الفاخر إلى المستخدم اليومي. هيكله الحاد الديناميكي يخفي محرك 150cc مصقولاً مصمماً لحركة المرور في المدن اللبنانية — سهل الركوب، سهل الإيقاف، ومبني للصمود.',
      featuresEn: [
        'Refined 150cc 4-stroke engine',
        'Full LED front and rear lighting',
        'Digital instrument cluster',
        'Underseat helmet storage',
        'Stylish aerodynamic bodywork',
        'Tubeless tires for easy repairs',
        'Electric start with push-button convenience',
      ],
      featuresAr: [
        'محرك 150cc 4 أشواط مصقول',
        'إضاءة LED أمامية وخلفية كاملة',
        'لوحة قياس رقمية',
        'مساحة تخزين للخوذة تحت المقعد',
        'هيكل ديناميكي أنيق',
        'إطارات بدون أنبوب لإصلاح سهل',
        'تشغيل كهربائي بضغطة زر',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '150cc, 4-stroke, single-cylinder' },
        { label_en: 'Cooling',       label_ar: 'التبريد',          value: 'Air-cooled' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Scooter' },
        { label_en: 'Detail Page',   label_ar: 'صفحة التفاصيل',   value: 'https://en.haojue.com/UHR150/' },
      ],
      emoji:     '🛵',
      image:     `${BASE}/haojue-uhr-150-1.webp`,
      gallery: [
        `${BASE}/haojue-uhr-150-1.webp`,
        `${BASE}/haojue-uhr-150-2.jpg`,
        `${BASE}/haojue-uhr-150-3.jpg`,
        `${BASE}/haojue-uhr-150-4.webp`,
      ],
      sortOrder: 10,
    },

    {
      slug:    'haojue-ufr-150',
      brand:   'haojue',
      model:   'UFR 150',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '150cc',
      power:   '—',
      descEn:  'Sport-styled 150cc scooter with bold fairing design, LED headlight, and sporty riding posture.',
      descAr:  'سكوتر 150cc بتصميم رياضي وهيكل جريء ومصباح LED أمامي ووضعية ركوب رياضية.',
      introEn: 'The UFR 150 takes scooter styling to a sportier level. With aggressive fairing lines borrowed from performance bikes, a punchy 150cc engine, and full LED lighting, it turns heads while handling the daily grind with ease.',
      introAr: 'يأخذ UFR 150 تصميم السكوتر إلى مستوى أكثر رياضية. بخطوط هيكل عدوانية مستوحاة من دراجات الأداء، ومحرك 150cc قوي، وإضاءة LED كاملة، يلفت الأنظار بينما يتعامل مع التنقل اليومي بسهولة.',
      featuresEn: [
        'Sport-fairing aerodynamic design',
        '150cc single-cylinder engine',
        'Full LED twin headlight',
        'Digital multi-function instrument',
        'Underseat storage compartment',
        'Wide footrest for comfort',
        'Tubeless tires standard',
      ],
      featuresAr: [
        'تصميم ديناميكي رياضي',
        'محرك أحادي الأسطوانة 150cc',
        'مصباح أمامي مزدوج LED',
        'لوحة قياس رقمية متعددة الوظائف',
        'مساحة تخزين تحت المقعد',
        'منصة قدم عريضة للراحة',
        'إطارات بدون أنبوب قياسية',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '150cc, 4-stroke, single-cylinder' },
        { label_en: 'Cooling',       label_ar: 'التبريد',          value: 'Air-cooled' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Scooter' },
        { label_en: 'Detail Page',   label_ar: 'صفحة التفاصيل',   value: 'https://en.haojue.com/UFR150/' },
      ],
      emoji:     '🛵',
      image:     `${BASE}/haojue-ufr-150-1.jpg`,
      gallery: [
        `${BASE}/haojue-ufr-150-1.jpg`,
        `${BASE}/haojue-ufr-150-2.jpg`,
        `${BASE}/haojue-ufr-150-3.jpg`,
        `${BASE}/haojue-ufr-150-4.jpeg`,
      ],
      sortOrder: 20,
    },

    {
      slug:    'haojue-nfr-125',
      brand:   'haojue',
      model:   'NFR 125',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '125cc',
      power:   '—',
      descEn:  'Compact 125cc scooter ideal for beginners and city riders. Lightweight, fuel-efficient, and easy to handle.',
      descAr:  'سكوتر مدمج 125cc مثالي للمبتدئين وراكبي المدن. خفيف الوزن وموفر للوقود وسهل التعامل.',
      introEn: 'The NFR 125 is the entry point into Haojue\'s scooter range — and it delivers more than the price tag suggests. Compact enough to weave through Beirut traffic, light enough for anyone to handle, and reliable enough to trust every single day.',
      introAr: 'NFR 125 هو نقطة البداية في مجموعة سكوترات هاوجيو — ويقدم أكثر مما يوحي به سعره. مدمج بما يكفي للتنقل في حركة مرور بيروت، خفيف بما يكفي لأي شخص، وموثوق بما يكفي للثقة به كل يوم.',
      featuresEn: [
        'Lightweight 125cc 4-stroke engine',
        'Step-through ergonomics',
        'LED daytime running light',
        'Digital LCD instrument cluster',
        'Underseat storage',
        'Low seat height — beginner-friendly',
        'Tubeless tires',
        'Electric start',
      ],
      featuresAr: [
        'محرك خفيف 125cc 4 أشواط',
        'تصميم step-through مريح',
        'إضاءة نهارية LED',
        'لوحة قياس رقمية LCD',
        'تخزين تحت المقعد',
        'ارتفاع مقعد منخفض — مناسب للمبتدئين',
        'إطارات بدون أنبوب',
        'تشغيل كهربائي',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '125cc, 4-stroke, single-cylinder' },
        { label_en: 'Cooling',       label_ar: 'التبريد',          value: 'Air-cooled' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Scooter' },
        { label_en: 'Detail Page',   label_ar: 'صفحة التفاصيل',   value: 'https://en.haojue.com/NFR125/' },
      ],
      emoji:     '🛵',
      image:     `${BASE}/haojue-nfr-125-1.jpg`,
      gallery: [
        `${BASE}/haojue-nfr-125-1.jpg`,
        `${BASE}/haojue-nfr-125-2.jpg`,
        `${BASE}/haojue-nfr-125-3.jpg`,
        `${BASE}/haojue-nfr-125-4.jpg`,
      ],
      sortOrder: 30,
    },

    {
      slug:    'haojue-vx-125',
      brand:   'haojue',
      model:   'VX 125',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '125cc',
      power:   '—',
      descEn:  'Retro-inspired 125cc scooter with classic round headlight and modern reliability. A timeless look for the city.',
      descAr:  'سكوتر 125cc مستوحى من الكلاسيكيات بمصباح أمامي دائري وموثوقية حديثة. مظهر خالد للمدينة.',
      introEn: 'Vintage soul, modern engineering. The VX 125 pairs retro-classic styling — round headlight, clean lines, chrome accents — with contemporary Haojue reliability. Perfect for riders who want to stand out without standing still.',
      introAr: 'روح كلاسيكية، هندسة حديثة. يجمع VX 125 بين التصميم الكلاسيكي الرجعي — مصباح دائري وخطوط نظيفة ولمسات كروم — وموثوقية هاوجيو المعاصرة. مثالي للراكبين الذين يريدون التميز.',
      featuresEn: [
        'Retro-classic round headlight design',
        '125cc reliable 4-stroke engine',
        'Chrome accent details',
        'Comfortable bench seat',
        'Analogue-style instrument cluster',
        'Underseat storage',
        'Tubeless tires',
      ],
      featuresAr: [
        'تصميم كلاسيكي بمصباح دائري',
        'محرك 125cc موثوق 4 أشواط',
        'تفاصيل كروم',
        'مقعد مريح',
        'لوحة قياس بطراز تناظري',
        'تخزين تحت المقعد',
        'إطارات بدون أنبوب',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '125cc, 4-stroke, single-cylinder' },
        { label_en: 'Cooling',       label_ar: 'التبريد',          value: 'Air-cooled' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
        { label_en: 'Detail Page',   label_ar: 'صفحة التفاصيل',   value: 'https://en.haojue.com/VX125/' },
      ],
      emoji:     '🛵',
      image:     `${BASE}/haojue-vx-125-1.webp`,
      gallery: [
        `${BASE}/haojue-vx-125-1.webp`,
        `${BASE}/haojue-vx-125-2.webp`,
        `${BASE}/haojue-vx-125-3.jpg`,
        `${BASE}/haojue-vx-125-4.jpg`,
        `${BASE}/haojue-vx-125-5.jpg`,
        `${BASE}/haojue-vx-125-6.png`,
      ],
      sortOrder: 40,
    },

    {
      slug:    'haojue-nmax-s',
      brand:   'haojue',
      model:   'Nmax S',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '—',
      power:   '—',
      descEn:  'Premium maxi-scooter with a sporty stance and advanced features for the discerning urban commuter.',
      descAr:  'سكوتر فاخر بوضعية رياضية وميزات متقدمة لراكب المدينة المميز.',
      introEn: 'The Nmax S sits at the top of Haojue\'s scooter lineup. With a premium finish, advanced electronics, and a comfortable long-distance riding position, it bridges the gap between urban convenience and touring capability.',
      introAr: 'يتربع Nmax S في قمة تشكيلة سكوترات هاوجيو. بتشطيب فاخر وإلكترونيات متقدمة ووضعية ركوب مريحة للمسافات الطويلة، يسد الفجوة بين راحة التنقل الحضري وقدرات السياحة.',
      featuresEn: [
        'Premium maxi-scooter design',
        'Advanced digital instrument panel',
        'Smart keyless ignition',
        'Large underseat storage',
        'USB charging port',
        'Full LED lighting front and rear',
        'Wide 14-inch wheels for highway stability',
      ],
      featuresAr: [
        'تصميم سكوتر فاخر',
        'لوحة قياس رقمية متقدمة',
        'إشعال ذكي بدون مفتاح',
        'تخزين كبير تحت المقعد',
        'منفذ شحن USB',
        'إضاءة LED كاملة أمامية وخلفية',
        'عجلات 14 بوصة لاستقرار الطريق السريع',
      ],
      specs: [
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Maxi Scooter' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
      ],
      emoji:     '🛵',
      // No photos available yet — placeholder
      image:     `${BASE}/haojue-uhr-150-1.jpg`,
      gallery:   [],
      published:  true,
      sortOrder:  50,
    },

    {
      slug:    'haojue-zmax-180',
      brand:   'haojue',
      model:   'Zmax 180',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '180cc',
      power:   '—',
      descEn:  'Powerful 180cc maxi-scooter with bold styling and the performance to match. Ideal for open-road cruising.',
      descAr:  'سكوتر فاخر 180cc بتصميم جريء وأداء يضاهيه. مثالي للقيادة على الطريق المفتوح.',
      introEn: 'When 125cc is not enough. The Zmax 180 steps up with a larger displacement engine, wider tires, and the kind of presence that commands attention. Equally at ease in city traffic or out on the open road between towns.',
      introAr: 'عندما لا تكفي 125cc. يرتقي Zmax 180 بمحرك أكبر سعة وإطارات أعرض وحضور يستقطب الأنظار. مريح بالقدر نفسه في حركة المرور الحضرية أو على الطريق المفتوح.',
      featuresEn: [
        '180cc powerful single-cylinder engine',
        'Large maxi-scooter proportions',
        'Wide tires for stability',
        'Full LED lighting',
        'Digital instrument cluster',
        'Large underseat storage',
        'Highway-capable performance',
      ],
      featuresAr: [
        'محرك أحادي الأسطوانة قوي 180cc',
        'أبعاد سكوتر فاخر كبيرة',
        'إطارات عريضة للاستقرار',
        'إضاءة LED كاملة',
        'لوحة قياس رقمية',
        'تخزين كبير تحت المقعد',
        'أداء مناسب للطريق السريع',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '180cc, 4-stroke, single-cylinder' },
        { label_en: 'Cooling',       label_ar: 'التبريد',          value: 'Air-cooled' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Scooter' },
      ],
      emoji:     '🛵',
      // No photos available yet — placeholder
      image:     `${BASE}/haojue-ufr-150-1.jpg`,
      gallery:   [],
      published:  true,
      sortOrder:  60,
    },

    /* ══════════════════════════════════════════════
       ZONTES
    ══════════════════════════════════════════════ */
    {
      slug:    'zontes-368g',
      brand:   'zontes',
      model:   '368G',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '368cc',
      power:   '—',
      descEn:  'Large-displacement 368cc maxi-scooter with TFT display, advanced electronics, and GT touring comfort.',
      descAr:  'سكوتر فاخر 368cc بشاشة TFT وإلكترونيات متقدمة وراحة السياحة.',
      introEn: 'The 368G redefines what a scooter can be. A 368cc liquid-cooled engine, full-colour TFT display, multiple ride modes, and a plush touring seat combine to create a machine that blurs the line between scooter and sport-tourer.',
      introAr: 'يعيد 368G تعريف ما يمكن أن يكون عليه السكوتر. محرك 368cc مبرد بالسائل، شاشة TFT ملونة كاملة، أوضاع قيادة متعددة، ومقعد سياحي مريح تتحد لإنشاء آلة تمحو الحدود بين السكوتر والدراجة السياحية.',
      featuresEn: [
        '368cc liquid-cooled single-cylinder engine',
        'Full-colour TFT dashboard',
        'Multiple ride modes',
        'Keyless smart ignition',
        'Large-capacity underseat storage',
        'USB / Type-C charging',
        'Front and rear disc brakes with ABS',
        'LED Matrix headlight',
      ],
      featuresAr: [
        'محرك أحادي 368cc مبرد بالسائل',
        'شاشة TFT ملونة كاملة',
        'أوضاع قيادة متعددة',
        'إشعال ذكي بدون مفتاح',
        'تخزين واسع تحت المقعد',
        'شحن USB / Type-C',
        'مكابح قرصية أمامية وخلفية مع ABS',
        'مصباح أمامي LED Matrix',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '368cc, liquid-cooled, single-cylinder' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Maxi Scooter' },
        { label_en: 'Detail Page',   label_ar: 'صفحة التفاصيل',   value: 'https://zontes.co.uk/zt368t-g/' },
      ],
      emoji:     '🛵',
      image:     `${BASE}/zontes-368g-1.png`,
      gallery: [
        `${BASE}/zontes-368g-1.png`,
        `${BASE}/zontes-368g-2.jpg`,
        `${BASE}/zontes-368g-3.jpg`,
        `${BASE}/zontes-368g-4.webp`,
      ],
      sortOrder: 70,
    },

    {
      slug:    'zontes-703rr',
      brand:   'zontes',
      model:   '703RR',
      typeEn:  'Sports Bike',
      typeAr:  'دراجة رياضية',
      engine:  '700cc',
      power:   '—',
      descEn:  'Flagship 700cc supersport with full aerodynamic fairing, cornering ABS, TFT display, and serious track credentials.',
      descAr:  'دراجة رياضية رائدة 700cc بهيكل ديناميكي كامل وـABS للمنعطفات وشاشة TFT وبيانات حماسية على المضمار.',
      introEn: 'Zontes\' most ambitious machine. The 703RR packs a 700cc parallel-twin, full race-replica bodywork, lean-angle sensitive cornering ABS, multiple ride modes, and a 5-inch TFT display into a package that challenges bikes costing twice as much.',
      introAr: 'أكثر آلات زونتيس طموحاً. تحشد 703RR توأم متوازٍ 700cc، هيكل سباق كامل، ABS للمنعطفات الحساس لزاوية الميل، أوضاع قيادة متعددة، وشاشة TFT 5 بوصات في حزمة تتحدى دراجات تكلف ضعفها.',
      featuresEn: [
        '700cc parallel-twin liquid-cooled engine',
        'Full race-replica aerodynamic fairing',
        'Cornering ABS with IMU',
        '5-inch full-colour TFT display',
        'Multiple ride modes (Sport / Street / Rain)',
        'Traction Control System',
        'Quick-shift up and down',
        'Bosch fuel injection',
      ],
      featuresAr: [
        'محرك توأم متوازٍ 700cc مبرد بالسائل',
        'هيكل سباق ديناميكي كامل',
        'ABS للمنعطفات مع IMU',
        'شاشة TFT ملونة 5 بوصات',
        'أوضاع قيادة متعددة (رياضي/شارع/مطر)',
        'نظام التحكم في الجر',
        'تغيير سريع للتروس صعوداً وهبوطاً',
        'حقن وقود بوش',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '700cc, liquid-cooled, parallel-twin' },
        { label_en: 'Displacement',  label_ar: 'سعة المحرك',      value: '700 cc' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: '6-speed manual w/ quickshifter' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Sports Bike' },
        { label_en: 'Detail Page',   label_ar: 'صفحة التفاصيل',   value: 'https://zontes.co.uk/zt703-rr/' },
      ],
      emoji:     '🏎️',
      image:     `${BASE}/zontes-703rr-1.webp`,
      gallery: [
        `${BASE}/zontes-703rr-1.webp`,
        `${BASE}/zontes-703rr-2.jpg`,
        `${BASE}/zontes-703rr-3.webp`,
        `${BASE}/zontes-703rr-4.webp`,
        `${BASE}/zontes-703rr-5.webp`,
      ],
      sortOrder: 80,
    },

    /* ══════════════════════════════════════════════
       DAYANG
    ══════════════════════════════════════════════ */
    {
      slug:    'dayang-cargo-125',
      brand:   'dayang',
      model:   'Cargo 125',
      typeEn:  'Cargo Motorcycle',
      typeAr:  'دراجة شحن',
      engine:  '125cc',
      power:   '—',
      descEn:  'Purpose-built 125cc cargo motorcycle for deliveries and utility work. Strong frame, high load capacity.',
      descAr:  'دراجة شحن 125cc مصممة للتوصيلات والأعمال العامة. هيكل قوي وسعة حمولة عالية.',
      introEn: 'Built for work, not for show. The Dayang Cargo 125 is engineered for Lebanon\'s delivery riders and small business owners — a rugged 125cc workhorse with a reinforced frame and high load capacity that keeps running mile after mile.',
      introAr: 'مبنية للعمل لا للعرض. مصممة Dayang Cargo 125 لراكبي التوصيل وأصحاب الأعمال الصغيرة في لبنان — دراجة عمل 125cc متينة بهيكل مقوى وسعة حمولة عالية تواصل العمل ميلاً بعد ميل.',
      featuresEn: [
        'Reinforced high-load cargo frame',
        'Reliable 125cc 4-stroke engine',
        'Large rear cargo platform',
        'Heavy-duty suspension',
        'Low fuel consumption for delivery work',
        'Easy maintenance for fleet operators',
        'Tubeless tires for reduced downtime',
      ],
      featuresAr: [
        'هيكل شحن مقوى بحمولة عالية',
        'محرك 125cc موثوق 4 أشواط',
        'منصة شحن خلفية واسعة',
        'تعليق ثقيل التحمل',
        'استهلاك وقود منخفض لعمل التوصيل',
        'صيانة سهلة لمشغلي الأساطيل',
        'إطارات بدون أنبوب لتقليل وقت التعطل',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '125cc, 4-stroke, single-cylinder' },
        { label_en: 'Cooling',       label_ar: 'التبريد',          value: 'Air-cooled' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: '4-speed manual' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Cargo Motorcycle' },
      ],
      emoji:     '📦',
      image:     `${BASE}/dayang-cargo-125-1.png`,
      gallery: [
        `${BASE}/dayang-cargo-125-1.png`,
        `${BASE}/dayang-cargo-125-2.jpg`,
        `${BASE}/dayang-cargo-125-3.jpg`,
      ],
      sortOrder: 90,
    },

    {
      slug:    'dayang-adv-150',
      brand:   'dayang',
      model:   'ADV 150',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '150cc',
      power:   '—',
      descEn:  'Adventure-styled 150cc scooter with high ground clearance and rugged looks for city and light off-road.',
      descAr:  'سكوتر 150cc بتصميم المغامرة وخلوص أرضي عالٍ ومظهر متين للمدينة والطرق الخفيفة خارج الأسفلت.',
      introEn: 'ADV attitude in a practical scooter package. The Dayang ADV 150 brings the adventure-scooter look — tall stance, rugged bodywork, spoke-style wheels — to the everyday commuter, with a punchy 150cc engine ready for whatever the road throws at it.',
      introAr: 'روح ADV في حزمة سكوتر عملية. يجلب Dayang ADV 150 مظهر سكوتر المغامرة — وضعية مرتفعة وهيكل متين وعجلات بطراز أسلاك — إلى المستخدم اليومي، بمحرك 150cc جاهز لأي شيء يضعه الطريق أمامه.',
      featuresEn: [
        'Adventure-scooter styling with tall stance',
        '150cc 4-stroke engine',
        'High ground clearance for rough roads',
        'Rugged bodywork with knuckle guards',
        'Large windscreen for wind protection',
        'Underseat storage',
        'ABS braking system',
      ],
      featuresAr: [
        'تصميم سكوتر مغامرة بوضعية مرتفعة',
        'محرك 150cc 4 أشواط',
        'خلوص أرضي عالٍ للطرق الوعرة',
        'هيكل متين مع حماية المقود',
        'زجاج أمامي كبير للحماية من الرياح',
        'تخزين تحت المقعد',
        'نظام فرامل ABS',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '150cc, 4-stroke, single-cylinder' },
        { label_en: 'Cooling',       label_ar: 'التبريد',          value: 'Air-cooled' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Adventure Scooter' },
        { label_en: 'Detail Page',   label_ar: 'صفحة التفاصيل',   value: 'http://en.dayang-motorcycle.com/product/parameters.jsp?rid=66' },
      ],
      emoji:     '🛵',
      image:     `${BASE}/dayang-adv-150-1.jpg`,
      gallery: [
        `${BASE}/dayang-adv-150-1.jpg`,
        `${BASE}/dayang-adv-150-2.jpg`,
        `${BASE}/dayang-adv-150-3.jpg`,
        `${BASE}/dayang-adv-150-4.png`,
      ],
      sortOrder: 100,
    },

    /* ══════════════════════════════════════════════
       NEXY
    ══════════════════════════════════════════════ */
    {
      slug:    'nexy-125',
      brand:   'nexy',
      model:   'NEXY 125',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '125cc',
      power:   '—',
      descEn:  'European-designed 125cc scooter with clean minimalist styling and connected smart features.',
      descAr:  'سكوتر 125cc بتصميم أوروبي وأسلوب بسيط وميزات ذكية متصلة.',
      introEn: 'Designed in Europe, built for the city. The NEXY 125 brings a clean minimalist aesthetic together with smart connectivity features — Bluetooth, smartphone integration, and a modern digital dashboard — in a lightweight 125cc package.',
      introAr: 'مصمم في أوروبا، مبني للمدينة. يجمع NEXY 125 بين الجمالية البسيطة النظيفة وميزات الاتصال الذكية — بلوتوث وتكامل الهاتف الذكي ولوحة رقمية حديثة — في حزمة خفيفة الوزن 125cc.',
      featuresEn: [
        'European minimalist design',
        '125cc 4-stroke reliable engine',
        'Bluetooth connectivity',
        'Smartphone app integration',
        'Modern digital dashboard',
        'Low seat height for easy reach',
        'Disc brake front with ABS',
        'USB charging port',
      ],
      featuresAr: [
        'تصميم أوروبي بسيط',
        'محرك 125cc موثوق 4 أشواط',
        'اتصال بلوتوث',
        'تكامل تطبيق الهاتف الذكي',
        'لوحة رقمية حديثة',
        'ارتفاع مقعد منخفض لسهولة الوصول',
        'مكبح قرصي أمامي مع ABS',
        'منفذ شحن USB',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '125cc, 4-stroke, single-cylinder' },
        { label_en: 'Displacement',  label_ar: 'سعة المحرك',      value: '125 cc' },
        { label_en: 'Cooling',       label_ar: 'التبريد',          value: 'Air-cooled' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Scooter' },
        { label_en: 'Detail Page',   label_ar: 'صفحة التفاصيل',   value: 'https://www.kl-motors.com/en/nexy-125/' },
      ],
      emoji:     '🛵',
      image:     `${BASE}/nexy-125-1.png`,
      gallery: [
        `${BASE}/nexy-125-1.png`,
        `${BASE}/nexy-125-2.png`,
        `${BASE}/nexy-125-3.png`,
        `${BASE}/nexy-125-4.jpg`,
        `${BASE}/nexy-125-5.jpg`,
      ],
      sortOrder: 110,
    },

    /* ══════════════════════════════════════════════
       LINHAI
    ══════════════════════════════════════════════ */
    {
      slug:    'linhai-atv-650',
      brand:   'linhai',
      model:   'ATV 650',
      typeEn:  'ATV',
      typeAr:  'رباعية العجلات',
      engine:  '650cc',
      power:   '—',
      descEn:  'Heavy-duty 650cc ATV with 4WD, independent suspension, and serious off-road capability for work and adventure.',
      descAr:  'رباعية عجلات ثقيلة 650cc بدفع رباعي وتعليق مستقل وقدرة جدية على الطرق الوعرة للعمل والمغامرة.',
      introEn: 'Linhai\'s most powerful ATV. The 650cc Landforce is built to take on the toughest terrain Lebanon has to offer — mountain trails, agricultural land, or coastal tracks — with a powerful liquid-cooled engine, selectable 4WD, and independent suspension that smooths out whatever it encounters.',
      introAr: 'أقوى رباعية عجلات من لينهاي. مبنية Landforce 650cc لمواجهة أصعب التضاريس التي يقدمها لبنان — مسارات جبلية وأراضٍ زراعية ومسارات ساحلية — بمحرك قوي مبرد بالسائل ودفع رباعي قابل للاختيار وتعليق مستقل.',
      featuresEn: [
        '650cc liquid-cooled 4-stroke engine',
        'Selectable 2WD / 4WD with differential lock',
        'Independent double A-arm suspension',
        'CVT automatic transmission with reverse',
        'Front and rear cargo racks',
        'Hydraulic disc brakes all around',
        'Electric power steering',
        'Digital instrument cluster',
      ],
      featuresAr: [
        'محرك 650cc 4 أشواط مبرد بالسائل',
        'دفع 2WD / 4WD قابل للاختيار مع قفل تفاضلي',
        'تعليق مزدوج مستقل بذراع A',
        'ناقل CVT تلقائي مع رجوع',
        'حوامل شحن أمامية وخلفية',
        'مكابح قرصية هيدروليكية في كل مكان',
        'توجيه كهربائي بالطاقة',
        'لوحة قياس رقمية',
      ],
      specs: [
        { label_en: 'Engine',           label_ar: 'المحرك',          value: '650cc, liquid-cooled, single-cylinder' },
        { label_en: 'Displacement',     label_ar: 'سعة المحرك',      value: '650 cc' },
        { label_en: 'Drivetrain',       label_ar: 'نظام الدفع',      value: 'Selectable 2WD / 4WD / Diff-lock' },
        { label_en: 'Transmission',     label_ar: 'ناقل الحركة',     value: 'CVT automatic with reverse' },
        { label_en: 'Type',             label_ar: 'النوع',            value: 'ATV' },
        { label_en: 'Detail Page',      label_ar: 'صفحة التفاصيل',   value: 'https://www.atv-linhai.com/linhai-landforce-650-product/' },
      ],
      emoji:     '🚜',
      image:     `${BASE}/linhai-atv-650-1.jpg`,
      gallery: [
        `${BASE}/linhai-atv-650-1.jpg`,
        `${BASE}/linhai-atv-650-2.jpg`,
        `${BASE}/linhai-atv-650-3.jpg`,
        `${BASE}/linhai-atv-650-4.webp`,
      ],
      sortOrder: 120,
    },

    /* ══════════════════════════════════════════════
       QJMOTOR
    ══════════════════════════════════════════════ */
    {
      slug:    'qjmotor-sfa-1000-ag',
      brand:   'qjmotor',
      model:   'SFA 1000 AG',
      typeEn:  'ATV',
      typeAr:  'رباعية العجلات',
      engine:  '1000cc',
      power:   '—',
      descEn:  'Professional-grade 1000cc agricultural ATV built for heavy-duty farming, hauling, and rough terrain work.',
      descAr:  'رباعية عجلات زراعية احترافية 1000cc مبنية للزراعة الثقيلة والنقل والعمل على التضاريس الوعرة.',
      introEn: 'The SFA 1000 AG is not a toy — it\'s a professional agricultural workhorse. A 1000cc engine, heavy-duty 4WD drivetrain, and large cargo capacity make it the tool of choice for Lebanese farmers, estates, and rural businesses that need serious carrying and hauling capability.',
      introAr: 'SFA 1000 AG ليست لعبة — إنها آلة عمل زراعية احترافية. محرك 1000cc ونظام دفع رباعي ثقيل التحمل وسعة شحن كبيرة تجعلها الأداة المفضلة للمزارعين اللبنانيين والعقارات والشركات الريفية.',
      featuresEn: [
        '1000cc powerful multi-cylinder engine',
        'Heavy-duty 4WD agricultural drivetrain',
        'High-capacity front and rear cargo beds',
        'Heavy-duty independent suspension',
        'Hydraulic disc brakes all around',
        'Power steering for easy manoeuvring',
        'Roll-over protection structure (ROPS)',
        'Tow hitch for trailer attachment',
      ],
      featuresAr: [
        'محرك متعدد الأسطوانات 1000cc قوي',
        'نظام دفع رباعي زراعي ثقيل التحمل',
        'صناديق شحن أمامية وخلفية عالية السعة',
        'تعليق مستقل ثقيل التحمل',
        'مكابح قرصية هيدروليكية في كل مكان',
        'توجيه بالطاقة لسهولة المناورة',
        'هيكل حماية من الانقلاب (ROPS)',
        'خطاف قطر لتعلق المقطورة',
      ],
      specs: [
        { label_en: 'Engine',           label_ar: 'المحرك',          value: '1000cc, multi-cylinder' },
        { label_en: 'Drivetrain',       label_ar: 'نظام الدفع',      value: '4WD' },
        { label_en: 'Transmission',     label_ar: 'ناقل الحركة',     value: 'Automatic with reverse' },
        { label_en: 'Type',             label_ar: 'النوع',            value: 'Agricultural ATV' },
      ],
      emoji:     '🚜',
      image:     `${BASE}/qjmotor-sfa1000-1.webp`,
      gallery: [
        `${BASE}/qjmotor-sfa1000-1.webp`,
        `${BASE}/qjmotor-sfa1000-2.jpg`,
        `${BASE}/qjmotor-sfa1000-3.jpg`,
        `${BASE}/qjmotor-sfa1000-4.jpg`,
      ],
      sortOrder: 130,
    },

    /* ══════════════════════════════════════════════
       YAMAHA
    ══════════════════════════════════════════════ */
    {
      slug:    'yamaha-aerox-155',
      brand:   'yamaha',
      model:   'Aerox 155',
      typeEn:  'Scooter',
      typeAr:  'سكوتر',
      engine:  '155cc',
      power:   '—',
      descEn:  'Sporty 155cc maxi-scooter with VVA variable valve actuation, traction control, and aggressive styling.',
      descAr:  'سكوتر رياضي فاخر 155cc بتقنية VVA لتغيير صمامات متغير والتحكم في الجر والتصميم العدواني.',
      introEn: 'The Aerox 155 brings Yamaha\'s Blue Core technology to the maxi-scooter segment. Variable Valve Actuation (VVA) delivers strong power across the rev range, while the aggressive MotoGP-inspired bodywork, traction control, and smart-key ignition make it one of the most complete 155cc scooters available.',
      introAr: 'يجلب Aerox 155 تقنية Blue Core من ياماها إلى قطاع السكوترات الفاخرة. توفر تقنية VVA قوة قوية عبر نطاق الدوران، بينما يجعله الهيكل العدواني المستوحى من MotoGP والتحكم في الجر وإشعال بالمفتاح الذكي أحد أكثر سكوترات 155cc اكتمالاً.',
      featuresEn: [
        '155cc Blue Core engine with VVA technology',
        'Traction Control System (TCS)',
        'Smart-key keyless ignition',
        'Full LED headlight and taillight',
        'Y-Connect smartphone Bluetooth app',
        'Large underseat storage (25L)',
        '14-inch front / 13-inch rear wheels',
        'Front and rear disc brakes with ABS',
      ],
      featuresAr: [
        'محرك Blue Core 155cc بتقنية VVA',
        'نظام التحكم في الجر (TCS)',
        'إشعال ذكي بدون مفتاح',
        'مصباح أمامي وخلفي LED كامل',
        'تطبيق بلوتوث Y-Connect للهاتف الذكي',
        'تخزين كبير تحت المقعد (25 لتر)',
        'عجلات أمامية 14 بوصة / خلفية 13 بوصة',
        'مكابح قرصية أمامية وخلفية مع ABS',
      ],
      specs: [
        { label_en: 'Engine',        label_ar: 'المحرك',          value: '155cc, liquid-cooled, single-cylinder (Blue Core VVA)' },
        { label_en: 'Displacement',  label_ar: 'سعة المحرك',      value: '155 cc' },
        { label_en: 'Cooling',       label_ar: 'التبريد',          value: 'Liquid-cooled' },
        { label_en: 'Transmission',  label_ar: 'ناقل الحركة',     value: 'CVT automatic' },
        { label_en: 'Seat Height',   label_ar: 'ارتفاع المقعد',   value: '795 mm' },
        { label_en: 'Type',          label_ar: 'النوع',            value: 'Maxi Scooter' },
      ],
      emoji:     '🛵',
      image:     `${BASE}/aerox-155-1.jpg`,
      gallery: [
        `${BASE}/aerox-155-1.jpg`,
        `${BASE}/aerox-155-2.jpg`,
      ],
      sortOrder: 140,
    },
  ];

  // ── Insert ─────────────────────────────────────────────────────────────
  for (const bike of bikes) {
    await prisma.bike.create({ data: bike });
    console.log(`  + ${(bike.brand as string).toUpperCase().padEnd(10)} ${bike.model}`);
  }

  console.log(`\n✅ ${bikes.length} bikes seeded`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
