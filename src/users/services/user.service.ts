import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserResponseDto } from '../models/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findOne({ where: { email: user.email } });

    if (existingUser) {
        throw new BadRequestException('El correo electrónico ya está registrado');
    }

    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.surname = user.surname;
    newUser.email = user.email;
    newUser.password = user.password;

    await this.userRepository.save(newUser);

    return {
        id: newUser.userId,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
      };
    }
}