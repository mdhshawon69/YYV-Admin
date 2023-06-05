import {
  Controller,
  Get,
  Res,
  Post,
  Put,
  UseInterceptors,
  Body,
  UploadedFile,
  Query,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { PartnersService } from './partners.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  //Get all partners CMS Controller
  @Get()
  async getAllPartners(@Res() res: Response) {
    const allPartners = await this.partnersService.getAllPartners();
    const allPartnersRow = [];
    allPartners.forEach((item) => {
      const tempItem = { ...item };
      tempItem.partner_logo = `uploads/partners/${item.partner_logo}`;
      allPartnersRow.push(tempItem);
    });
    console.log(allPartnersRow);
    return res.render('partners/partners', {
      layout: 'main',
      row: allPartnersRow,
    });
  }

  //Get all partners API Controller
  @Get('api')
  async getAllPartnersApi(@Res() res: Response) {
    const allPartners = await this.partnersService.getAllPartnersApi();
    const allPartnersRow = [];
    allPartners.forEach((item) => {
      const tempItem = { ...item };
      tempItem.partner_logo = `uploads/partners/${item.partner_logo}`;
      allPartnersRow.push(tempItem);
    });
    return res.json({ data: allPartnersRow });
  }

  //Get partner adding form CMS controller
  @Get('create-partner')
  async getCreatePartner(@Res() res: Response) {
    return res.render('partners/create-partner-form', { layout: 'main' });
  }

  //Post partners CMS Controller
  @Post('create-partner')
  @UseInterceptors(FileInterceptor('file', fileUpload(`partners`)))
  async createPartner(
    @UploadedFile() file,
    @Body() body,
    @Res() res: Response,
  ) {
    const createdPartner = await this.partnersService.createPartner({
      name: body.partner_name,
      partner_link: body.partner_link,
      partner_logo: file.filename,
    });
    try {
      return res.json({
        status: 'Success',
        message: 'Successfully created partner!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  //Get partner editing form CMS Controller
  @Get('edit-partner')
  async getEditPartner(@Res() res: Response, @Query('id') id) {
    const partner = await this.partnersService.getOnePartner(id);
    console.log(partner);
    res.render('partners/edit-partner-form', {
      layout: 'main',
      data: {
        name: partner.name,
        partner_link: partner.partner_link,
        partner_logo: partner.partner_logo,
      },
    });
  }

  //Post partner editing CMS Controller
  @Put('edit-partner/:id')
  @UseInterceptors(FileInterceptor('file', fileUpload(`partners`)))
  async editPartner(
    @Body() body,
    @Param('id') id,
    @UploadedFile() file,
    @Res() res: Response,
  ) {
    try {
      const editedPartner = await this.partnersService.editPartner(
        id,
        body.partner_name,
        body.partner_link,
        file?.filename,
      );

      return res.json({
        status: 'Success',
        message: 'Partner edited successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  @Post(':id')
  async deletePartner(@Param('id') id, @Res() res: Response) {
    try {
      const deletedPartner = await this.partnersService.deletePartner(id);
      return res.json({
        status: 'Success',
        message: 'Deleted partner successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
