import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getUser(@Res() res: Response) {
    res.render('login', { layout: 'authLayout' });
  }

  @Post()
  login(@Res() res: Response) {}
}
