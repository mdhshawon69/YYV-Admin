import { JwtService } from '@nestjs/jwt';
import { UserProfileService } from './user-profile.service';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('profile')
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService,
    private jwtService: JwtService,
  ) {}
  @Get()
  async getUser(@Req() req: Request, @Res() res: Response) {
    const userId = req['user'].id;
    const user = await this.userProfileService.getUserData(userId);
    return res.render('user-profile', { layout: 'main', user: user });
  }
}
