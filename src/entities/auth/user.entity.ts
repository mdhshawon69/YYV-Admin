/* eslint-disable prettier/prettier */
import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  BeforeInsert,
} from 'typeorm';

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

  @Column({ nullable: true })
  status: boolean;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  resetTokenExpires: Date;

  @BeforeInsert()
  beforeInsertActions() {
    if (this.status === null) {
      this.status = true;
    }
  }
}
