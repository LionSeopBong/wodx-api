import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PrRecordsService } from './pr-records.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { PrRecord } from './pr-record.entity';

@UseGuards(JwtAuthGuard)
@Controller('pr-records')
export class PrRecordsController {
  constructor(private prRecordsService: PrRecordsService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() body: { movement: string; value: string; recordedAt: string },
  ) {
    return this.prRecordsService.create(user.id, body);
  }

  @Get('my')
  findMyRecords(@CurrentUser() user: User) {
    return this.prRecordsService.findMyRecords(user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<PrRecord>) {
    return this.prRecordsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prRecordsService.remove(id);
  }
}
