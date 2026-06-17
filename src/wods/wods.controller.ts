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
import { WodsService } from './wods.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('wods')
export class WodsController {
  constructor(private wodsService: WodsService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() body: { gymId: string; date: string; parts: object },
  ) {
    return this.wodsService.create(user.id, body);
  }

  @Get()
  findByDate(@Query('gymId') gymId: string, @Query('date') date: string) {
    return this.wodsService.findByDate(gymId, date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wodsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<{ date: string; parts: object }>,
  ) {
    return this.wodsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wodsService.remove(id);
  }
}
