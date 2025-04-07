import { Expose, Type } from 'class-transformer';
import { BaseResponseDto } from 'src/common/entities/base.dto';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';

export class offerResponseDto extends BaseResponseDto {
  @Expose()
  item: number;

  @Expose()
  amount: string;

  @Expose()
  hidden: boolean;

  @Expose()
  @Type(() => UserProfileResponseDto)
  user: UserProfileResponseDto;
}
