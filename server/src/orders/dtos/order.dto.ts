import { IsString, IsArray, IsEmail } from 'class-validator';

export class OrderDto {
  @IsString()
  sessionId: string;

  @IsArray()
  seats: Array<{ row: number; seat: number }>;

  @IsEmail()
  @IsString()
  customer: string;
}
