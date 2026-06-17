import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gym } from './gym.entity';
import { GymMember } from '../gym-members/gym-member.entity';
import { User } from '../users/user.entity';

@Injectable()
export class GymsService {
  constructor(
    @InjectRepository(Gym) private gymRepo: Repository<Gym>,
    @InjectRepository(GymMember) private memberRepo: Repository<GymMember>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(adminId: string, data: { name: string; code: string }) {
    const exists = await this.gymRepo.findOne({ where: { code: data.code } });
    if (exists)
      throw new ConflictException('이미 사용 중인 체육관 코드입니다.');

    const gym = await this.gymRepo.save(
      this.gymRepo.create({ ...data, adminId }),
    );

    // 생성자를 admin 멤버로 자동 등록
    await this.memberRepo.save(
      this.memberRepo.create({ gymId: gym.id, userId: adminId, role: 'admin' }),
    );

    // currentGymId 업데이트
    await this.userRepo.update(adminId, { currentGymId: gym.id });

    return gym;
  }

  async findOne(id: string) {
    const gym = await this.gymRepo.findOne({ where: { id } });
    if (!gym) throw new NotFoundException('존재하지 않는 체육관입니다.');
    return gym;
  }

  async findByCode(code: string) {
    const gym = await this.gymRepo.findOne({ where: { code } });
    if (!gym) throw new NotFoundException('존재하지 않는 체육관 코드입니다.');
    return gym;
  }

  async join(code: string, userId: string) {
    const gym = await this.findByCode(code);

    const existing = await this.memberRepo.findOne({
      where: { gymId: gym.id, userId },
    });
    if (existing) throw new ConflictException('이미 가입된 체육관입니다.');

    await this.memberRepo.save(
      this.memberRepo.create({ gymId: gym.id, userId, role: 'member' }),
    );

    await this.userRepo.update(userId, { currentGymId: gym.id });

    return gym;
  }
}
