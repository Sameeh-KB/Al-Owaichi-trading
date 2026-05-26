import { Module } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import {
  InquiriesPublicController,
  InquiriesAdminController,
} from './inquiries.controller';

@Module({
  controllers: [InquiriesPublicController, InquiriesAdminController],
  providers: [InquiriesService],
})
export class InquiriesModule {}
