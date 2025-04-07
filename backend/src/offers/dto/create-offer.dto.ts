import { IsBoolean, IsNumber, Matches } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  item: number;

  @IsNumber()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a valid number with up to 2 decimal places',
  })
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
