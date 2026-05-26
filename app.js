/* ═══════════════════════════════════════════════════
   Al Owaichi Trading — Motorcycle Catalog
   app.js  · Catalog data + Bilingual + Filter + Theme
   ═══════════════════════════════════════════════════ */

/* ──────────────────────────────────────
   ⚙️  CONFIG — swap these when ready
────────────────────────────────────── */
const CONFIG = {
    waNumber:      '96170000000',   // ← Replace with real Lebanon WhatsApp number (no + sign)
    dealerName_en: 'Al Owaichi Trading',
    dealerName_ar: 'مؤسسة العويشي',
};


/* ──────────────────────────────────────
   🏍️  CATALOG DATA
   Add / remove bikes here freely.
   Images: use real product photo URLs
   when available, otherwise the card
   shows a branded placeholder.
────────────────────────────────────── */
const CATALOG = [

    /* ════════ HAOJUE ════════ */
    {
        brand:   'haojue',
        model:   'SR200',
        type_en: 'Sport Naked',
        type_ar: 'رياضي',
        engine:  '200cc',
        power:   '18.5 HP',
        desc_en: 'A sporty commuter with sharp styling and a fuel-injected 200cc engine. Perfect balance of performance and daily usability.',
        desc_ar: 'دراجة رياضية للتنقل بتصميم حاد ومحرك 200cc بالحقن المباشر. توازن مثالي بين الأداء والاستخدام اليومي.',
        emoji:   '🏍️',
        image:   '', // ← Paste product image URL here
    },
    {
        brand:   'haojue',
        model:   'HJ150-3',
        type_en: 'Commuter',
        type_ar: 'تنقل يومي',
        engine:  '150cc',
        power:   '12 HP',
        desc_en: 'Reliable, fuel-efficient daily commuter. Low maintenance costs and proven Honda-sourced engine technology.',
        desc_ar: 'دراجة موثوقة وموفرة للوقود للاستخدام اليومي. تكاليف صيانة منخفضة وتقنية محرك مستمدة من هوندا.',
        emoji:   '🛵',
        image:   '',
    },
    {
        brand:   'haojue',
        model:   'DR160S',
        type_en: 'Street Naked',
        type_ar: 'ناكيد',
        engine:  '160cc',
        power:   '15 HP',
        desc_en: 'Aggressive street naked with muscular lines and a punchy 160cc single. Turns heads on every street.',
        desc_ar: 'دراجة ناكيد عدوانية بخطوط عضلية ومحرك 160cc قوي. تلفت الأنظار في كل شارع.',
        emoji:   '🏍️',
        image:   '',
    },

    /* ════════ ZONTES ════════ */
    {
        brand:   'zontes',
        model:   'ZT310-R',
        type_en: 'Sport',
        type_ar: 'رياضي',
        engine:  '310cc',
        power:   '35 HP',
        desc_en: 'Full-fairing sport bike with liquid-cooled 310cc engine, TFT display, and traction control. A serious machine.',
        desc_ar: 'دراجة رياضية بهيكل كامل ومحرك 310cc مبرد بالسائل وشاشة TFT وتحكم في الجر. آلة جدية.',
        emoji:   '🏎️',
        image:   '',
    },
    {
        brand:   'zontes',
        model:   'ZT310-T',
        type_en: 'Naked',
        type_ar: 'ناكيد',
        engine:  '310cc',
        power:   '34 HP',
        desc_en: 'Aggressive naked streetfighter. Same punchy 310cc heart, ride modes, cornering ABS, and a bold standout look.',
        desc_ar: 'دراجة ناكيد عدوانية. نفس محرك 310cc القوي مع أوضاع القيادة وـABS للتعرجات وتصميم بارز.',
        emoji:   '🏍️',
        image:   '',
    },
    {
        brand:   'zontes',
        model:   'ZT155-U1',
        type_en: 'Scooter',
        type_ar: 'سكوتر',
        engine:  '155cc',
        power:   '14 HP',
        desc_en: 'Premium urban scooter with smart keyless ignition, TFT dash, USB charging, and large underseat storage.',
        desc_ar: 'سكوتر حضري فاخر مع إشعال ذكي بدون مفتاح وشاشة TFT وشحن USB وتخزين واسع تحت المقعد.',
        emoji:   '🛵',
        image:   '',
    },
    {
        brand:   'zontes',
        model:   'ZT125-U',
        type_en: 'Scooter',
        type_ar: 'سكوتر',
        engine:  '125cc',
        power:   '11 HP',
        desc_en: 'Entry-level scooter for beginners and city riders. Excellent fuel economy and easy maneuverability.',
        desc_ar: 'سكوتر للمبتدئين وراكبي المدينة. اقتصاد ممتاز في الوقود وسهولة مناورة.',
        emoji:   '🛵',
        image:   '',
    },

    /* ════════ LINHAI ════════ */
    {
        brand:   'linhai',
        model:   'LH150T-6',
        type_en: 'Scooter',
        type_ar: 'سكوتر',
        engine:  '150cc',
        power:   '10 HP',
        desc_en: 'Practical and affordable scooter built for everyday urban transport. Easy to ride and park.',
        desc_ar: 'سكوتر عملي بسعر مناسب مصمم للتنقل الحضري اليومي. سهل الركوب والإيقاف.',
        emoji:   '🛵',
        image:   '',
    },
    {
        brand:   'linhai',
        model:   'LH250-3A',
        type_en: 'Motorcycle',
        type_ar: 'دراجة نارية',
        engine:  '250cc',
        power:   '22 HP',
        desc_en: 'Versatile mid-size bike for city and open road alike. Comfortable upright riding position.',
        desc_ar: 'دراجة متعددة الاستخدام متوسطة الحجم مناسبة للمدينة والطريق المفتوح. وضعية ركوب مريحة.',
        emoji:   '🏍️',
        image:   '',
    },
    {
        brand:   'linhai',
        model:   'LH400 ATV',
        type_en: 'ATV',
        type_ar: 'رباعية العجلات',
        engine:  '400cc',
        power:   '28 HP',
        desc_en: 'Powerful all-terrain quad for off-road adventure, farming, and utility work. Built tough.',
        desc_ar: 'رباعية عجلات قوية للمغامرات خارج الطريق والزراعة والأعمال العامة. مبنية بمتانة.',
        emoji:   '🚜',
        image:   '',
    },
];


