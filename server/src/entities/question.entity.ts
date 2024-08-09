import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'questions' })
export class Question {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  text: string

  @Column({ name: 'editing_by', nullable: true })
  editingBy: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null

};
