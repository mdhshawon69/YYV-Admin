/* eslint-disable prettier/prettier */
import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
