import {
  IsString,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
} from 'class-validator';

export class UpdateSessionDto {
  @IsString()
  @IsOptional()
  cinema_hall: string;

  @IsDateString()
  @IsOptional()
  date: string;

  @IsMilitaryTime()
  @IsOptional()
  time: string;

  @IsString()
  @IsOptional()
  ticketPrice: number;
}
