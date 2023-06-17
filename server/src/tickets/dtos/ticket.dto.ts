import { Expose, Transform } from 'class-transformer';

export class TicketDto {
  @Expose()
  id: string;

  @Expose()
  row: number;

  @Expose()
  seat: number;

  @Transform(({ obj }) => obj.session.id)
  @Expose()
  sessionId: string;
}
