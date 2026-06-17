import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutRecordsController } from './workout-records.controller';
import { WorkoutRecordsService } from './workout-records.service';
import { WorkoutRecord } from './workout-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutRecord])],
  controllers: [WorkoutRecordsController],
  providers: [WorkoutRecordsService],
  exports: [WorkoutRecordsService],
})
export class WorkoutRecordsModule {}
