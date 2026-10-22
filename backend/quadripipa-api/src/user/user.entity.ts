import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from './enum/user-status.js';
import { UserType } from './enum/user-type.js';
import { CodeEntity } from '../code/code.entity.js';
import type { Relation } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;
  @Column({ type: 'enum', enum: UserType, default: UserType.EMPLOYEE })
  type: UserType;
  @Column({ type: 'boolean', nullable: false, default: false })
  emailVerified: boolean;

  @OneToMany(() => CodeEntity, (code) => code.user)
  codes: Relation<CodeEntity[]>;
}