/* ──────────────────────────────────────
   🌐  TRANSLATIONS
────────────────────────────────────── */
const T = {
    en: {
        inquire:      'Inquire on WhatsApp',
        priceRequest: 'Price on request',
        showing:      'Showing',
        models:       'models',
        waMsg: (model) => `Hi! I'm interested in the ${model}. Could you please send me details and pricing? Thank you.`,
    },
    ar: {
        inquire:      'استفسر عبر واتساب',
        priceRequest: 'السعر عند الطلب',
        showing:      'عرض',
        models:       'موديل',
        waMsg: (model) => `مرحبا! أنا مهتم بـ ${model}. هل يمكنك إرسال التفاصيل والسعر؟ شكراً.`,
    },
};


/* ──────────────────────────────────────
   🔧  STATE
────────────────────────────────────── */
let lang   = 'en';
let filter = 'all';


/* ──────────────────────────────────────
   🎨  THEME
────────────────────────────────────── */

function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aot-theme', theme);
}

document.getElementById('themeToggle').addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
});

// Respect OS-level changes when no manual preference has been saved
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('aot-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});


/* ──────────────────────────────────────
   📜  SCROLL — header shadow
────────────────────────────────────── */
const headerEl = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
    headerEl.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });


/* ──────────────────────────────────────
   🏗️  RENDER
────────────────────────────────────── */

function waUrl(model) {
    const msg = encodeURIComponent(T[lang].waMsg(model));
    return `https://wa.me/${CONFIG.waNumber}?text=${msg}`;
}

/** WhatsApp SVG icon — inline, no extra file needed */
const WA_SVG = `<svg class="wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>`;

/** Build one card's HTML */
function buildCard(bike) {
    const t      = T[lang];
    const type   = lang === 'ar' ? bike.type_ar : bike.type_en;
    const desc   = lang === 'ar' ? bike.desc_ar : bike.desc_en;
    const brand  = bike.brand.toUpperCase();
    const hasImg = bike.image && bike.image.trim() !== '';

    const imgHtml = hasImg
        ? `<img class="card-img" src="${bike.image}" alt="${bike.model}" loading="lazy">`
        : `<div class="card-img-placeholder"><span>${bike.emoji}</span><span>${bike.model}</span></div>`;

    return `
    <article class="bike-card" data-brand="${bike.brand}">
        <div class="card-img-wrap">
            ${imgHtml}
            <span class="card-brand-tag ${bike.brand}">${brand}</span>
        </div>
        <div class="card-body">
            <span class="card-type">${type}</span>
            <h3 class="card-model">${bike.model}</h3>
            <div class="card-specs">
                <span class="spec-item"><span class="spec-icon">⚙</span>${bike.engine}</span>
                <span class="spec-item"><span class="spec-icon">⚡</span>${bike.power}</span>
            </div>
            <p class="card-desc">${desc}</p>
            <div class="card-footer">
                <div class="price-wrap">
                    <div class="price-label">${t.priceRequest}</div>
                </div>
                <a class="wa-btn"
                   href="${waUrl(bike.model)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Inquire about ${bike.model} on WhatsApp">
                    ${WA_SVG}
                    ${t.inquire}
                </a>
            </div>
        </div>
    </article>`;
}

/** Re-render the whole grid */
function renderGrid() {
    const items = filter === 'all'
        ? CATALOG
        : CATALOG.filter(b => b.brand === filter);

    document.getElementById('bikesGrid').innerHTML = items.map(buildCard).join('');
    document.getElementById('countNum').textContent = items.length;
}

/** Swap all data-en / data-ar text nodes */
function applyLanguage() {
    const isAr = lang === 'ar';
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir  = isAr ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    document.getElementById('langLabel').textContent = isAr ? 'English' : 'العربية';
    renderGrid();
}


/* ──────────────────────────────────────
   🎛️  EVENT LISTENERS
────────────────────────────────────── */

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        filter = btn.dataset.filter;
        renderGrid();
    });
});

// Language toggle
document.getElementById('langToggle').addEventListener('click', () => {
    lang = lang === 'en' ? 'ar' : 'en';
    applyLanguage();
});

// Smooth scroll for hero CTA
document.querySelector('.hero-cta')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
});


/* ──────────────────────────────────────
   🚀  INIT
────────────────────────────────────── */
renderGrid();
