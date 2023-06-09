import { Expose, Transform } from 'class-transformer';

export class TicketDto {
  @Expose()
  id: string;

  @Expose()
  row: number;

  @Expose()
  seat: number;

  @Expose()
  price: number;

  @Transform(({ obj }) => obj.session.id)
  @Expose()
  session_id: string;
}
