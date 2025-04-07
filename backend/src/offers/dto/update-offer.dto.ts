import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
} from 'class-validator';
import { CreateOfferDto } from './create-offer.dto';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  item: number;

  @IsOptional()
  @IsNumber()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a valid number with up to 2 decimal places',
  })
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;
}
