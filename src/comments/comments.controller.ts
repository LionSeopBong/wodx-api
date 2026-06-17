import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() body: { wodId: string; content: string },
  ) {
    return this.commentsService.create(user.id, body);
  }

  @Get('wod/:wodId')
  findByWod(@Param('wodId') wodId: string) {
    return this.commentsService.findByWod(wodId);
  }

  @Post(':id/like')
  toggleLike(@CurrentUser() user: User, @Param('id') id: string) {
    return this.commentsService.toggleLike(id, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
