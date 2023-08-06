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
import { SectionService } from './section.service';
import { calculatePagination } from 'src/helpers/pagination';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  //CMS Controller
  @Get()
  async getAllSections(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allSections = await this.sectionService.getAllSections();

    let allSectionsRow = [...allSections];
    if (keywords) {
      const tempArray = allSectionsRow.filter((item) =>
        item.name.toLowerCase().includes(keywords.toLowerCase()),
      );
      allSectionsRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allSectionsRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allSectionsRow.slice(startIndex, endIndex);
    return res.render('section/list', {
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
  async getAllSectionsApi(@Res() res: Response) {
    const allSections = await this.sectionService.getAllSections();
    return res.json({ data: allSections });
  }

  @Get('create-section')
  async getCreateSection(@Res() res: Response) {
    const allPages = await this.sectionService.getPages();

    console.log(allPages);

    return res.render('section/create', { layout: 'main', data: allPages });
  }

  @Post('create-section')
  @UseInterceptors(FileInterceptor('file'))
  async createSection(@Body() body, @Res() res) {
    try {
      const data = {
        page: body.page,
        name: body.name,
        title: body.title,
        description: body.description,
        is_multiple_content: body.is_multiple_content === 'on' ? true : false,
      };
      console.log(data);
      const pages = await this.sectionService.getPages();
      const foundPage = pages.find((page) => page._id == body.page);

      const createdSection = await this.sectionService.createSection(data);
      const saved = await this.sectionService.saveSectionToPage(
        foundPage._id,
        createdSection._id,
      );

      return res.json({
        status: 'success',
        message: 'Successfully created the Section',
      });
    } catch (error) {
      return res.json({
        status: 'failed',
        message: error.message,
      });
    }
  }

  //Get Section edit form CMS Controller
  @Get('edit-section')
  async getEditSection(@Query('id') id, @Res() res: Response) {
    const viewingSection = await this.sectionService.viewSection(id);

    return res.render('section/update', {
      layout: 'main',
      data: {
        page_title: viewingSection.page.title,
        page_id: viewingSection.page._id,
        name: viewingSection.name,
        title: viewingSection.title,
        description: viewingSection.description,
        is_multiple_content: viewingSection.is_multiple_content,
      },
    });
  }

  //Edit Section CMS Controller
  @Put('edit-section/:id')
  @UseInterceptors(FileInterceptor('banner_image', fileUpload(`sections`)))
  async editSection(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    try {
      const editedSection = await this.sectionService.editSection(id, {
        program: body.program,
        name: body.name,
        title: body.title,
        description: body.description,
        is_multiple_content: body.is_multiple_content === 'on' ? true : false,
      });
      res.json({
        status: 'success',
        message: 'Successfully edited the Section!',
      });
    } catch (error) {
      res.json({ status: 'failed', message: 'Cannot edit the Section' });
    }
  }

  //View Section CMS Controller
  @Get('view-section')
  async viewSection(@Query('id') id, @Res() res: Response) {
    const viewingSection = await this.sectionService.viewSection(id);
    return res.render('section/read', {
      layout: 'main',
      data: {
        page_title: viewingSection.page.title,
        name: viewingSection.name,
        title: viewingSection.title,
        description: viewingSection.description,
        is_multiple_content: viewingSection.is_multiple_content,
        content: '',
      },
    });
  }

  //Delete Section CMS Controller
  @Post(':id')
  async deleteSection(
    @Param('id') id,
    @Res() res: Response,
    @Query('page_id') page_id,
  ) {
    try {
      const deletedSection = await this.sectionService.deleteSection(
        id,
        page_id,
      );

      return res.json({
        status: 'Success',
        message: 'Section deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: 'Cannot add more than one Section',
      });
    }
  }
}
