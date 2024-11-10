import { UserEntity } from "../entity/user.entity";
import { UserDto } from "../models/user.dto";


export class UserMapper {
  dtoToEntity(userDTO: UserDto): UserEntity {
    return new UserEntity(
      userDTO.id,
      userDTO.name,
      userDTO.surname,
      userDTO.email,
      userDTO.password,
    );
  }

  entityToDto(userEntity: UserEntity): UserDto {
    return new UserDto(
      userEntity.userId,
      userEntity.name,
      userEntity.surname,
      userEntity.email,
      userEntity.password,
    );
  }
}
