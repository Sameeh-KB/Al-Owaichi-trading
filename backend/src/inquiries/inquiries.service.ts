import { Injectable, NotFoundException } from '@nestjs/common';
import { InquiryStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Public ────────────────────────────────────────────

  async create(dto: CreateInquiryDto) {
    return this.prisma.inquiry.create({ data: dto });
  }

  // ─── Admin ─────────────────────────────────────────────

  async findAll(status?: InquiryStatus) {
    return this.prisma.inquiry.findMany({
      where:   status ? { status } : undefined,
      include: {
        bike: {
          select: { id: true, slug: true, brand: true, model: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where:   { id },
      include: { bike: true },
    });
    if (!inquiry) throw new NotFoundException('Inquiry not found');
    return inquiry;
  }

  async update(id: string, dto: UpdateInquiryDto) {
    await this.findOne(id); // throws if not found
    return this.prisma.inquiry.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id); // throws if not found
    await this.prisma.inquiry.delete({ where: { id } });
    return { deleted: true };
  }
}
