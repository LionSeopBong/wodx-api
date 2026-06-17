import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymsController } from './gyms.controller';
import { GymsService } from './gyms.service';
import { Gym } from './gym.entity';
import { GymMember } from '../gym-members/gym-member.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gym, GymMember, User])],
  controllers: [GymsController],
  providers: [GymsService],
  exports: [GymsService],
})
export class GymsModule {}
