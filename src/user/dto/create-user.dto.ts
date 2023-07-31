import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  password: string;
}
