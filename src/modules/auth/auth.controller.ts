import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
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
    if (!jwt) {
      res.render('login', { layout: 'authLayout' });
    } else {
      return res.status(308).redirect('/');
    }
  }

  @Post('signup')
  async signup(@Body() body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = await this.authService.signup({
      email: body.email,
      password: hashedPassword,
    });

    console.log(user);

    return { message: 'Successfully created User' };
  }

  @Post('login')
  @UseInterceptors(FileInterceptor('file'))
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.login({ email });
    console.log(user);

    if (!user) {
      throw new BadRequestException('Invalid Email');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Password');
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
}
