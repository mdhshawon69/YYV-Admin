import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { OurImpactService } from './our-impact.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('our-impact')
export class OurImpactController {
  constructor(private readonly ourImpactService: OurImpactService) {}

  //Get all impact numbers CMS Controller
  @Get()
  async getImpactNumbers(@Res() res: Response) {
    try {
      const impactNumbers = await this.ourImpactService.getImpactNumbers();

      return res.render('our-impact/our_impacts', {
        layout: 'main',
        impactNumbers,
      });
    } catch (error) {
      throw new Error('An error occured');
    }
  }

  //Get all impact numbers API Controller
  @Get('api')
  async getImpactNumbersApi(@Res() res: Response) {
    try {
      const impactNumbers = await this.ourImpactService.getImpactNumbers();
      return res.json({ data: impactNumbers });
    } catch (error) {
      throw new Error('An error occured');
    }
  }

  //Get impact number adding form CMS Controller
  @Get('add-impact-number')
  async getAddImpactNumber(@Res() res: Response) {
    return res.render('impact_number_form', { layout: 'main' });
  }

  //Post impact number CMS Controller
  @Post('add-impact-number')
  @UseInterceptors(FileInterceptor('file'))
  async postAddImpactNumber(
    @Body('title') title,
    @Body('impact_number') ImpactNumber,
    @Res() res: Response,
  ) {
    try {
      const impactItem = await this.ourImpactService.addImpactNumber({
        title,
        impact_number: ImpactNumber,
      });

      return res.json({
        status: 'Success',
        message: 'Successfully added impact item',
      });
    } catch (error) {
      res.json({ status: 'Failed', message: error.message });
    }
  }

  //Get impact number editing form CMS Controller
  @Get('edit-impact-number')
  async getEditeImpactNumber(@Query() query, @Res() res: Response) {
    const impactNumber = await this.ourImpactService.getOneImpactNumber(
      query.id,
    );

    return res.render('impact_number_edit_form', {
      layout: 'main',
      data: {
        title: impactNumber.title,
        impact_number: impactNumber.impact_number,
        is_active: impactNumber.is_active,
      },
    });
  }

  //Editing impact number CMS Controller
  @Put('edit-impact-number/:id')
  @UseInterceptors(FileInterceptor('file'))
  async editImpactNumber(
    @Param() param,
    @Body('title') title,
    @Body('impact_number') ImpactNumber,
    @Res() res: Response,
  ) {
    const id = param.id;
    try {
      const editedItem = await this.ourImpactService.editImpactNumber(
        id,
        title,
        ImpactNumber,
      );

      return res.json({
        status: 'Success',
        message: 'Successfully edited impact item',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  // Delete impact number CMS Controller
  @Post(':id')
  async deleteImpactNumber(@Param() param, @Res() res: Response) {
    try {
      const id = param.id;
      await this.ourImpactService.deleteImpactNumber(id);
      return res.json({
        status: 'Success',
        message: 'Impact item deleted successfully!',
      });
    } catch (error) {
      return res.json({ status: 'Failed', message: error.message });
    }
  }
}
