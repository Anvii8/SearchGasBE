import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UserService } from './services/user.service';
import { UserDto } from './models/user.dto';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UserDto, UserEntity, UserService],
  exports: [UserService],
})
export class UsersModule {}
