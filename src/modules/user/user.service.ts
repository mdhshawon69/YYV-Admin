import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/auth/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUser() {
    return await this.userRepository.find({});
  }

  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }

  async addUser(user: any): Promise<User> {
    return this.userRepository.save(user);
  }

  async changePassword(oldPassword, newPassword, id) {
    const user = await this.userRepository.findOneById(id);
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new Error('Password incorrect');
    }

    user.password = newPassword;
    return this.userRepository.save(user);
  }
}
