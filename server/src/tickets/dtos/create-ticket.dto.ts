import { IsString, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  sessionId: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;
}
