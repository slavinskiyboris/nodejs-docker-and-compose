import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/common/entities/base.dto';

export class UserProfileResponseDto extends BaseResponseDto {
  @Expose({ name: 'username' })
  name: string;

  @Expose()
  email: string;

  @Expose()
  about: string;
}
