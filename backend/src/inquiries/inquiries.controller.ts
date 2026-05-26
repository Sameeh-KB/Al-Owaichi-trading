import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InquiryStatus } from '@prisma/client';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// ─── Public ───────────────────────────────────────────────────
@Controller('inquiries')
export class InquiriesPublicController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  /** POST /api/inquiries — customer contact / WhatsApp lead form */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateInquiryDto) {
    return this.inquiriesService.create(dto);
  }
}

// ─── Admin ────────────────────────────────────────────────────
@Controller('admin/inquiries')
@UseGuards(JwtAuthGuard)
export class InquiriesAdminController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  /** GET /api/admin/inquiries?status=NEW */
  @Get()
  findAll(@Query('status') status?: InquiryStatus) {
    return this.inquiriesService.findAll(status);
  }

  /** GET /api/admin/inquiries/:id */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inquiriesService.findOne(id);
  }

  /** PATCH /api/admin/inquiries/:id — update status/notes */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInquiryDto) {
    return this.inquiriesService.update(id, dto);
  }

  /** DELETE /api/admin/inquiries/:id */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inquiriesService.remove(id);
  }
}
