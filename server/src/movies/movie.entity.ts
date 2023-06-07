import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
