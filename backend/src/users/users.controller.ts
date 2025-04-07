import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { WishResponseDto } from 'src/wishes/dto/wish-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(
    @Request() req: AuthenticatedRequest,
  ): Promise<UserProfileResponseDto> {
    const user = await this.usersService.findById(req.user.userId);
    return plainToInstance(UserProfileResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateCurrentUser(
    @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const user = await this.usersService.updateOne(
      req.user.userId,
      updateUserDto,
      req.user.userId,
    );
    return plainToInstance(UserProfileResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async getCurrentUserWithWishes(
    @Request() req: AuthenticatedRequest,
  ): Promise<WishResponseDto[]> {
    const user = await this.usersService.findById(req.user.userId);
    return plainToInstance(WishResponseDto, user.wishes, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findUserByUsername(
    @Param('username') username: string,
  ): Promise<WishResponseDto[]> {
    const user = await this.usersService.findByName(username);
    return plainToInstance(WishResponseDto, user.wishes, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  findUserWishes(@Param('username') username: string) {
    return this.usersService.findByName(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findMany(
    @Body() findUsersDto: FindUsersDto,
  ): Promise<UserProfileResponseDto[]> {
    const { query } = findUsersDto;
    const users = await this.usersService.findByFields(query);
    return plainToInstance(UserProfileResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(+id, updateUserDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.usersService.removeOne(+id, req.user.userId);
  }
}
