import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Bike } from '@prisma/client';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

/** Shape the public Angular catalog expects (snake_case bilingual fields) */
function mapBike(b: Bike) {
  return {
    id:          b.id,
    slug:        b.slug,
    brand:       b.brand,
    model:       b.model,
    type_en:     b.typeEn,
    type_ar:     b.typeAr,
    engine:      b.engine,
    power:       b.power,
    desc_en:     b.descEn,
    desc_ar:     b.descAr,
    intro_en:    b.introEn,
    intro_ar:    b.introAr,
    features_en: b.featuresEn,
    features_ar: b.featuresAr,
    specs:       b.specs,
    emoji:       b.emoji,
    image:       b.image,
    gallery:     b.gallery,
    published:   b.published,
    sortOrder:   b.sortOrder,
    createdAt:   b.createdAt,
    updatedAt:   b.updatedAt,
  };
}

/** Shape the admin panel expects — camelCase throughout (matches DTO and Angular interface) */
function mapBikeAdmin(b: Bike) {
  return {
    id:          b.id,
    slug:        b.slug,
    brand:       b.brand,
    model:       b.model,
    typeEn:      b.typeEn,
    typeAr:      b.typeAr,
    engine:      b.engine,
    power:       b.power,
    descEn:      b.descEn,
    descAr:      b.descAr,
    introEn:     b.introEn,
    introAr:     b.introAr,
    featuresEn:  b.featuresEn,
    featuresAr:  b.featuresAr,
    specs:       b.specs,
    emoji:       b.emoji,
    image:       b.image,
    gallery:     b.gallery,
    published:   b.published,
    sortOrder:   b.sortOrder,
    createdAt:   b.createdAt,
    updatedAt:   b.updatedAt,
  };
}

@Injectable()
export class BikesService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Public ────────────────────────────────────────────

  async findAllPublished() {
    const bikes = await this.prisma.bike.findMany({
      where:   { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
    return bikes.map(mapBike);
  }

  async findBySlug(slug: string) {
    const bike = await this.prisma.bike.findUnique({ where: { slug } });
    if (!bike || !bike.published) throw new NotFoundException('Bike not found');
    return mapBike(bike);
  }

  // ─── Admin ─────────────────────────────────────────────

  async findAll() {
    const bikes = await this.prisma.bike.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
    return bikes.map(mapBikeAdmin);
  }

  async findOne(id: string) {
    const bike = await this.prisma.bike.findUnique({ where: { id } });
    if (!bike) throw new NotFoundException('Bike not found');
    return mapBikeAdmin(bike);
  }

  async create(dto: CreateBikeDto) {
    const exists = await this.prisma.bike.findUnique({
      where: { slug: dto.slug },
    });
    if (exists) throw new ConflictException(`Slug "${dto.slug}" already exists`);

    const bike = await this.prisma.bike.create({ data: dto });
    return mapBikeAdmin(bike);
  }

  async update(id: string, dto: UpdateBikeDto) {
    await this.findOne(id); // throws if not found

    // If slug is changing, ensure uniqueness
    const newSlug = (dto as any).slug as string | undefined;
    if (newSlug) {
      const conflict = await this.prisma.bike.findFirst({
        where: { slug: newSlug, NOT: { id } },
      });
      if (conflict) throw new ConflictException(`Slug "${newSlug}" already exists`);
    }

    const bike = await this.prisma.bike.update({ where: { id }, data: dto });
    return mapBikeAdmin(bike);
  }

  async remove(id: string) {
    await this.findOne(id); // throws if not found
    await this.prisma.bike.delete({ where: { id } });
    return { deleted: true };
  }
}
