import { Injectable } from '@nestjs/common';
import { EventType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TrackEventDto } from './dto/track-event.dto';

export interface BikeSummary {
  bikeId:     string | null;
  slug:       string | null;
  brand:      string | null;
  model:      string | null;
  views:      number;
  cardClicks: number;
  whatsapp:   number;
  inquiries:  number;
  gallery:    number;
  total:      number;
}

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Public: record a single event ─────────────────────

  async track(dto: TrackEventDto): Promise<void> {
    let bikeId = dto.bikeId ?? null;

    // Resolve slug → id when only slug is provided
    if (!bikeId && dto.slug) {
      const bike = await this.prisma.bike.findUnique({
        where:  { slug: dto.slug },
        select: { id: true },
      });
      bikeId = bike?.id ?? null;
    }

    await this.prisma.bikeEvent.create({
      data: {
        bikeId:    bikeId,
        event:     dto.event,
        lang:      dto.lang ?? 'en',
        sessionId: dto.sessionId ?? null,
      },
    });
  }

  // ─── Admin: aggregated overview ────────────────────────

  /**
   * Returns a summary row per bike (ordered by total events desc),
   * plus a grand-total row at the end.
   */
  async summary(since?: Date): Promise<BikeSummary[]> {
    const whereDate = since ? { createdAt: { gte: since } } : {};

    // Raw counts grouped by bikeId + event
    const rows = await this.prisma.bikeEvent.groupBy({
      by:      ['bikeId', 'event'],
      where:   whereDate,
      _count:  { _all: true },
      orderBy: { bikeId: 'asc' },
    });

    // Fetch all referenced bikes in one query
    const bikeIds = [...new Set(rows.map((r) => r.bikeId).filter(Boolean))] as string[];
    const bikes   = await this.prisma.bike.findMany({
      where:  { id: { in: bikeIds } },
      select: { id: true, slug: true, brand: true, model: true },
    });
    const bikeMap = new Map(bikes.map((b) => [b.id, b]));

    // Aggregate into per-bike summary
    const summaryMap = new Map<string | null, BikeSummary>();

    const getOrCreate = (bikeId: string | null): BikeSummary => {
      if (!summaryMap.has(bikeId)) {
        const bike = bikeId ? bikeMap.get(bikeId) : null;
        summaryMap.set(bikeId, {
          bikeId,
          slug:       bike?.slug  ?? null,
          brand:      bike?.brand ?? null,
          model:      bike?.model ?? null,
          views:      0,
          cardClicks: 0,
          whatsapp:   0,
          inquiries:  0,
          gallery:    0,
          total:      0,
        });
      }
      return summaryMap.get(bikeId)!;
    };

    for (const row of rows) {
      const entry = getOrCreate(row.bikeId);
      const count = row._count._all;
      entry.total += count;

      switch (row.event as EventType) {
        case EventType.VIEW:       entry.views      += count; break;
        case EventType.CARD_CLICK: entry.cardClicks += count; break;
        case EventType.WHATSAPP:   entry.whatsapp   += count; break;
        case EventType.INQUIRY:    entry.inquiries  += count; break;
        case EventType.GALLERY:    entry.gallery    += count; break;
      }
    }

    // Sort by total desc
    return [...summaryMap.values()].sort((a, b) => b.total - a.total);
  }

  /**
   * Per-bike breakdown — daily event counts for the last N days.
   */
  async bikeTimeline(bikeId: string, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const events = await this.prisma.bikeEvent.findMany({
      where:   { bikeId, createdAt: { gte: since } },
      select:  { event: true, createdAt: true, lang: true, sessionId: true },
      orderBy: { createdAt: 'asc' },
    });

    // Aggregate by date
    const byDay = new Map<string, Record<string, number>>();
    for (const e of events) {
      const day = e.createdAt.toISOString().slice(0, 10); // YYYY-MM-DD
      if (!byDay.has(day)) byDay.set(day, {});
      const bucket = byDay.get(day)!;
      bucket[e.event] = (bucket[e.event] ?? 0) + 1;
    }

    // Unique sessions
    const uniqueSessions = new Set(events.map((e) => e.sessionId).filter(Boolean)).size;

    // Total by event type
    const totals: Record<string, number> = {};
    for (const e of events) {
      totals[e.event] = (totals[e.event] ?? 0) + 1;
    }

    return {
      bikeId,
      days,
      uniqueSessions,
      totals,
      timeline: [...byDay.entries()].map(([date, counts]) => ({ date, ...counts })),
    };
  }

  /**
   * Top N bikes by a specific event type (or total).
   */
  async topBikes(event?: EventType, limit = 10, since?: Date) {
    const whereDate = since ? { createdAt: { gte: since } } : {};
    const where     = event ? { ...whereDate, event } : whereDate;

    const rows = await this.prisma.bikeEvent.groupBy({
      by:      ['bikeId'],
      where:   { ...where, bikeId: { not: null } },
      _count:  { _all: true },
      orderBy: { _count: { bikeId: 'desc' } },
      take:    limit,
    });

    const bikeIds = rows.map((r) => r.bikeId as string);
    const bikes   = await this.prisma.bike.findMany({
      where:  { id: { in: bikeIds } },
      select: { id: true, slug: true, brand: true, model: true, image: true },
    });
    const bikeMap = new Map(bikes.map((b) => [b.id, b]));

    return rows.map((r) => ({
      ...bikeMap.get(r.bikeId!),
      count: r._count._all,
    }));
  }
}
