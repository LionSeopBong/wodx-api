import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  wodId: string;

  @Column()
  userId: string;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ type: 'jsonb', default: [] })
  likedBy: string[];

  @CreateDateColumn()
  createdAt: Date;
}
