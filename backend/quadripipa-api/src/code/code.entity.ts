import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity.js';
import type { Relation } from 'typeorm';

@Entity('verification_codes')
export class CodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 6, nullable: false })
  code: string;

  @Column({ type: 'date', nullable: false })
  expiresAt: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  expired: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  used: boolean;

  @ManyToOne(() => UserEntity, (user) => user.codes, { onDelete: 'CASCADE' })
  user: Relation<UserEntity>;

  @CreateDateColumn()
  createdAt: Date;
}
