import { IsString, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  session_id: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;
}
