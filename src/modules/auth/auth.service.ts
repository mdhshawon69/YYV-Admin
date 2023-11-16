import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/auth/user.schema';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from './mailer.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signup(user: any): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async login(condition: any): Promise<User> {
    return this.userModel.findOne(condition);
  }

  async generatePasswordResetToken(email: any): Promise<User> {
    const user = await this.userModel.findOne(email);
    if (!user) {
      throw new Error('User not found!');
    }

    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 3600000);
    this.mailerService.sendPasswordResetEmail(user.email, token);
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async resetPassword(token: string, newPassword: string) {
    const decodedToken = this.jwtService.verify(token);
    const id = decodedToken.userId;
    console.log(id);

    const user = await this.userModel.findById(id);

    if (
      !user ||
      user?.resetToken !== token ||
      user.resetTokenExpires < new Date()
    ) {
      throw new Error('Invalid or expired token');
    }

    user.password = newPassword;
    user.resetToken = null;
    const changedUser = new this.userModel(user);
    console.log(changedUser);
    return await changedUser.save();
  }
}
