import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class FeedbackDto {
  @IsString()
  name: string;

  @IsString()
  message: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;
}
