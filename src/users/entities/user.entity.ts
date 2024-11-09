import * as bcrypt from 'bcrypt';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 55 })
  name: string;

  @Column({ length: 55 })
  surname: string;

  @Column({ unique: true })
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
}