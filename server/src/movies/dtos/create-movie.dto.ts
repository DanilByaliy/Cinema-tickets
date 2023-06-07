import { IsString, IsNumber, Min, Max } from 'class-validator';

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
  year: number;

  @IsString()
  description: string;
}
