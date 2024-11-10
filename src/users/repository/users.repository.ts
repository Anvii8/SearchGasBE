import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserMapper } from '../mapper/user.mapper';
import { UserDto } from '../models/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private mapper: UserMapper,
  ) {}

  getUserById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  getUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ email });
  }

  userEmailAlreadyExist(user: UserDto): Promise<number> {
    return this.usersRepository.count({
      email: user.email,
      userId: Not(user.id),
    });
  }

  newUser(userDTO: UserDto): Promise<UserEntity> {
    const newUser = this.mapper.dtoToEntity(userDTO);
    return this.usersRepository.save(newUser);
  }
}
