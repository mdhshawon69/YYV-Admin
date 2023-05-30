import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from 'src/entities/auth/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from './mailer.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signup(user: any): Promise<User> {
    return this.userRepository.save(user);
  }

  async login(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async generatePasswordResetToken(email: any): Promise<User> {
    const user = await this.userRepository.findOne(email);
    if (!user) {
      throw new Error('User not found!');
    }

    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 3600000);
    this.mailerService.sendPasswordResetEmail(user.email, token);

    return await this.userRepository.save(user);
  }

  async resetPassword(token: string, newPassword: string) {
    const decodedToken = this.jwtService.verify(token);
    const id = decodedToken.userId;
    console.log(id);

    const user = await this.userRepository.findOneById(new ObjectId(id));
    console.log(user);

    if (
      !user ||
      user?.resetToken !== token ||
      user.resetTokenExpires < new Date()
    ) {
      throw new Error('Invalid or expired token');
    }

    user.password = newPassword;
    user.resetToken = null;
    const changedUser = await this.userRepository.save(user);
    console.log(changedUser);
    return changedUser;
  }
}
