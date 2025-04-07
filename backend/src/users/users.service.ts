import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user_ib_db = this.userRepository.findOne({
      where: { email: createUserDto.email, name: createUserDto.name },
    });
    if (user_ib_db) {
      throw new ForbiddenException(
        'Пользователь с таким именем или email уже существует',
      );
    }
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByName(name: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { name: name },
    });

    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }

    return user;
  }

  async findByFields(query: string): Promise<User[]> {
    const users = await this.userRepository.find({
      where: [{ name: query }, { email: query }],
    });
    return users;
  }

  async updateOne(
    id: number,
    updateUserDto: UpdateUserDto,
    userId: number,
  ): Promise<User> {
    if (id != userId) {
      throw new ForbiddenException('You are not the owner of this profi;e');
    }
    const user_ib_db = this.userRepository.findOne({
      where: { email: updateUserDto.email, name: updateUserDto.name },
    });
    if (user_ib_db) {
      throw new ForbiddenException(
        'Пользователь с таким именем или email уже существует',
      );
    }

    const hashedPassword = await this.hashService.hashPassword(
      updateUserDto.password,
    );
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, { ...updateUserDto, password: hashedPassword });

    return this.userRepository.save(user);
  }

  async removeOne(id: number, userId: number): Promise<void> {
    if (id != userId) {
      throw new ForbiddenException('You are not the owner of this profi;e');
    }
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} wish`;
  }
}
