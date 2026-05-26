<div align="center">

# Al Owaichi Trading

**Full-stack bilingual motorcycle catalog platform**  
Lebanese dealer representing HAOJUE, ZONTES, and LINHAI brands

<br/>

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat-square&logo=angular&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18.3-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=flat-square&logo=prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)

<br/>

[Quick Start](#quick-start) &nbsp;·&nbsp; [Architecture](#architecture) &nbsp;·&nbsp; [API Reference](#api-reference) &nbsp;·&nbsp; [Database](#database-design) &nbsp;·&nbsp; [Deployment](#deployment)

</div>

---

## Overview

Al Owaichi Trading is a bilingual (Arabic / English) motorcycle showroom website. Customers browse the full catalog and read detailed specs in their preferred language. The admin team manages inventory, handles purchase inquiries, and monitors product engagement from a secure dashboard.

**Capabilities at a glance:**

| | Feature | Description |
|---|---|---|
| | Bilingual catalog | Full Arabic + English content with RTL layout support |
| | Product detail pages | Engine specs, feature lists, image galleries per model |
| | Lead capture | WhatsApp and form inquiries with CRM-style status tracking |
| | Engagement analytics | Tracks views, card clicks, WhatsApp taps, inquiries, gallery opens |
| | Admin dashboard | JWT-protected panel for inventory management and analytics |
| | File uploads | Multer-based image upload with public URL serving |
| | Embedded database | Bundled PostgreSQL binary — no separate server installation needed |

---

## Architecture

```
┌────────────────────────────────────┐        ┌──────────────────────────────────┐
│         Angular 21  :4200          │        │        NestJS 11  :3000          │
│  ─────────────────────────────     │        │  ──────────────────────────────  │
│  • Home / Catalog                  │◄──────►│  • REST API  (global /api)       │
│  • Bike detail page                │  HTTP  │  • JWT Auth  (passport-jwt)      │
│  • EN / AR language toggle         │  JSON  │  • Prisma ORM                    │
│  • Light / dark theme              │        │  • Multer file uploads           │
└────────────────────────────────────┘        │  • Analytics event pipeline      │
                                              └─────────────────┬────────────────┘
                                                                │ TCP :5434
                                              ┌─────────────────▼────────────────┐
                                              │   Embedded PostgreSQL 18.3       │
                                              │   Data dir  →  backend/.pg-data/ │
                                              │   Encoding  →  UTF-8             │
                                              └──────────────────────────────────┘
```

The PostgreSQL binaries ship as an npm package (`embedded-postgres`). No database setup is required for local development. For production, point `DATABASE_URL` at any managed PostgreSQL host — nothing else in the codebase changes.

---

## Repository Structure

```
Al-Owaichi-trading/
│
├── al-owaichi-frontend/              # Angular 21 SPA
│   └── src/app/
│       ├── core/
│       │   ├── models/               # bike.model.ts · language.model.ts
│       │   └── services/             # catalog · language · theme
│       ├── features/
│       │   ├── home/                 # Hero banner, catalog grid, bike cards
│       │   └── bike-detail/          # Specs, gallery, inquiry button
│       └── layout/                   # Header, Footer
│
└── backend/                          # NestJS REST API
    ├── prisma/
    │   ├── schema.prisma             # Source of truth for the database schema
    │   ├── seed.ts                   # Seeds admin user + 10 bikes
    │   └── migrations/               # Versioned SQL migration history
    ├── scripts/
    │   ├── embedded-db.ts            # Shared embedded-postgres configuration
    │   ├── db-start.ts               # Boots Postgres with UTF-8 encoding
    │   └── db-stop.ts                # Graceful shutdown
    └── src/
        ├── main.ts                   # Bootstrap: global prefix, CORS, ValidationPipe
        ├── app.module.ts             # Root module
        ├── prisma/                   # Global PrismaService
        ├── auth/                     # Login, JWT guard, strategy
        ├── bikes/                    # Public catalog + admin CRUD
        ├── inquiries/                # Lead capture + admin management
        ├── uploads/                  # Multer upload + static file serving
        └── analytics/                # Event tracking + metrics dashboard
```

---

## Database Design

Five tables managed entirely by Prisma migrations. Schema source: [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma).

<details>
<summary><strong>users</strong> — admin and staff accounts</summary>
<br/>

| Column | Type | Notes |
|--------|------|-------|
| `id` | `CUID` | Primary key |
| `email` | `String UNIQUE` | Login credential |
| `password_hash` | `String` | bcrypt, 10 rounds |
| `name` | `String` | Display name |
| `role` | `ADMIN \| STAFF` | Default `ADMIN` |
| `created_at` | `Timestamp` | Auto-set on insert |
| `updated_at` | `Timestamp` | Auto-updated on change |

</details>

<details>
<summary><strong>bikes</strong> — the product catalog</summary>
<br/>

| Column | Type | Notes |
|--------|------|-------|
| `id` | `CUID` | Primary key |
| `slug` | `String UNIQUE` | URL identifier, e.g. `haojue-hj150-2` |
| `brand` | `String` | `HAOJUE` / `ZONTES` / `LINHAI` |
| `model` | `String` | Model name |
| `type_en` / `type_ar` | `String` | Bike category in English and Arabic |
| `engine` / `power` | `String` | Technical summary |
| `desc_en` / `desc_ar` | `String` | Short description |
| `intro_en` / `intro_ar` | `String` | Long introduction |
| `features_en` / `features_ar` | `String[]` | Bullet-point feature lists |
| `specs` | `JSONB` | `[{ label_en, label_ar, value, value_ar? }]` |
| `emoji` | `String` | Model icon character |
| `image` | `String` | Main image URL |
| `gallery` | `String[]` | Additional image URLs |
| `published` | `Boolean` | Visibility flag, default `true` |
| `sort_order` | `Int` | Manual display ordering |

</details>

<details>
<summary><strong>inquiries</strong> — customer leads</summary>
<br/>

| Column | Type | Notes |
|--------|------|-------|
| `id` | `CUID` | Primary key |
| `bike_id` | `FK → bikes` | Nullable |
| `name` / `phone` / `email` | `String?` | Contact information |
| `message` | `String` | Customer message |
| `source` | `WHATSAPP \| FORM \| OTHER` | Lead channel |
| `lang` | `String` | `en` or `ar` |
| `status` | `NEW \| CONTACTED \| CLOSED` | CRM workflow status |
| `notes` | `String?` | Admin-only internal notes |

</details>

<details>
<summary><strong>bike_events</strong> — raw engagement events</summary>
<br/>

| Column | Type | Notes |
|--------|------|-------|
| `id` | `CUID` | Primary key |
| `bike_id` | `FK → bikes` | Nullable |
| `event` | `VIEW \| CARD_CLICK \| WHATSAPP \| INQUIRY \| GALLERY` | Event type |
| `lang` | `String` | `en` or `ar` |
| `session_id` | `String?` | Anonymous browser session token |
| `created_at` | `Timestamp` | Used for time-series aggregation |

Indexed on `(bike_id)`, `(event)`, `(created_at)`, and `(bike_id, event)` for fast dashboard queries.

</details>

<details>
<summary><strong>uploads</strong> — file metadata</summary>
<br/>

| Column | Type | Notes |
|--------|------|-------|
| `id` | `CUID` | Primary key |
| `filename` | `String` | UUID-based stored filename |
| `mimetype` | `String` | e.g. `image/jpeg` |
| `size` | `Int` | Size in bytes |
| `url` | `String` | Public path `/uploads/<filename>` |
| `uploaded_by` | `FK → users` | Nullable |

</details>

---

## Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 22 or later |
| npm | 10 or later |
| OS | Windows 10 / 11 x64 (embedded Postgres binary is Windows-only) |

### 1. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../al-owaichi-frontend
npm install
```

### 2. Start the embedded database

```bash
cd backend
npm run db:start
```

On first run this initialises `backend/.pg-data/` with UTF-8 encoding, creates the `aot` PostgreSQL user and database, then prints the connection string. On subsequent runs it simply starts the existing server.

Leave this terminal open and press `Ctrl+C` to stop.

> **Note:** The server listens on port **5434** to avoid collisions with system PostgreSQL installations, which commonly occupy 5432 or 5433.

### 3. Apply migrations and seed data

Open a new terminal:

```bash
cd backend

# Apply the schema
npx prisma migrate deploy

# Create the admin user and seed 10 bikes
npm run db:seed
```

Default admin credentials created by the seed:

| Field | Value |
|-------|-------|
| Email | `admin@alowaichi.com` |
| Password | `Admin1234!` |

### 4. Start the backend

```bash
cd backend
npm run start:dev   # hot-reload development
# — or —
npm start           # single run
```

API base URL: `http://localhost:3000/api`

### 5. Start the frontend

```bash
cd al-owaichi-frontend
npm start
```

Application: `http://localhost:4200`

---

## API Reference

**Base URL:** `http://localhost:3000/api`

Protected routes require the header:
```
Authorization: Bearer <token>
```

---

### Authentication

```http
POST /api/auth/login
```

```json
// Request body
{ "email": "admin@alowaichi.com", "password": "Admin1234!" }

// Response 200
{
  "access_token": "eyJhbGci...",
  "user": { "id": "...", "email": "...", "name": "Admin", "role": "ADMIN" }
}
```

```http
GET /api/auth/me    [protected]
```

---

### Bikes

| Method | Path | Auth | Description |
|--------|------|:----:|-------------|
| `GET` | `/api/bikes` | — | All published bikes |
| `GET` | `/api/bikes/:slug` | — | Single bike by slug |
| `GET` | `/api/admin/bikes` | required | All bikes, including unpublished |
| `POST` | `/api/admin/bikes` | required | Create a bike |
| `PATCH` | `/api/admin/bikes/:id` | required | Partial update |
| `DELETE` | `/api/admin/bikes/:id` | required | Delete a bike |

**Query parameters** for `GET /api/bikes`:

| Param | Example | Description |
|-------|---------|-------------|
| `brand` | `HAOJUE` | Filter by brand |
| `type` | `sport` | Filter by bike type |

<details>
<summary>Bike response shape</summary>
<br/>

```json
{
  "id": "clx...",
  "slug": "haojue-hj150-2",
  "brand": "HAOJUE",
  "model": "HJ150-2",
  "type_en": "Commuter",
  "type_ar": "دراجة يومية",
  "engine": "150cc",
  "power": "11 hp",
  "desc_en": "Reliable daily commuter...",
  "desc_ar": "دراجة يومية موثوقة...",
  "intro_en": "...",
  "intro_ar": "...",
  "features_en": ["Fuel efficient", "Low maintenance"],
  "features_ar": ["اقتصادية في الوقود", "صيانة منخفضة"],
  "specs": [
    { "label_en": "Engine", "label_ar": "المحرك", "value": "150cc Single" }
  ],
  "image": "/uploads/haojue-hj150-2.jpg",
  "gallery": [],
  "published": true,
  "sortOrder": 1
}
```

</details>

---

### Inquiries

| Method | Path | Auth | Description |
|--------|------|:----:|-------------|
| `POST` | `/api/inquiries` | — | Submit a customer lead |
| `GET` | `/api/admin/inquiries` | required | List inquiries (filter: `status`, `bikeId`) |
| `GET` | `/api/admin/inquiries/:id` | required | Single inquiry |
| `PATCH` | `/api/admin/inquiries/:id` | required | Update status or notes |
| `DELETE` | `/api/admin/inquiries/:id` | required | Delete |

---

### Uploads

| Method | Path | Auth | Description |
|--------|------|:----:|-------------|
| `POST` | `/api/uploads` | required | Upload image (`multipart/form-data`, field: `file`) |
| `GET` | `/api/uploads` | required | List all uploaded files |
| `DELETE` | `/api/uploads/:id` | required | Delete record and physical file |
| `GET` | `/uploads/:filename` | — | Serve static file |

Maximum file size: **5 MB**. Accepted types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`.

---

### Analytics

#### Public — event tracking

```http
POST /api/analytics/event
```

Always returns `204 No Content`. Errors are swallowed server-side so tracking never interrupts the user experience.

```json
{
  "bikeId": "clx...",
  "event": "VIEW",
  "lang": "en",
  "sessionId": "anon-abc123"
}
```

Pass `slug` instead of `bikeId` if preferred — the backend resolves it automatically.

| Event | Fired when |
|-------|-----------|
| `VIEW` | Bike detail page is opened |
| `CARD_CLICK` | A bike card is clicked in the catalog |
| `WHATSAPP` | The WhatsApp enquiry button is tapped |
| `INQUIRY` | An inquiry form is submitted |
| `GALLERY` | A gallery image is opened |

#### Admin — metrics dashboard (protected)

| Method | Path | Query params | Description |
|--------|------|-------------|-------------|
| `GET` | `/api/admin/analytics` | `since=YYYY-MM-DD` | All bikes ranked by total engagement |
| `GET` | `/api/admin/analytics/top` | `event`, `limit`, `since` | Top-N bikes by event type |
| `GET` | `/api/admin/analytics/:bikeId` | `days=30` | Daily timeline for a single bike |

<details>
<summary>Response examples</summary>
<br/>

**Summary** — `GET /api/admin/analytics`
```json
[
  {
    "bikeId": "clx...",
    "slug": "haojue-hj150-2",
    "brand": "HAOJUE",
    "model": "HJ150-2",
    "totals": {
      "VIEW": 142,
      "CARD_CLICK": 87,
      "WHATSAPP": 23,
      "INQUIRY": 11,
      "GALLERY": 55
    },
    "total": 318
  }
]
```

**Timeline** — `GET /api/admin/analytics/:bikeId?days=7`
```json
{
  "bikeId": "clx...",
  "days": 7,
  "timeline": [
    { "date": "2026-05-20", "VIEW": 12, "CARD_CLICK": 8, "WHATSAPP": 2, "sessions": 9 },
    { "date": "2026-05-21", "VIEW": 19, "CARD_CLICK": 11, "WHATSAPP": 3, "sessions": 14 }
  ],
  "totals": { "VIEW": 98, "CARD_CLICK": 61, "WHATSAPP": 17, "sessions": 72 }
}
```

</details>

---

### Complete Endpoint Map

```
AUTH
  POST   /api/auth/login                    → JWT token
  GET    /api/auth/me              [auth]   → current user

CATALOG
  GET    /api/bikes                         → published bikes
  GET    /api/bikes/:slug                   → single bike

BIKES — admin
  GET    /api/admin/bikes          [auth]
  POST   /api/admin/bikes          [auth]
  PATCH  /api/admin/bikes/:id      [auth]
  DELETE /api/admin/bikes/:id      [auth]

INQUIRIES
  POST   /api/inquiries                     → submit lead
  GET    /api/admin/inquiries      [auth]
  GET    /api/admin/inquiries/:id  [auth]
  PATCH  /api/admin/inquiries/:id  [auth]
  DELETE /api/admin/inquiries/:id  [auth]

UPLOADS
  POST   /api/uploads              [auth]
  GET    /api/uploads              [auth]
  DELETE /api/uploads/:id          [auth]
  GET    /uploads/:filename                 → static file

ANALYTICS
  POST   /api/analytics/event               → track event (always 204)
  GET    /api/admin/analytics      [auth]   → engagement summary
  GET    /api/admin/analytics/top  [auth]   → top bikes by event
  GET    /api/admin/analytics/:id  [auth]   → bike timeline
```

---

## Environment Variables

File: `backend/.env` — never commit this file.

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://aot:aot@localhost:5434/aot?schema=public` | Prisma connection string |
| `JWT_SECRET` | — | **Required.** Minimum 32 characters. Change before deploying. |
| `JWT_EXPIRES_IN` | `7d` | Token lifetime |
| `ADMIN_EMAIL` | `admin@alowaichi.com` | Seed script admin email |
| `ADMIN_PASSWORD` | `Admin1234!` | Seed script admin password |
| `PORT` | `3000` | Backend HTTP port |
| `CORS_ORIGIN` | `http://localhost:4200` | Allowed origins, comma-separated |
| `UPLOAD_DIR` | `./uploads` | Physical upload directory |
| `UPLOAD_MAX_BYTES` | `5242880` | Maximum upload size (5 MB) |
| `PUBLIC_URL` | `http://localhost:3000` | Used to construct public file URLs |

---

## NPM Scripts

### Backend — `cd backend`

| Script | Description |
|--------|-------------|
| `npm run db:start` | Start embedded PostgreSQL |
| `npm run db:stop` | Stop embedded PostgreSQL |
| `npm run db:migrate` | Create and apply a new Prisma migration |
| `npm run db:generate` | Regenerate Prisma client after schema changes |
| `npm run db:seed` | Seed admin user and 10 bikes |
| `npm run db:reset` | Wipe database and re-run all migrations and seed |
| `npm run start:dev` | Start API with hot-reload |
| `npm start` | Start API (single run) |
| `npm run build` | Compile TypeScript to `dist/` |

### Frontend — `cd al-owaichi-frontend`

| Script | Description |
|--------|-------------|
| `npm start` | Dev server at `http://localhost:4200` |
| `npm run build` | Production build to `dist/` |
| `npm test` | Run unit tests with Vitest |

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Backend | [NestJS](https://nestjs.com) | 11 | HTTP framework, dependency injection, routing |
| Backend | [Prisma ORM](https://www.prisma.io) | 6.19 | Schema management, migrations, type-safe queries |
| Backend | [PostgreSQL](https://www.postgresql.org) | 18.3 | Relational database |
| Backend | passport-jwt | 4 | JWT authentication strategy |
| Backend | bcrypt | 6 | Password hashing |
| Backend | Multer | 2 | Multipart file uploads |
| Backend | class-validator | 0.15 | DTO validation decorators |
| Backend | TypeScript | 5.7 | Static typing |
| Frontend | [Angular](https://angular.dev) | 21 | Single-page application framework |
| Frontend | RxJS | 7.8 | Reactive state and HTTP client |
| Frontend | SCSS | — | Component styling with CSS custom properties |
| Frontend | TypeScript | 5.9 | Static typing |

---

## Deployment

> **Important:** The embedded PostgreSQL is for development only. Use a managed database in production.

### Pre-deployment checklist

- [ ] Set `DATABASE_URL` to a managed PostgreSQL service (Supabase, Railway, AWS RDS, Neon)
- [ ] Generate a strong `JWT_SECRET` — minimum 32 random characters
- [ ] Update `CORS_ORIGIN` to the production frontend domain
- [ ] Update `PUBLIC_URL` to the production backend domain
- [ ] Use `npx prisma migrate deploy` (not `migrate dev`) in CI/CD pipelines
- [ ] For multi-instance deployments, replace `UPLOAD_DIR` with object storage (S3, Cloudflare R2)

### Build commands

```bash
# Backend
cd backend
npm run build
node dist/main

# Frontend
cd al-owaichi-frontend
npm run build
# Serve the dist/ folder with nginx, Caddy, or a CDN
```

---

<div align="center">
Al Owaichi Trading — Lebanon's premier motorcycle destination.
</div>
