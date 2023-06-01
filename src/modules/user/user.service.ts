import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/auth/user.schema';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAllUser(): Promise<User[]> {
    return await this.userModel.find().lean();
  }

  async deleteUser(id) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async addUser(user: any): Promise<User> {
    console.log(user);
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async changePassword(oldPassword, newPassword, id) {
    const user = await this.userModel.findById(id);
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new Error('Password incorrect');
    }

    user.password = newPassword;
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
}
