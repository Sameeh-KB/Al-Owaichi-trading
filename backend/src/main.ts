import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ── Global API prefix ──────────────────────────────────────
  app.setGlobalPrefix('api');

  // ── CORS ───────────────────────────────────────────────────
  const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:4200';
  app.enableCors({
    origin:      corsOrigin.split(',').map((o) => o.trim()),
    credentials: true,
  });

  // ── Validation ─────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:            true,   // strip unknown fields
      forbidNonWhitelisted: false,  // don't throw on extras (lenient for admin)
      transform:            true,   // auto-cast primitives
    }),
  );

  // ── Ensure uploads directory exists ────────────────────────
  const uploadDir = process.env.UPLOAD_DIR ?? './uploads';
  fs.mkdirSync(path.resolve(uploadDir), { recursive: true });

  // ── Start ──────────────────────────────────────────────────
  const port = parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);
  console.log(`\n🚀 Al Owaichi Trading API running on http://localhost:${port}/api`);
}
bootstrap();
