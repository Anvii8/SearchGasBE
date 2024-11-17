import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { UserMapper } from './mapper/user.mapper';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UserMapper, UsersRepository, UsersService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
