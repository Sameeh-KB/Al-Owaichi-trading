export type BrandKey = 'haojue' | 'zontes' | 'linhai';
export type FilterKey = 'all' | BrandKey;

export interface BikeSpec {
  /** Bilingual label */
  label_en: string;
  label_ar: string;
  /** Value — usually numeric/technical, so often left untranslated */
  value:    string;
  value_ar?: string;
}

export interface Bike {
  /** URL-safe identifier for /bike/:slug */
  slug:        string;

  brand:       BrandKey;
  model:       string;

  type_en:     string;
  type_ar:     string;

  engine:      string;
  power:       string;

  /** Short card description */
  desc_en:     string;
  desc_ar:     string;

  /** Longer marketing intro shown on the detail page */
  intro_en:    string;
  intro_ar:    string;

  /** Bullet list of standout features (5–8 items) */
  features_en: string[];
  features_ar: string[];

  /** Full spec table for the detail page */
  specs:       BikeSpec[];

  /** Fallback emoji shown when no image loads */
  emoji:       string;

  /** Hero/card image URL */
  image:       string;

  /** Optional gallery for the detail page */
  gallery?:    string[];
}

export const BRAND_COLORS: Record<BrandKey, string> = {
  haojue: 'var(--accent)',
  zontes: '#2563eb',
  linhai: '#16a34a',
};
