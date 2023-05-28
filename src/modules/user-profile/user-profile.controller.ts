import { JwtService } from '@nestjs/jwt';
import { UserProfileService } from './user-profile.service';
import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

@Controller('profile')
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService,
    private jwtService: JwtService,
  ) {}
  @Get()
  async getUser(@Req() req: Request, @Res() res: Response) {
    const userId = new ObjectId(req['user'].id);
    const user = await this.userProfileService.getUserData(userId);
    res.render('user-profile', { layout: 'main', user });
    return userId;
  }
}
