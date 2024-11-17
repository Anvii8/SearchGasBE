import * as bcrypt from 'bcrypt';
import { FavoritosEntity } from 'src/favorites/entity/favorite.entity';
import { ValorationsEntity } from 'src/valorations/entity/valoration.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly userId: string;

  @Column({ length: 55 })
  name: string;

  @Column({ length: 55 })
  surname: string;

  @Column({unique: true })
  email: string;

  @Column({ type: 'varchar', length: 70 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }

  @OneToMany(() => FavoritosEntity, (favorito) => favorito.user)
  favoritos: FavoritosEntity[];

  @OneToMany(() => ValorationsEntity, (valoration) => valoration.user)
  valorations: ValorationsEntity[];

  constructor(
    userId: string,
    name: string,
    surname: string,
    email: string,
    password: string,
  ) {
    super();
    this.userId = userId;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }
}
