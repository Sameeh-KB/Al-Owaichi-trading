import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventType } from '@prisma/client';
import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// ─── Public: fire-and-forget event tracking ───────────────────
@Controller('analytics')
export class AnalyticsPublicController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * POST /api/analytics/event
   *
   * Body: { bikeId?, slug?, event, lang?, sessionId? }
   *
   * Always returns 204 — failures are swallowed so they never
   * break the user experience.
   */
  @Post('event')
  @HttpCode(HttpStatus.NO_CONTENT)
  async track(@Body() dto: TrackEventDto): Promise<void> {
    // Fire-and-forget — don't await so the response is instant
    this.analyticsService.track(dto).catch(() => {/* silently ignore */});
  }
}

// ─── Admin: metrics dashboard ─────────────────────────────────
@Controller('admin/analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsAdminController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * GET /api/admin/analytics?since=2025-01-01
   *
   * Summary table: all bikes ranked by total engagement.
   */
  @Get()
  summary(@Query('since') since?: string) {
    const sinceDate = since ? new Date(since) : undefined;
    return this.analyticsService.summary(sinceDate);
  }

  /**
   * GET /api/admin/analytics/top?event=WHATSAPP&limit=5&since=2025-01-01
   *
   * Top bikes by a given event type (or total if event omitted).
   */
  @Get('top')
  top(
    @Query('event') event?: EventType,
    @Query('limit') limit?: string,
    @Query('since') since?: string,
  ) {
    return this.analyticsService.topBikes(
      event,
      limit ? parseInt(limit, 10) : 10,
      since ? new Date(since) : undefined,
    );
  }

  /**
   * GET /api/admin/analytics/:bikeId?days=30
   *
   * Daily timeline + totals for a single bike.
   */
  @Get(':bikeId')
  bikeTimeline(
    @Param('bikeId') bikeId: string,
    @Query('days') days?: string,
  ) {
    return this.analyticsService.bikeTimeline(
      bikeId,
      days ? parseInt(days, 10) : 30,
    );
  }
}
