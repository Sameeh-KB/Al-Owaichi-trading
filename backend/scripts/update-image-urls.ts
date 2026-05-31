/**
 * One-shot script — updates bike image + gallery URLs in the DB to the new .png paths.
 * Safe: only touches image/gallery columns; all other data (inquiries, events) is preserved.
 *
 * Run:  npx ts-node --project tsconfig.json scripts/update-image-urls.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BASE = 'http://localhost:3000';

const updates: Record<string, { image: string; gallery: string[] }> = {
  'haojue-uhr-150': {
    image:   `${BASE}/uploads/haojue-uhr-150-1.png`,
    gallery: [`${BASE}/uploads/haojue-uhr-150-2.png`, `${BASE}/uploads/haojue-uhr-150-3.png`, `${BASE}/uploads/haojue-uhr-150-4.png`],
  },
  'haojue-ufr-150': {
    image:   `${BASE}/uploads/haojue-ufr-150-1.png`,
    gallery: [`${BASE}/uploads/haojue-ufr-150-2.png`, `${BASE}/uploads/haojue-ufr-150-3.png`, `${BASE}/uploads/haojue-ufr-150-4.png`],
  },
  'haojue-nfr-125': {
    image:   `${BASE}/uploads/haojue-nfr-125-1.png`,
    gallery: [`${BASE}/uploads/haojue-nfr-125-2.png`, `${BASE}/uploads/haojue-nfr-125-3.png`, `${BASE}/uploads/haojue-nfr-125-4.png`],
  },
  'haojue-vx-125': {
    image:   `${BASE}/uploads/haojue-vx-125-1.png`,
    gallery: [],
  },
  'haojue-nmax-s': {
    image:   `${BASE}/uploads/haojue-uhr-150-1.png`,
    gallery: [`${BASE}/uploads/haojue-uhr-150-2.png`, `${BASE}/uploads/haojue-uhr-150-3.png`],
  },
  'haojue-zmax-180': {
    image:   `${BASE}/uploads/haojue-ufr-150-1.png`,
    gallery: [`${BASE}/uploads/haojue-ufr-150-2.png`, `${BASE}/uploads/haojue-ufr-150-3.png`],
  },
  'zontes-368g': {
    image:   `${BASE}/uploads/zontes-368g-1.png`,
    gallery: [`${BASE}/uploads/zontes-368g-2.png`, `${BASE}/uploads/zontes-368g-3.png`, `${BASE}/uploads/zontes-368g-4.png`],
  },
  'zontes-703rr': {
    image:   `${BASE}/uploads/zontes-703rr-1.png`,
    gallery: [`${BASE}/uploads/zontes-703rr-2.png`, `${BASE}/uploads/zontes-703rr-3.png`, `${BASE}/uploads/zontes-703rr-4.png`, `${BASE}/uploads/zontes-703rr-5.png`],
  },
  'dayang-cargo-125': {
    image:   `${BASE}/uploads/dayang-cargo-125-1.png`,
    gallery: [`${BASE}/uploads/dayang-cargo-125-2.png`, `${BASE}/uploads/dayang-cargo-125-3.png`],
  },
  'dayang-adv-150': {
    image:   `${BASE}/uploads/dayang-adv-150-1.png`,
    gallery: [`${BASE}/uploads/dayang-adv-150-2.png`, `${BASE}/uploads/dayang-adv-150-3.png`],
  },
  'nexy-125': {
    image:   `${BASE}/uploads/nexy-125-1.png`,
    gallery: [`${BASE}/uploads/nexy-125-2.png`, `${BASE}/uploads/nexy-125-3.png`, `${BASE}/uploads/nexy-125-4.png`],
  },
  'linhai-atv-650': {
    image:   `${BASE}/uploads/linhai-atv-650-1.png`,
    gallery: [`${BASE}/uploads/linhai-atv-650-2.png`, `${BASE}/uploads/linhai-atv-650-3.png`, `${BASE}/uploads/linhai-atv-650-4.png`],
  },
  'yamaha-aerox-155': {
    image:   `${BASE}/uploads/yamaha-aerox-155-1.png`,
    gallery: [`${BASE}/uploads/yamaha-aerox-155-2.png`],
  },
};

async function main() {
  console.log('🖼  Updating bike image URLs to PNG…\n');

  for (const [slug, data] of Object.entries(updates)) {
    const bike = await prisma.bike.findUnique({ where: { slug } });
    if (!bike) { console.log(`  ⚠️  Not found: ${slug}`); continue; }

    await prisma.bike.update({
      where: { slug },
      data:  { image: data.image, gallery: data.gallery },
    });
    console.log(`  ✅ ${slug}`);
    console.log(`       image:   ${data.image}`);
    if (data.gallery.length) console.log(`       gallery: ${data.gallery.length} images`);
  }

  console.log('\n✅ All image URLs updated.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
