import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const USER_HANDLE_MAX_LENGTH = 39; // Same max length as github

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  firebaseUid: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  photoURL: string;

  @Column()
  displayName: string;

  @Column({ unique: true, length: USER_HANDLE_MAX_LENGTH })
  handle: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  stripeCustomerId: string;

  // @Column({ default: 'active' })
  // status: 'active' | 'suspended' | 'cancelled';

  //  account type = 'individual' | 'business'

  // teams?
  // friends
  // subscriptions
  // subsribers?
  // ignore list
}
