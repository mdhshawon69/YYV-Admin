import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/auth/user.schema';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async getUserData(id): Promise<User | null> {
    console.log(id);
    return await this.userModel.findById(id).lean();
  }

  // async deleteAccount(id): Promise<void> {
  //   const deletedUser = await this.userModel.findByIdAndDelete(id);
  //   // if (deletedUser.affected === 0) {
  //   //   throw new NotFoundException('User not found!');
  //   // }

  //   console.log(deletedUser);
  // }
}
