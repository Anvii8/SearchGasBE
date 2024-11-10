import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { UserMapper } from '../mapper/user.mapper';
import { UserDto } from '../models/user.dto';
import { UsersRepository } from '../repository/users.repository';


@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private mapper: UserMapper,
  ) {}

  async getUserById(id: string): Promise<UserDto> {
    const user: UserEntity = await this.usersRepository.getUserById(id);
    return this.mapper.entityToDto(user);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.getUserByEmail(email);
  }

  async userEmailAlreadyExist(user: UserDto): Promise<number> {
    return await this.usersRepository.userEmailAlreadyExist(user);
  }

  async newUser(userDTO: UserDto): Promise<UserDto> {
    const newUser: UserEntity = await this.usersRepository.newUser(userDTO);
    return this.mapper.entityToDto(newUser);
  }

}
