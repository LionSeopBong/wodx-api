import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('gyms')
export class GymsController {
  constructor(private gymsService: GymsService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() body: { name: string; code: string },
  ) {
    return this.gymsService.create(user.id, body);
  }

  @Post('join')
  join(@CurrentUser() user: User, @Body('code') code: string) {
    return this.gymsService.join(code, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gymsService.findOne(id);
  }
}
