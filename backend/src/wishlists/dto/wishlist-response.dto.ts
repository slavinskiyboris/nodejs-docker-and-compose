import { Expose, Type } from 'class-transformer';
import { BaseResponseDto } from 'src/common/entities/base.dto';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
import { WishPartial } from 'src/wishes/dto/wish-partial.dto';

export class WishlistResponseDto extends BaseResponseDto {
  @Expose()
  name: string;

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

  @Expose({ name: 'owner' })
  @Type(() => UserProfileResponseDto)
  user: UserProfileResponseDto;

  @Expose()
  @Type(() => WishPartial)
  items: WishPartial[];
}
