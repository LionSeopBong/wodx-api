import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findOne(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<User>) {
    await this.userRepo.update(id, data);
    return this.findOne(id);
  }
}
