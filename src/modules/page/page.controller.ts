import { PageService } from './page.service';
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
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  //CMS Controller
  @Get()
  async getAllPages(@Res() res: Response, @Query('keywords') keywords) {
    const allPages = await this.pageService.getAllPages();
    const filtedPages = allPages.filter((page) => {
      return page.name.toLowerCase().includes(keywords?.toLowerCase());
    });
    return res.render('page/list', {
      layout: 'main',
      row: !keywords ? allPages : filtedPages,
    });
  }

  //API Controller
  @Get('api')
  async getAllPagesApi(@Res() res: Response) {
    const allPages = await this.pageService.getAllPages();
    return res.json({ data: allPages });
  }

  @Get('create-page')
  async getCreatePage(@Res() res: Response) {
    const allPrograms = await this.pageService.getPrograms();
    return res.render('page/create', { layout: 'main', data: allPrograms });
  }

  @Post('create-page')
  @UseInterceptors(FileInterceptor('file'))
  async createPage(@Body() body, @Res() res) {
    try {
      const data = {
        program: body.program,
        name: body.name,
        title: body.title,
        description: body.description,
        slug: '',
      };
      console.log(body.program, body.name);
      const programs = await this.pageService.getPrograms();
      const foundProgram = programs.find(
        (program) => program._id == body.program,
      );
      console.log(foundProgram);
      data.slug = foundProgram.link;
      const createdPage = await this.pageService.createPage(data);
      const saved = await this.pageService.savePageToProgram(
        foundProgram._id,
        createdPage,
      );

      return res.json({
        status: 'success',
        message: 'Successfully created the Page',
      });
    } catch (error) {
      return res.json({
        status: 'failed',
        message: error.message,
      });
    }
  }

  //Get Page edit form CMS Controller
  @Get('edit-page')
  async getEditPage(@Query('id') id, @Res() res: Response) {
    const viewingPage = await this.pageService.viewPage(id);
    console.log(viewingPage);
    return res.render('page/update', {
      layout: 'main',
      data: {
        program_title: viewingPage.program.title,
        name: viewingPage.name,
        title: viewingPage.title,
        description: viewingPage.description,
      },
    });
  }

  //Edit Page CMS Controller
  @Put('edit-page/:id')
  @UseInterceptors(FileInterceptor('banner_image', fileUpload(`Pages`)))
  async editPage(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    try {
      const editedPage = await this.pageService.editPage(id, {
        program: body.program,
        name: body.name,
        title: body.title,
        description: body.description,
      });
      console.log(editedPage);
      res.json({
        status: 'success',
        message: 'Successfully edited the Page!',
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 'failed', message: 'Cannot edit the Page' });
    }
  }

  //View Page CMS Controller
  @Get('view-page')
  async viewPage(@Query('id') id, @Res() res: Response) {
    const viewingPage = await this.pageService.viewPage(id);
    return res.render('page/read', {
      layout: 'main',
      data: {
        program_title: viewingPage.program.title,
        name: viewingPage.name,
        title: viewingPage.title,
        description: viewingPage.description,
        section: viewingPage.section,
      },
    });
  }

  //Delete Page CMS Controller
  @Post(':id')
  async deletePage(@Param('id') id, @Res() res: Response) {
    try {
      const deletedPage = await this.pageService.deletePage(id);
      return res.json({
        status: 'Success',
        message: 'Page deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: 'Cannot add more than one page',
      });
    }
  }
}
