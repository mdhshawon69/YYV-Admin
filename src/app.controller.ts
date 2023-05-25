import { Controller, Get, ExceptionFilter } from '@nestjs/common';
import { Res, UseFilters, UseGuards } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { Response } from 'express';
import { JwtAuthGuard } from './modules/guard/jwt-auth.guard';
import { UnauthorizedExceptionFilter } from './helpers/unauthorized-exceptions-filter';

@Controller()
@UseFilters(UnauthorizedExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response) {
    return res.render('index', { layout: 'main' });
  }
}
