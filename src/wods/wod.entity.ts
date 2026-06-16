import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('wods')
export class Wod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gymId: string;

  @Column()
  createdBy: string;

  @Column()
  date: string;

  @Column({ type: 'jsonb' })
  parts: object;

  @CreateDateColumn()
  createdAt: Date;
}
