import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Res,
  UseInterceptors,
  UploadedFile,
  Put,
  Param,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';
import { calculatePagination } from 'src/helpers/pagination';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  //CMS Controller
  @Get()
  async getAllPrograms(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allPrograms = await this.programsService.getAllPrograms();
    let allProgramsRow = [];
    allPrograms.forEach((item) => {
      const tempItem = { ...item };
      tempItem.banner_image = `${item.banner_image}`;
      allProgramsRow.push(tempItem);
    });
    if (keywords) {
      const tempArray = allProgramsRow.filter((item) =>
        item.title.toLowerCase().includes(keywords.toLowerCase()),
      );
      allProgramsRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allProgramsRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allProgramsRow.slice(startIndex, endIndex);
    return res.render('programs/list', {
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

  //API Controller
  @Get('api')
  async getAllProgramsApi(@Res() res: Response) {
    const allprograms = await this.programsService.getAllPrograms();
    const allprogramsRow = [];
    allprograms.forEach((item) => {
      const tempItem = { ...item };
      tempItem.banner_image = `${item.banner_image}`;
      allprogramsRow.push(tempItem);
    });
    return res.json({ data: allprogramsRow });
  }

  @Get('create-program')
  async getCreateProgram(@Res() res: Response) {
    return res.render('programs/create', { layout: 'main' });
  }

  @Post('create-program')
  @UseInterceptors(FileInterceptor('banner_image', fileUpload(`programs`)))
  async createProgram(@Body() body, @Res() res, @UploadedFile() file) {
    const link = `${body.title.toLowerCase().split(' ').join('-')}`;
    try {
      const createdProgram = await this.programsService.createProgram({
        type: body.type,
        category: body.category,
        title: body.title,
        sub_title: body.sub_title,
        banner_image: body.banner_image,
        link: body.has_landing_page === 'on' ? link : body.link,
        status: body.status,
        location: body.location,
        has_landing_page: body.has_landing_page === 'on' ? true : false,
      });
      return res.json({
        status: 'success',
        message: 'Successfully created the program',
      });
    } catch (error) {
      return res.json({
        status: 'failed',
        message: 'Cannot create program with same information',
      });
    }
  }

  //Get program edit form CMS Controller
  @Get('edit-program')
  async getEditProgram(@Query('id') id, @Res() res: Response) {
    const viewingprogram = await this.programsService.viewProgram(id);
    return res.render('programs/update', {
      layout: 'main',
      data: {
        type: viewingprogram.type,
        category: viewingprogram.category,
        title: viewingprogram.title,
        sub_title: viewingprogram.sub_title,
        banner_image: `${viewingprogram.banner_image}`,
        link: viewingprogram.link,
        status: viewingprogram.status,
        location: viewingprogram.location,
        banner_image_source: viewingprogram.banner_image,
        has_landing_page: viewingprogram.has_landing_page,
      },
    });
  }

  //Edit program CMS Controller
  @Put('edit-program/:id')
  @UseInterceptors(FileInterceptor('banner_image', fileUpload(`programs`)))
  async editProgram(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    const link = `${body.title.split(' ').join('-')}`;
    try {
      const editedprogram = await this.programsService.editProgram(id, {
        type: body.type,
        category: body.category,
        title: body.title,
        sub_title: body.sub_title,
        banner_image: body.banner_image,
        link: body.has_landing_program === 'on' ? link : body.link,
        status: body.status,
        location: body.location,
        has_landing_page: body.has_landing_page === 'on' ? true : false,
      });

      res.json({
        status: 'success',
        message: 'Successfully edited the program!',
      });
    } catch (error) {
      res.json({ status: 'failed', message: 'Cannot edit the program' });
    }
  }

  //View program CMS Controller
  @Get('view-program')
  async viewProgram(@Query('id') id, @Res() res: Response) {
    const viewingprogram = await this.programsService.viewProgram(id);
    return res.render('programs/read', {
      layout: 'main',
      data: {
        type: viewingprogram.type,
        category: viewingprogram.category,
        title: viewingprogram.title,
        sub_title: viewingprogram.sub_title,
        banner_image: `${viewingprogram.banner_image}`,
        link: viewingprogram.link,
        status: viewingprogram.status,
        location: viewingprogram.location,
      },
    });
  }

  //Delete program CMS Controller
  @Post(':id')
  async deleteProgram(@Param('id') id, @Res() res: Response) {
    try {
      const deletedProgram = await this.programsService.deleteProgram(id);
      return res.json({
        status: 'Success',
        message: 'program deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
