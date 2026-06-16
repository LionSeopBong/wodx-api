import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workout_records')
export class WorkoutRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  gymId: string;

  @Column()
  wodId: string;

  @Column({ nullable: true })
  partLabel: string;

  @Column({ default: 'Rxd' })
  level: string;

  @Column({ nullable: true })
  recordValue: string;

  @Column({ nullable: true })
  recordType: string;

  @Column()
  completedAt: string;

  @CreateDateColumn()
  createdAt: Date;
}
