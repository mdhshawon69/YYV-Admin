import {
  Controller,
  Get,
  Res,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { PartnersService } from './partners.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  //Get all partners CMS Controller
  @Get()
  async getAllPartners(@Res() res: Response) {
    const allPartners = this.partnersService.getAllPartners();
    return res.render('partners/partners', { layout: 'main' });
  }

  //Get all partners API Controller
  @Get()
  async getAllPartnersApi(@Res() res: Response) {
    const allPartners = await this.partnersService.getAllPartnersApi();
    return res.json({ data: allPartners });
  }

  //Get partner adding form CMS controller
  @Get('create-partner')
  async getCreatePartner(@Res() res: Response) {
    return res.render('partners/create-partner-form', { layout: 'main' });
  }

  //Post partners CMS Controller
  @Post('create-partner')
  @UseInterceptors(FileInterceptor('file'))
  async createPartner(
    @UploadedFile() file,
    @Body() body,
    @Res() res: Response,
  ) {
    console.log(file);
    // await this.partnersService.createPartner(body);
    return res.json({
      status: 'Success',
      message: 'Successfully created partner!',
    });
  }
}
