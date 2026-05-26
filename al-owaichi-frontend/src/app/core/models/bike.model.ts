export type BrandKey = 'haojue' | 'zontes' | 'linhai' | 'dayang' | 'nexy' | 'qjmotor' | 'yamaha';
export type FilterKey = 'all' | BrandKey;

export interface BikeSpec {
  label_en: string;
  label_ar: string;
  value:    string;
  value_ar?: string;
}

export interface Bike {
  slug:        string;
  brand:       BrandKey;
  model:       string;
  type_en:     string;
  type_ar:     string;
  engine:      string;
  power:       string;
  desc_en:     string;
  desc_ar:     string;
  intro_en:    string;
  intro_ar:    string;
  features_en: string[];
  features_ar: string[];
  specs:       BikeSpec[];
  emoji:       string;
  image:       string;
  gallery?:    string[];
}

export const BRAND_COLORS: Record<BrandKey, string> = {
  haojue:   'var(--accent)',
  zontes:   '#2563eb',
  linhai:   '#16a34a',
  dayang:   '#d97706',
  nexy:     '#7c3aed',
  qjmotor:  '#dc2626',
  yamaha:   '#1d4ed8',
};
