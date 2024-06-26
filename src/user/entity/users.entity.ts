import { Check, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Check(`"level" IN (1, 2, 3)`)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 255 })
  password: string;

  @Column()
  createdTime: Date;

  @Column({ length: 255 })
  token: string;

  @Column()
  level: number;
}
