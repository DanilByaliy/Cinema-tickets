import {
  IsString,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateSessionDto {
  @IsString()
  movie_id: string;

  @IsString()
  cinema_hall: string;

  @IsDateString()
  date: string;

  @IsMilitaryTime()
  time: string;

  @Min(50)
  @IsNumber()
  ticketPrice: number;
}
