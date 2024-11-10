import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ExistUserEmailPipe } from './Pipes/exist-user-email.pipe';
import { ValidUserIdPipe } from './Pipes/valid-user-id.pipe';
import { UserDto } from './models/user.dto';
import { UsersService } from './services/users.service';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(
    @Param('id', ValidUserIdPipe) id: string,
  ): Promise<UserDto> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(ExistUserEmailPipe)
  async newUser(@Body() user: UserDto): Promise<UserDto> {
    return await this.usersService.newUser(user);
  }

}
