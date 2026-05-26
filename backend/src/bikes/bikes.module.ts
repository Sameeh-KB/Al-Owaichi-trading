import { Module } from '@nestjs/common';
import { BikesService } from './bikes.service';
import { BikesPublicController, BikesAdminController } from './bikes.controller';

@Module({
  controllers: [BikesPublicController, BikesAdminController],
  providers: [BikesService],
})
export class BikesModule {}
