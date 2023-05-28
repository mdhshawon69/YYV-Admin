import { Response, Request } from 'express';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(@Res() res: Response) {
    const users = await this.userService.getAllUser();
    res.render('users', { layout: 'main', users: users });
  }

  @Post(':id')
  async deleteUser(@Param('id') id: any, @Req() req: Request) {
    if (req['user'].id === id) {
      throw new NotFoundException('Admin cannot delete himself');
    } else {
      return this.userService.deleteUser(id);
    }
  }
}
