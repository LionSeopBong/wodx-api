import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('gym_members')
export class GymMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gymId: string;

  @Column()
  userId: string;

  @Column({ default: 'member' })
  role: string;

  @CreateDateColumn()
  joinedAt: Date;
}
