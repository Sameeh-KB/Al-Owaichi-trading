-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "InquirySource" AS ENUM ('WHATSAPP', 'FORM', 'OTHER');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('VIEW', 'CARD_CLICK', 'WHATSAPP', 'INQUIRY', 'GALLERY');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bikes" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "typeEn" TEXT NOT NULL,
    "typeAr" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descAr" TEXT NOT NULL,
    "introEn" TEXT NOT NULL,
    "introAr" TEXT NOT NULL,
    "featuresEn" TEXT[],
    "featuresAr" TEXT[],
    "specs" JSONB NOT NULL,
    "emoji" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gallery" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" TEXT NOT NULL,
    "bikeId" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "message" TEXT NOT NULL,
    "source" "InquirySource" NOT NULL DEFAULT 'WHATSAPP',
    "lang" TEXT NOT NULL DEFAULT 'en',
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bike_events" (
    "id" TEXT NOT NULL,
    "bikeId" TEXT,
    "event" "EventType" NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'en',
    "sessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bike_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploads" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "uploads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bikes_slug_key" ON "bikes"("slug");

-- CreateIndex
CREATE INDEX "bikes_brand_idx" ON "bikes"("brand");

-- CreateIndex
CREATE INDEX "bikes_published_idx" ON "bikes"("published");

-- CreateIndex
CREATE INDEX "inquiries_status_idx" ON "inquiries"("status");

-- CreateIndex
CREATE INDEX "inquiries_bikeId_idx" ON "inquiries"("bikeId");

-- CreateIndex
CREATE INDEX "bike_events_bikeId_idx" ON "bike_events"("bikeId");

-- CreateIndex
CREATE INDEX "bike_events_event_idx" ON "bike_events"("event");

-- CreateIndex
CREATE INDEX "bike_events_createdAt_idx" ON "bike_events"("createdAt");

-- CreateIndex
CREATE INDEX "bike_events_bikeId_event_idx" ON "bike_events"("bikeId", "event");

-- AddForeignKey
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "bikes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bike_events" ADD CONSTRAINT "bike_events_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "bikes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
