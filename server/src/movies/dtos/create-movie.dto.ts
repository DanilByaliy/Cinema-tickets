import { IsString, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsString()
  director: string;

  @IsNumber()
  @Min(1895)
  @Max(2023)
  @Transform(({ value }) => parseInt(value))
  year: number;

  @IsString()
  description: string;
}
