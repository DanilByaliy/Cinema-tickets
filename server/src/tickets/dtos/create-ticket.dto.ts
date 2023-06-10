import { IsString, IsNumber, Min } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  session_id: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @Min(50)
  @IsNumber()
  price: number;
}
