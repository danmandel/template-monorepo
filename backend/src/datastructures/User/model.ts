import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firebaseUid: string;

  @Column()
  email: string;

  @Column()
  displayName: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
