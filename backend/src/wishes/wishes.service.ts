import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}
  async create(createWishDto: CreateWishDto, user: User) {
    const newOffer = await this.wishRepository.save({
      ...createWishDto,
      user: user,
    });
    return newOffer;
  }

  getLast(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  getTop(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: {
        copied: 'DESC',
      },
      take: 20,
    });
  }

  async updateOne(
    id: number,
    updateWishDto: UpdateWishDto,
    userId: number,
  ): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
    });

    if (!wish) {
      throw new NotFoundException(`Wish with ID ${id} not found`);
    }

    if (wish.owner.id != userId) {
      throw new ForbiddenException('You are not the owner of this wish');
    }

    if (wish.raised > 0) {
      throw new ForbiddenException(
        'Пользователь может отредактировать описание своих подарков и стоимость, если только никто ещё не решил скинуться.',
      );
    }

    Object.assign(wish, { ...updateWishDto });

    return this.wishRepository.save(wish);
  }

  async findById(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id: id },
    });

    if (!wish) {
      throw new NotFoundException(`Wish with ID ${id} not found`);
    }

    return wish;
  }

  async removeOne(id: number, userId: number): Promise<void> {
    const wish = await this.wishRepository.findOne({
      where: { id: id },
    });
    if (!wish) {
      throw new NotFoundException(`Wish with ID ${id} not found`);
    }
    if (wish.owner.id == userId) {
      throw new ForbiddenException('You are not the owner of this wish');
    }
    await this.wishRepository.delete(id);
  }

  async save(wish: Wish): Promise<Wish> {
    return this.wishRepository.save(wish);
  }
}
