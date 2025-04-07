import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ISanitizedUser } from './interfaces/sanitized-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashService.hashPassword(
      createUserDto.password,
    );
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<ISanitizedUser | null> {
    const user = await this.usersService.findByName(username);

    if (
      user &&
      (await this.hashService.comparePassword(password, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signin(user: ISanitizedUser) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
