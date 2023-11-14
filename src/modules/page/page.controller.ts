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
import { calculatePagination } from 'src/helpers/pagination';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('pages')
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private cloudinaryService: CloudinaryService,
  ) {}

  //CMS Controller
  @Get()
  async getAllPages(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allPages = await this.pageService.getAllPages();
    let allPagesRow = [...allPages];
    if (keywords) {
      const tempArray = allPagesRow.filter((item) =>
        item.title.toLowerCase().includes(keywords.toLowerCase()),
      );
      allPagesRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allPagesRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);
    allPagesRow.forEach((item) => {
      item.image = item.image;
    });
    const itemsForPage = allPagesRow.slice(startIndex, endIndex);
    return res.render('page/list', {
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
  async getAllPagesApi(@Res() res: Response) {
    const allPages = await this.pageService.getAllPages();
    allPages.forEach((item) => {
      item.image = item.image;
    });
    return res.json({ data: allPages });
  }

  @Get('create-page')
  async getCreatePage(@Res() res: Response) {
    return res.render('page/create', { layout: 'main' });
  }

  @Get('page-category')
  async getPageCategory(@Query() query, @Res() res) {
    const pageCategory = await this.pageService.getPageCategory(query.category);
    res.json({ data: pageCategory });
  }

  @Post('create-page')
  @UseInterceptors(FileInterceptor('file'))
  async createPage(@Body() body, @Res() res, @UploadedFile() file) {
    try {
      const image = await this.cloudinaryService.uploadImage(file);
      const data = {
        category: body.category,
        page_for: body.page_for,
        pattern: body.pattern,
        name: body.name,
        title: body.title,
        description: body.description,
        slug: '',
        image: image.url,
      };

      const programs: any = await this.pageService.getPageCategory(
        body.category,
      );

      const foundProgram = programs?.find(
        (program) => program._id == body.page_for,
      );

      data.slug = foundProgram.link || '';
      data.page_for = foundProgram.title;
      if (image) {
        const createdPage = await this.pageService.createPage(data);
      }

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

    return res.render('page/update', {
      layout: 'main',
      data: {
        category: viewingPage.category,
        page_for: viewingPage.page_for,
        name: viewingPage.name,
        title: viewingPage.title,
        description: viewingPage.description,
        image: viewingPage.image,
      },
    });
  }

  //Edit Page CMS Controller
  @Put('edit-page/:id')
  @UseInterceptors(FileInterceptor('file'))
  async editPage(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    try {
      const image = await this.cloudinaryService.uploadImage(file);

      if (image) {
        const editedPage = await this.pageService.editPage(id, {
          program: body.program,
          name: body.name,
          title: body.title,
          description: body.description,
          image: image.url,
        });
      }

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
        page_for: viewingPage.page_for,
        category: viewingPage.category,
        name: viewingPage.name,
        title: viewingPage.title,
        description: viewingPage.description,
        section: viewingPage.section,
        image: viewingPage.image,
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
