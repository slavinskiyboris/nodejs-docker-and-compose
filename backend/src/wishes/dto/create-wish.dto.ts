import { IsString, IsUrl, Length, Matches } from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  link: string;

  image: string;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a valid number with up to 2 decimal places',
  })
  price: number;

  @IsString()
  @Length(1, 1024)
  description: string;
}
