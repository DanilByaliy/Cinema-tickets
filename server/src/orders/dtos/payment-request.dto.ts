import {
  IsString,
  IsNumber,
  Min,
  IsISO4217CurrencyCode,
} from 'class-validator';

export class PaymentRequest {
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(50)
  ticketPrice: number;

  @IsString()
  @IsISO4217CurrencyCode()
  currency: string;
}
