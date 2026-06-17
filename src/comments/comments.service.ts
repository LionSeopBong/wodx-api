import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async create(userId: string, data: { wodId: string; content: string }) {
    return this.commentRepo.save(this.commentRepo.create({ ...data, userId }));
  }

  async findByWod(wodId: string) {
    return this.commentRepo.find({
      where: { wodId },
      order: { createdAt: 'ASC' },
    });
  }

  async toggleLike(id: string, userId: string) {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('댓글을 찾을 수 없습니다.');

    const isLiked = comment.likedBy.includes(userId);

    if (isLiked) {
      comment.likedBy = comment.likedBy.filter((uid) => uid !== userId);
      comment.likes -= 1;
    } else {
      comment.likedBy = [...comment.likedBy, userId];
      comment.likes += 1;
    }

    return this.commentRepo.save(comment);
  }

  async remove(id: string) {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('댓글을 찾을 수 없습니다.');
    await this.commentRepo.delete(id);
    return comment;
  }
}
