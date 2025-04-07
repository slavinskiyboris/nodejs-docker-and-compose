import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/entities/base.dto';

export class WishPartial extends BaseResponseDto {
  @Expose()
  name: string;

  @Expose()
  link: string;

  @Expose()
  image: string;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  raised: number;

  @Expose()
  copied: number;
}
