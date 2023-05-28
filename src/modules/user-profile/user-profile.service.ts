import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/auth/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getUserData(id): Promise<User | null> {
    return await this.userRepository.findOne({
      select: ['id', 'email', 'name', 'password'],
      where: id,
    });
  }

  async deleteAccount(id): Promise<void> {
    const deletedUser = await this.userRepository.delete(id);
    if (deletedUser.affected === 0) {
      throw new NotFoundException('User not found!');
    }
  }
}
