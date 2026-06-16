import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pr_records')
export class PrRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  movement: string;

  @Column()
  value: string;

  @Column()
  recordedAt: string;

  @CreateDateColumn()
  createdAt: Date;
}
