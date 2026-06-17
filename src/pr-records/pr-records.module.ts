import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrRecordsController } from './pr-records.controller';
import { PrRecordsService } from './pr-records.service';
import { PrRecord } from './pr-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrRecord])],
  controllers: [PrRecordsController],
  providers: [PrRecordsService],
  exports: [PrRecordsService],
})
export class PrRecordsModule {}
