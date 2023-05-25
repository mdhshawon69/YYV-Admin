import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/auth/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addUser(user: any): Promise<User> {
    return this.userRepository.save(user);
  }
}
