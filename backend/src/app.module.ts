import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BikesModule } from './bikes/bikes.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { UploadsModule } from './uploads/uploads.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    // Load .env first so all other modules can access config
    ConfigModule.forRoot({ isGlobal: true }),

    // Serve uploaded files at /uploads/*
    ServeStaticModule.forRoot({
      rootPath:   join(process.cwd(), 'uploads'),
      serveRoot:  '/uploads',
      serveStaticOptions: { index: false },
    }),

    PrismaModule,
    AuthModule,
    BikesModule,
    InquiriesModule,
    UploadsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
