import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}
