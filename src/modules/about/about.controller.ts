import { AboutService } from './about.service';
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
import { calculatePagination } from 'src/helpers/pagination';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  async getAllAbouts(
    @Res() res: Response,
    @Query('page') page,
    @Query('keywords') keywords,
  ) {
    const allAbouts = await this.aboutService.getAllAbout();
    let allAboutsRow = [...allAbouts];
    if (keywords) {
      const tempArray = allAbouts.filter((item) =>
        item.title.toLowerCase().includes(keywords.toLowerCase()),
      );
      allAboutsRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allAboutsRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allAboutsRow.slice(startIndex, endIndex);

    return res.render('about/list', {
      layout: 'main',
      row: itemsForPage,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
      keywords,
    });
  }

  //Get all Abouts API Controller
  @Get('api')
  async getAllAboutsApi(@Res() res: Response) {
    const allAbouts = await this.aboutService.getAllAbout();
    return res.json({ data: allAbouts });
  }

  //Get create About form CMS Controller
  @Get('create-about')
  async getCreateAbout(@Res() res: Response) {
    return res.render('about/create', { layout: 'main' });
  }

  //Post create About CMS Controller
  @Post('create-about')
  @UseInterceptors(FileInterceptor('file'))
  async createAbout(@Body() body, @Res() res: Response, @Req() req: Request) {
    try {
      const createdAbout = await this.aboutService.createAbout({
        type: body.type,
        title: body.title,
        description_one: body.description_one,
        description_two: body.description_two,
      });
      return res.json({
        status: 'Success',
        message: 'Successfully created About!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  //Get About edit form CMS Controller
  @Get('edit-about')
  async getEditAbout(@Query('id') id, @Res() res: Response) {
    const viewingAbout = await this.aboutService.viewAbout(id);
    return res.render('about/update', {
      layout: 'main',
      data: {
        type: viewingAbout.type,
        title: viewingAbout.title,
        description_one: viewingAbout.description_one,
        description_two: viewingAbout.description_two,
      },
    });
  }

  //Edit About CMS Controller
  @Put('edit-about/:id')
  @UseInterceptors(FileInterceptor('file'))
  async editAbout(@Body() body, @Param('id') id, @Res() res: Response) {
    try {
      const editedAbout = await this.aboutService.editAbout(id, {
        type: body.type,
        title: body.title,
        description_one: body.description_one,
        description_two: body.description_two,
      });
      res.json({
        status: 'success',
        message: 'Successfully edited the About!',
      });
    } catch (error) {
      res.json({ status: 'failed', message: 'Cannot edit the About' });
    }
  }

  //View About CMS Controller
  @Get('view-about')
  async viewAbout(@Query('id') id, @Res() res: Response) {
    const viewingAbout = await this.aboutService.viewAbout(id);
    return res.render('about/read', {
      layout: 'main',
      data: {
        type: viewingAbout.type,
        title: viewingAbout.title,
        description_one: viewingAbout.description_one,
        description_two: viewingAbout.description_two,
      },
    });
  }

  //Toggle status CMS Controller
  @Post('toggle-status/:id')
  @UseInterceptors(FileInterceptor('file'))
  async toggleStatus(@Param('id') id, @Res() res: Response, @Body() body) {
    try {
      const activeStatus = await this.aboutService.toggleStatus(id, {
        is_active: body.status === 'true' ? false : true,
      });
      console.log(activeStatus);
      return res.json({ status: 'success' });
    } catch (error) {
      return res.json({ status: 'failed' });
    }
  }

  //Delete About CMS Controller
  @Post(':id')
  async deleteAbout(@Param('id') id, @Res() res: Response) {
    try {
      const deletedAbout = await this.aboutService.deleteAbout(id);
      return res.json({
        status: 'Success',
        message: 'About deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
