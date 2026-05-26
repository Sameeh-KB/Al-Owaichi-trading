import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import {
  AnalyticsPublicController,
  AnalyticsAdminController,
} from './analytics.controller';

@Module({
  controllers: [AnalyticsPublicController, AnalyticsAdminController],
  providers:   [AnalyticsService],
  exports:     [AnalyticsService],
})
export class AnalyticsModule {}
