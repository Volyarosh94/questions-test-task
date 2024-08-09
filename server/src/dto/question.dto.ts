import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class QuestionDto {

  @IsString()
  @IsNotEmpty()
  text: string;

};
