import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadsService {
  private readonly uploadDir: string;
  private readonly publicUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.uploadDir = config.get<string>('UPLOAD_DIR', './uploads');
    this.publicUrl = config.get<string>('PUBLIC_URL', 'http://localhost:3000');
    // Ensure directory exists
    fs.mkdirSync(this.uploadDir, { recursive: true });
  }

  async save(
    file: Express.Multer.File,
    uploadedBy?: string,
  ) {
    const url = `${this.publicUrl}/uploads/${file.filename}`;

    const record = await this.prisma.upload.create({
      data: {
        filename:   file.filename,
        mimetype:   file.mimetype,
        size:       file.size,
        url,
        uploadedBy: uploadedBy ?? null,
      },
    });

    return record;
  }

  async findAll() {
    return this.prisma.upload.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const upload = await this.prisma.upload.findUnique({ where: { id } });
    if (!upload) throw new NotFoundException('Upload not found');
    return upload;
  }

  async remove(id: string) {
    const upload = await this.findOne(id);

    // Delete physical file
    const filePath = path.join(this.uploadDir, upload.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.prisma.upload.delete({ where: { id } });
    return { deleted: true };
  }
}
