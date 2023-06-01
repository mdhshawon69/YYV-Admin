import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
  Param,
  Put,
} from '@nestjs/common';
import { OurImpactService } from './our-impact.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('our-impact')
export class OurImpactController {
  constructor(private readonly ourImpactService: OurImpactService) {}

  @Get()
  async getImpactNumbers(@Res() res: Response) {
    const impactNumbers = await this.ourImpactService.getImpactNumbers();
    return res.render('our_impacts', { layout: 'main', impactNumbers });
  }

  @Get('add-impact-number')
  async getAddImpactNumber(@Res() res: Response) {
    return res.render('impact_number_form', { layout: 'main' });
  }

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

  @Put(':id')
  async editImpactNumber(
    @Param() param,
    @Body('title') title,
    @Body('impact_number') ImpactNumber,
    @Res() res: Response,
  ) {
    const id = param.id;
    const editedItem = await this.ourImpactService.editImpactNumber(
      id,
      title,
      ImpactNumber,
    );
    console.log(editedItem);
  }

  @Post(':id')
  async deleteImpactNumber(
    @Param() param,

    @Res() res: Response,
  ) {
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
