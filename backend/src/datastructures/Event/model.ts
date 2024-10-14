import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  aggregateId: string;

  @Column()
  type: string;

  @Column('jsonb')
  payload: Record<string, unknown>;

  @Column()
  timestamp: Date;
}
