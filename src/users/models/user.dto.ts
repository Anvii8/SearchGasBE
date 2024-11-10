import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    email: string,
    password: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }
}
