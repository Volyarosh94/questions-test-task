import {
  IsNotEmpty,
  IsString,
  IsEmail,
} from 'class-validator';

export class UserDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

};
