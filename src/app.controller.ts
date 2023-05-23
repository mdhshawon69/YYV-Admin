import { Controller, Get } from '@nestjs/common';
import { Res, UseGuards } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { Response } from 'express';
import { JwtAuthGuard } from './modules/guard/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Res() res: Response) {
    return res.render('index', { layout: 'main' });
  }
}
