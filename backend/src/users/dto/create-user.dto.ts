import {
  IsString,
  Length,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  about?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
