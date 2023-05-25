import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AddUserService } from './add-user.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { UnauthorizedExceptionFilter } from 'src/helpers/unauthorized-exceptions-filter';

@Controller('add-user')
export class AddUserController {
  constructor(private readonly addUserService: AddUserService) {}

  @Get()
  getUser(@Req() req: Request, @Res() res: Response) {
    const rawJwt = req.headers.cookie;
    const jwt = rawJwt?.split('jwt=')[1];
    if (!jwt) {
      throw new UnauthorizedException();
    } else {
      res.render('addUser', { layout: 'authLayout' });
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addUser(
    @Res() res: Response,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await this.addUserService.addUser({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
