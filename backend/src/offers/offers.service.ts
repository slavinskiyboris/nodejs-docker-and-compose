import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}
  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const wish = await this.wishesService.findById(createOfferDto.item);
    if (user === wish.owner) {
      throw new ForbiddenException('Do not offer for your wish');
    }

    wish.raised += createOfferDto.amount;
    if (wish.raised > wish.price) {
      throw new ForbiddenException('Too much money');
    }
    await this.wishesService.save(wish);
    const newOffer = await this.offerRepository.save({
      ...createOfferDto,
      user: user,
      item: wish,
    });
    return newOffer;
  }

  findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  async findById(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id: id },
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    return offer;
  }

  async updateOne(
    id: number,
    updateOfferDto: UpdateOfferDto,
    userId: number,
  ): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    if (offer.user.id != userId) {
      throw new ForbiddenException('You are not the owner of this offer');
    }

    Object.assign(offer, updateOfferDto);

    return this.offerRepository.save(offer);
  }

  async removeOne(id: number, userId: number): Promise<void> {
    const offer = await this.offerRepository.findOne({
      where: { id },
    });

    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    if (offer.user.id != userId) {
      throw new ForbiddenException('You are not the owner of this offer');
    }
    const result = await this.offerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }
  }
}
