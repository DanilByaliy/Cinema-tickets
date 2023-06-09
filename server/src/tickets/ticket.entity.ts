import { Session } from '../sessions/session.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  row: number;

  @Column()
  seat: number;

  @Column()
  price: number;

  @ManyToOne(() => Session, (session) => session.tickets)
  session: Session;
}
