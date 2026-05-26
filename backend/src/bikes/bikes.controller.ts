import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// ─── Public routes ────────────────────────────────────────────
@Controller('bikes')
export class BikesPublicController {
  constructor(private readonly bikesService: BikesService) {}

  /** GET /api/bikes — all published bikes for the catalog */
  @Get()
  findAll() {
    return this.bikesService.findAllPublished();
  }

  /** GET /api/bikes/:slug — single published bike for the detail page */
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.bikesService.findBySlug(slug);
  }
}

// ─── Admin routes ─────────────────────────────────────────────
@Controller('admin/bikes')
@UseGuards(JwtAuthGuard)
export class BikesAdminController {
  constructor(private readonly bikesService: BikesService) {}

  /** GET /api/admin/bikes — all bikes including unpublished */
  @Get()
  findAll() {
    return this.bikesService.findAll();
  }

  /** GET /api/admin/bikes/:id */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bikesService.findOne(id);
  }

  /** POST /api/admin/bikes */
  @Post()
  create(@Body() dto: CreateBikeDto) {
    return this.bikesService.create(dto);
  }

  /** PATCH /api/admin/bikes/:id */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBikeDto) {
    return this.bikesService.update(id, dto);
  }

  /** DELETE /api/admin/bikes/:id */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bikesService.remove(id);
  }
}
