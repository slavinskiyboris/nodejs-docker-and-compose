import { Expose, Type } from 'class-transformer';
import { BaseResponseDto } from 'src/common/entities/base.dto';
import { offerResponseDto } from 'src/offers/dto/offer-response.dto';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';

export class WishResponseDto extends BaseResponseDto {
  @Expose({ groups: ['common'] })
  name: string;

  @Expose({ groups: ['common'] })
  link: string;

  @Expose({ groups: ['common'] })
  image: string;

  @Expose({ groups: ['common'] })
  price: number;

  @Expose({ groups: ['common'] })
  description: string;

  @Expose({ groups: ['common'] })
  raised: number;

  @Expose({ groups: ['common'] })
  copied: number;

  @Expose({ groups: ['common'] })
  @Type(() => UserProfileResponseDto)
  owner: UserProfileResponseDto;

  @Expose({ groups: ['auth'] })
  @Type(() => offerResponseDto)
  offers: offerResponseDto[];
}
