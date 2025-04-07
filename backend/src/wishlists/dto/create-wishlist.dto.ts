import { IsString, IsUrl, Length, Max } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @Max(1500)
  description: string;

  @IsUrl()
  image: string;
}
