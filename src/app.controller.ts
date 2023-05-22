import { Controller, Get } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response) {
    return res.redirect('/auth');
  }
}
