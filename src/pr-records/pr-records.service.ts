import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrRecord } from './pr-record.entity';

@Injectable()
export class PrRecordsService {
  constructor(
    @InjectRepository(PrRecord) private prRepo: Repository<PrRecord>,
  ) {}

  async create(
    userId: string,
    data: {
      movement: string;
      value: string;
      recordedAt: string;
    },
  ) {
    return this.prRepo.save(this.prRepo.create({ ...data, userId }));
  }

  async findMyRecords(userId: string) {
    return this.prRepo.find({
      where: { userId },
      order: { recordedAt: 'DESC' },
    });
  }

  async update(id: string, data: Partial<PrRecord>) {
    await this.prRepo.update(id, data);
    const record = await this.prRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('PR 기록을 찾을 수 없습니다.');
    return record;
  }

  async remove(id: string) {
    const record = await this.prRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('PR 기록을 찾을 수 없습니다.');
    await this.prRepo.delete(id);
    return record;
  }
}
