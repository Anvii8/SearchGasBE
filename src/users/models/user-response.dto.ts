import { UserEntity } from "../entities/user.entity";

export class UserResponseDto {
    id: string;
    name: string;
    surname: string;
    email: string;
  
    constructor(userEntity: UserEntity) {
      this.id = userEntity.userId;
      this.name = userEntity.name;
      this.surname = userEntity.surname;
      this.email = userEntity.email;
    }
}
  