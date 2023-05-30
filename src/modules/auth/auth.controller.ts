import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Query,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get('login')
  getUser(@Req() req: Request, @Res() res: Response) {
    const rawJwt = req.headers.cookie;
    const jwt = rawJwt?.split('jwt=')[1];
    console.log(req);
    if (!jwt) {
      res.render('login', { layout: 'authLayout' });
    } else {
      res.redirect('/');
    }
  }

  @Post('login')
  @UseInterceptors(FileInterceptor('file'))
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!email || !password) {
      throw new BadRequestException();
    }

    const user = await this.authService.login({ email });

    if (!user) {
      throw new BadRequestException({ message: 'Invalid Credentials!' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException();
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    res.cookie('jwt', jwt, { httpOnly: true });
    return res.redirect('/');
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return {
      message: 'Successfully Logged Out',
    };
  }

  @Get('forgot-password')
  async forgotPassword(@Res() res: Response) {
    res.render('forgot_password', { layout: 'authLayout' });
  }

  @Post('forgot-password')
  @UseInterceptors(FileInterceptor('file'))
  async generatePasswordResetToken(@Body('email') email, @Res() res: Response) {
    try {
      await this.authService.generatePasswordResetToken({ email });
      return res.json({ status: 'Success' });
    } catch (error) {
      return res.json({ status: 'Failed', message: error.message });
    }
  }

  @Get('reset-password')
  async resetPasswordGet(@Res() res: Response, @Query() query) {
    res.cookie('resetToken', query.token, { httpOnly: true });
    res.render('new_password', { layout: 'authLayout' });
  }

  @Post('reset-password')
  @UseInterceptors(FileInterceptor('file'))
  async resetPassword(
    @Body('new_password') newPassword,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const token = req.headers['cookie'].split('resetToken=')[1];
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await this.authService.resetPassword(token, hashedPassword);
      return res.json({ status: 'Success' });
    } catch (error) {
      return res.json({ status: 'Failed', message: error.message });
    }
  }
}
