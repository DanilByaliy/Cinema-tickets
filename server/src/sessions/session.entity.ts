import { Ticket } from 'src/tickets/ticket.entity';
import { Movie } from '../movies/movie.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cinema_hall: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @ManyToOne(() => Movie, (movie) => movie.sessions)
  movie: Movie;

  @OneToMany(() => Ticket, (ticket) => ticket.session)
  tickets: Ticket[];
}
