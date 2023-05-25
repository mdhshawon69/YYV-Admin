import { Response } from 'express';
import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(@Res() res: Response) {
    const users = await this.userService.getAllUser();
    console.log(users);
    res.render('users', { layout: 'main', users: users });
  }
}
