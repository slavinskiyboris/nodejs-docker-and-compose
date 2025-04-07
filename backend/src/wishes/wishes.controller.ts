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
import { UsersService } from 'src/users/users.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishResponseDto } from './dto/wish-response.dto';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createWishDto: CreateWishDto,
  ): Promise<void> {
    const user = await this.usersService.findById(req.user.userId);
    this.wishesService.create(createWishDto, user);
  }

  @Get('last')
  async getLastWish(): Promise<WishResponseDto[]> {
    const wishes = await this.wishesService.getLast();
    return plainToInstance(WishResponseDto, wishes, {
      excludeExtraneousValues: true,
      groups: ['common'],
    });
  }

  @Get('top')
  async getTopWish(): Promise<WishResponseDto[]> {
    const wishes = await this.wishesService.getTop();
    return plainToInstance(WishResponseDto, wishes, {
      excludeExtraneousValues: true,
      groups: ['common'],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WishResponseDto> {
    const wish = await this.wishesService.findById(+id);
    return plainToInstance(WishResponseDto, wish, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<WishResponseDto> {
    const wish = await this.wishesService.updateOne(
      +id,
      updateWishDto,
      req.user.userId,
    );
    return plainToInstance(WishResponseDto, wish, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<void> {
    return this.wishesService.removeOne(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copy(
    @Request() req: AuthenticatedRequest,
    @Body() id: number,
  ): Promise<void> {
    const user = await this.usersService.findById(req.user.userId);
    const wish = await this.wishesService.findById(id);

    const сreateWishDto = plainToInstance(CreateWishDto, wish, {
      excludeExtraneousValues: true,
    });

    this.wishesService.create(сreateWishDto, user);
  }
}
