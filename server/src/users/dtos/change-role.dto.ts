import { IsString } from 'class-validator';

export class ChangeRoleDto {
  @IsString()
  userId: string;

  @IsString()
  role: 'USER' | 'ADMIN';
}
