import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private notiRepo: Repository<Notification>,
  ) {}

  async create(data: { userId: string; type: string; message: string }) {
    return this.notiRepo.save(this.notiRepo.create(data));
  }

  async findMyNotifications(userId: string) {
    return this.notiRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markRead(id: string) {
    await this.notiRepo.update(id, { isRead: true });
    const noti = await this.notiRepo.findOne({ where: { id } });
    if (!noti) throw new NotFoundException('알림을 찾을 수 없습니다.');
    return noti;
  }

  async markAllRead(userId: string) {
    await this.notiRepo.update({ userId, isRead: false }, { isRead: true });
    return { message: '모든 알림을 읽음 처리했습니다.' };
  }

  async remove(id: string) {
    const noti = await this.notiRepo.findOne({ where: { id } });
    if (!noti) throw new NotFoundException('알림을 찾을 수 없습니다.');
    await this.notiRepo.delete(id);
    return noti;
  }
}
