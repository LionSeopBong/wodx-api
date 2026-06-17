import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkoutRecordsService } from './workout-records.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { WorkoutRecord } from 'src/workout-records/workout-record.entity';

@UseGuards(JwtAuthGuard)
@Controller('workout-records')
export class WorkoutRecordsController {
  constructor(private workoutRecordsService: WorkoutRecordsService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body()
    body: {
      gymId: string;
      wodId: string;
      partLabel: string;
      level: string;
      recordValue: string;
      recordType: string;
      completedAt: string;
    },
  ) {
    return this.workoutRecordsService.create(user.id, body);
  }

  @Get('my')
  findMyRecords(@CurrentUser() user: User, @Query('gymId') gymId: string) {
    return this.workoutRecordsService.findMyRecords(user.id, gymId);
  }

  @Get('leaderboard')
  findLeaderboard(@Query('gymId') gymId: string, @Query('date') date: string) {
    return this.workoutRecordsService.findLeaderboard(gymId, date);
  }

  @Get('attendance')
  getMonthlyAttendance(
    @CurrentUser() user: User,
    @Query('gymId') gymId: string,
    @Query('yearMonth') yearMonth: string,
  ) {
    return this.workoutRecordsService.getMonthlyAttendance(
      user.id,
      gymId,
      yearMonth,
    );
  }

  @Get('wod/:wodId')
  findMyWodRecords(@CurrentUser() user: User, @Param('wodId') wodId: string) {
    return this.workoutRecordsService.findMyWodRecords(user.id, wodId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutRecordsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<WorkoutRecord>) {
    return this.workoutRecordsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutRecordsService.remove(id);
  }
}
