import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wod } from './wod.entity';

@Injectable()
export class WodsService {
  constructor(@InjectRepository(Wod) private wodRepo: Repository<Wod>) {}

  async create(
    userId: string,
    data: { gymId: string; date: string; parts: object },
  ) {
    const wod = await this.wodRepo.save(
      this.wodRepo.create({ ...data, createdBy: userId }),
    );
    return wod;
  }

  async findByDate(gymId: string, date: string) {
    const wod = await this.wodRepo.findOne({ where: { gymId, date } });
    if (!wod) throw new NotFoundException('해당 날짜의 WOD가 없습니다.');
    return wod;
  }

  async findOne(id: string) {
    const wod = await this.wodRepo.findOne({ where: { id } });
    if (!wod) throw new NotFoundException('WOD를 찾을 수 없습니다.');
    return wod;
  }

  async update(id: string, data: Partial<Wod>) {
    await this.wodRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const wod = await this.findOne(id);
    await this.wodRepo.delete(id);
    return wod;
  }
}
