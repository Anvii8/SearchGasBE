import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserDto } from './models/user.dto';
import { UserService } from './services/user.service';
import { Response } from 'express';
import { UserResponseDto } from './models/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() newUserDto: UserDto, @Res() response: Response): Promise<void> {        
    try {
        const createdUser: UserResponseDto = await this.userService.create(newUserDto);

      response.status(HttpStatus.CREATED).json({
        message: 'Usuario creado exitosamente',
        user: createdUser
      });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error in creating user', error: error.message });
    }
  }
}
