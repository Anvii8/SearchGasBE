import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { UsersService } from '../services/users.service';


@Injectable()
export class ExistUserEmailPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  async transform(value: UserDto) {
    const numEmail: number = await this.usersService.userEmailAlreadyExist(
      value,
    );

    if (numEmail > 0) {
      throw new BadRequestException('Email value already exists');
    }

    return value;
  }
}
