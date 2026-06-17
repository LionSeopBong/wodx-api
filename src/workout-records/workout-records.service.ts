import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutRecord } from './workout-record.entity';

@Injectable()
export class WorkoutRecordsService {
  constructor(
    @InjectRepository(WorkoutRecord)
    private recordRepo: Repository<WorkoutRecord>,
  ) {}

  async create(
    userId: string,
    data: {
      gymId: string;
      wodId: string;
      partLabel: string;
      level: string;
      recordValue: string;
      recordType: string;
      completedAt: string;
    },
  ) {
    return this.recordRepo.save(this.recordRepo.create({ ...data, userId }));
  }

  async findMyRecords(userId: string, gymId: string) {
    return this.recordRepo.find({
      where: { userId, gymId },
      order: { createdAt: 'DESC' },
    });
  }

  async findLeaderboard(gymId: string, date: string) {
    return this.recordRepo.find({
      where: { gymId, completedAt: date },
      order: { createdAt: 'ASC' },
    });
  }

  async findMyWodRecords(userId: string, wodId: string) {
    return this.recordRepo.find({
      where: { userId, wodId },
    });
  }

  async findOne(id: string) {
    const record = await this.recordRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('기록을 찾을 수 없습니다.');
    return record;
  }

  async update(id: string, data: Partial<WorkoutRecord>) {
    await this.recordRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const record = await this.findOne(id);
    await this.recordRepo.delete(id);
    return record;
  }

  async getMonthlyAttendance(userId: string, gymId: string, yearMonth: string) {
    const records = await this.recordRepo
      .createQueryBuilder('record')
      .where('record.userId = :userId', { userId })
      .andWhere('record.gymId = :gymId', { gymId })
      .andWhere('record.completedAt LIKE :yearMonth', {
        yearMonth: `${yearMonth}%`,
      })
      .select('record.completedAt')
      .distinct(true)
      .getRawMany<{ record_completedAt: string }>();

    return records.map((r) => r.record_completedAt);
  }
}
