import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/auth/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(user: any): Promise<User> {
    return this.userRepository.save(user);
  }

  async login(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }
}
