import { Expose, Transform } from 'class-transformer';

export class SessionDto {
  @Expose()
  id: string;

  @Expose()
  cinema_hall: string;

  @Expose()
  date: string;

  @Expose()
  time: string;

  @Transform(({ obj }) => obj.movie.id)
  @Expose()
  movie_id: string;
}
