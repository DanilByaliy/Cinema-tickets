import { Session } from '../sessions/session.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column()
  poster: string;

  @OneToMany(() => Session, (session) => session.movie)
  sessions: Session[];
}
