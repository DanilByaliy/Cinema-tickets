import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsString()
  @IsOptional()
  director: string;

  @IsNumber()
  @Min(1895)
  @Max(2023)
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  description: string;
}
