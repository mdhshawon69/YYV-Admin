import { TalentsService } from './talents.service';
import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Req,
  Param,
  Query,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @Get()
  async getAllTalents(@Res() res: Response, @Query('keywords') keywords) {
    const allTalents = await this.talentsService.getAllTalents();
    const filteredTalents = allTalents.filter((Talent) => {
      return Talent.job_title.toLowerCase().includes(keywords?.toLowerCase());
    });
    return res.render('talents/list', {
      layout: 'main',
      row: !keywords ? allTalents : filteredTalents,
    });
  }

  //Get all Talents API Controller
  @Get('api')
  async getAllTalentsApi(@Res() res: Response) {
    const allTalents = await this.talentsService.getAllTalents();
    return res.json({ data: allTalents });
  }

  //Get create Talent form CMS Controller
  @Get('create-talent')
  async getCreateTalent(@Res() res: Response) {
    return res.render('talents/create', { layout: 'main' });
  }

  //Post create Talent CMS Controller
  @Post('create-talent')
  @UseInterceptors(FileInterceptor('file'))
  async createTalent(@Body() body, @Res() res: Response, @Req() req: Request) {
    try {
      const createdTalent = await this.talentsService.createTalent({
        job_title: body.job_title,
        job_description: body.job_description,
        job_responsibilities: body.job_responsibilities,
        qualifications: body.qualifications,
        is_active: body.is_active,
      });
      return res.json({
        status: 'Success',
        message: 'Successfully created Talent!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  //Get Talent edit form CMS Controller
  @Get('edit-talent')
  async getEditTalent(@Query('id') id, @Res() res: Response) {
    const viewingTalent = await this.talentsService.viewTalent(id);
    return res.render('talents/update', {
      layout: 'main',
      data: {
        job_title: viewingTalent.job_title,
        job_description: viewingTalent.job_description,
        job_responsibilities: viewingTalent.job_responsibilities,
        qualifications: viewingTalent.qualifications,
        is_active: viewingTalent.is_active,
      },
    });
  }

  //Edit Talent CMS Controller
  @Put('edit-talent/:id')
  @UseInterceptors(FileInterceptor('file'))
  async editTalent(@Body() body, @Param('id') id, @Res() res: Response) {
    try {
      const editedTalent = await this.talentsService.editTalent(id, {
        job_title: body.job_title,
        job_description: body.job_description,
        job_responsibilities: body.job_responsibilities,
        qualifications: body.qualifications,
        is_active: body.is_active,
      });
      res.json({
        status: 'success',
        message: 'Successfully edited the Talent!',
      });
    } catch (error) {
      res.json({ status: 'failed', message: 'Cannot edit the Talent' });
    }
  }

  //View Talent CMS Controller
  @Get('view-talent')
  async viewTalent(@Query('id') id, @Res() res: Response) {
    const viewingTalent = await this.talentsService.viewTalent(id);
    return res.render('talents/read', {
      layout: 'main',
      data: {
        job_title: viewingTalent.job_title,
        job_description: viewingTalent.job_description,
        job_responsibilities: viewingTalent.job_responsibilities,
        qualifications: viewingTalent.qualifications,
        is_active: viewingTalent.is_active,
      },
    });
  }

  //Toggle status CMS Controller
  @Post('toggle-status/:id')
  @UseInterceptors(FileInterceptor('file'))
  async toggleStatus(@Param('id') id, @Res() res: Response, @Body() body) {
    try {
      const activeStatus = await this.talentsService.toggleStatus(id, {
        is_active: body.status === 'true' ? false : true,
      });
      console.log(activeStatus);
      return res.json({ status: 'success' });
    } catch (error) {
      return res.json({ status: 'failed' });
    }
  }

  //Delete Talent CMS Controller
  @Post(':id')
  async deleteTalent(@Param('id') id, @Res() res: Response) {
    try {
      const deletedTalent = await this.talentsService.deleteTalent(id);
      return res.json({
        status: 'Success',
        message: 'Talent deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
