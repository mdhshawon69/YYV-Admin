import { Response, Request } from 'express';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(@Res() res: Response) {
    const users = await this.userService.getAllUser();
    res.render('users', { layout: 'main', users: users });
  }

  @Get('add-user')
  getUser(@Req() req: Request, @Res() res: Response) {
    const rawJwt = req.headers.cookie;
    const jwt = rawJwt?.split('jwt=')[1];
    if (!jwt) {
      throw new UnauthorizedException();
    } else {
      res.render('addUser', { layout: 'main' });
    }
  }

  @Post('add-user')
  @UseInterceptors(FileInterceptor('file'))
  async addUser(
    @Res() res: Response,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await this.userService.addUser({
        name,
        email,
        password: hashedPassword,
      });
      console.log(user);
      return res.json({
        status: 'Success',
        message: 'User added successfully',
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('change-password')
  @UseInterceptors(FileInterceptor('file'))
  async changePassword(
    @Body('old_password') oldPassword,
    @Body('new_password') newPassword,
    @Body('confirm_password') confirmPassword,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const id = new ObjectId(req['user'].id);
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    if (newPassword !== confirmPassword) {
      res.json({ status: 'Falied', message: "Password doesn't mathch!" });
      throw new Error("Password doesn't match");
    }

    await this.userService.changePassword(oldPassword, hashedNewPassword, id);
    res.clearCookie('jwt');
    return res.json({
      status: 'Success',
      message: 'Successfully changed the password',
    });
  }

  @Post(':id')
  async deleteUser(@Param('id') id: any, @Req() req: Request) {
    if (req['user'].id === id) {
      throw new NotFoundException('Admin cannot delete himself');
    } else {
      const userId = id;
      return this.userService.deleteUser(userId);
    }
  }
}
