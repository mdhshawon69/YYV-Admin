import { ContentService } from './content.service';
import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Res,
  UseInterceptors,
  Put,
  Param,
  UploadedFiles,
} from '@nestjs/common';
import { Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';
import { calculatePagination } from 'src/helpers/pagination';
import { ObjectId } from 'mongodb';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getAllContents(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allContents = await this.contentService.getAllContents();
    console.log(allContents);
    let allContentsRow = [];
    allContents.forEach((item) => {
      item.image_one = `${process.env.BASE_URL}/uploads/content/${item.image_one}`;
      item.image_two = `${process.env.BASE_URL}/uploads/content/${item.image_two}`;
      return allContentsRow.push(item);
    });

    if (keywords) {
      const tempArray = allContentsRow.filter((item) =>
        item.title.toLowerCase().includes(keywords.toLowerCase()),
      );
      allContentsRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allContentsRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allContentsRow.slice(startIndex, endIndex);

    return res.render('content/list', {
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
  async getAllContentsApi(@Res() res: Response) {
    const allContents = await this.contentService.getAllContents();
    console.log(allContents);
    const allContentsRow = [];
    allContents.forEach((item) => {
      item.image_one = `${process.env.BASE_URL}/uploads/content/${item.image_one}`;
      item.image_two = `${process.env.BASE_URL}/uploads/content/${item.image_two}`;
      allContentsRow.push(item);
    });

    res.json({ data: allContentsRow });
  }

  @Get('create-content')
  async getCreateContent(@Res() res: Response) {
    const allPages = await this.contentService.getPages();
    return res.render('content/create', { layout: 'main', data: allPages });
  }

  @Get('/sections')
  async getSections(@Query() query, @Res() res) {
    const page = await this.contentService.getPagesById(query.page_id);
    const allSections = page.section;
    return res.json({ data: allSections });
  }

  @Post('create-content')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image_one', maxCount: 1 },
        { name: 'image_two', maxCount: 1 },
      ],
      fileUpload(`content`),
    ),
  )
  async createContent(@Body() body, @Res() res, @UploadedFiles() files) {
    console.log(files);
    try {
      const data = {
        page: body.page,
        section: body.section,
        title: body.title,
        sub_title: body.sub_title,
        description_one: body.description_one,
        description_two: body.description_two,
        image_one: files.image_one?.[0].filename,
        image_two: files.image_two?.[0].filename,
        image_title_one: body.image_title_one,
        image_title_two: body.image_title_two,
        image_desc_one: body.image_desc_one,
        image_desc_two: body.image_desc_two,
        link_one: body.link_one,
        link_two: body.link_two,
        image_source: body.image_source,
        closing_date: body.closing_date,
      };

      console.log(data);

      const section = await this.contentService.getSectionById(body.section);
      console.log(section);

      const createdContent = await this.contentService.createContent(data);
      const saved = await this.contentService.saveContentToSection(
        section._id,
        createdContent._id,
      );

      return res.json({
        status: 'success',
        message: 'Successfully created the Content',
      });
    } catch (error) {
      return res.json({
        status: 'failed',
        message: error.message,
      });
    }
  }

  //Get Content edit form CMS Controller
  @Get('edit-content')
  async getEditContent(@Query('id') id: any, @Res() res: Response) {
    const viewingContent = await this.contentService.viewContent(id);

    return res.render('content/update', {
      layout: 'main',
      data: {
        page: viewingContent.page,
        section: viewingContent.section,
        title: viewingContent.title,
        sub_title: viewingContent.sub_title,
        description_one: viewingContent.description_one,
        description_two: viewingContent.description_two,
        image_one: viewingContent.image_one,
        image_two: viewingContent.image_two,
        image_title_one: viewingContent.image_title_one,
        image_title_two: viewingContent.image_title_two,
        image_desc_one: viewingContent.image_desc_one,
        image_desc_two: viewingContent.image_desc_two,
        link_one: viewingContent.link_one,
        link_two: viewingContent.link_two,
        image_source: viewingContent.image_source,
        closing_date: viewingContent.closing_date,
      },
    });
  }

  //Edit Content CMS Controller
  @Put('edit-content/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image_one', maxCount: 1 },
        { name: 'image_two', maxCount: 1 },
      ],
      fileUpload(`content`),
    ),
  )
  async editContent(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFiles() files,
  ) {
    try {
      const editedContent = await this.contentService.editContent(id, {
        page: body.page,
        section: body.section,
        title: body.title,
        sub_title: body.sub_title,
        description_one: body.description_one,
        description_two: body.description_two,
        image_one: files.image_one?.[0].filename,
        image_two: files.image_two?.[0].filename,
        image_title_one: body.image_title_one,
        image_title_two: body.image_title_two,
        image_desc_one: body.image_desc_one,
        image_desc_two: body.image_desc_two,
        link_one: body.link_one,
        link_two: body.link_two,
        image_source: body.image_source,
        closing_date: body.closing_date,
      });
      res.json({
        status: 'success',
        message: 'Successfully edited the Content!',
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 'failed', message: 'Cannot edit the Content' });
    }
  }

  //View Content CMS Controller
  @Get('view-content')
  async viewContent(@Query('id') id, @Res() res: Response) {
    const viewingContent = await this.contentService.viewContent(id);
    console.log(viewingContent);

    return res.render('content/read', {
      layout: 'main',
      data: {
        page: viewingContent.page,
        section: viewingContent.section,
        title: viewingContent.title,
        sub_title: viewingContent.sub_title,
        description_one: viewingContent.description_one,
        description_two: viewingContent.description_two,
        image_one: `${process.env.BASE_URL}/uploads/content/${viewingContent.image_one}`,
        image_two: `${process.env.BASE_URL}/uploads/content/${viewingContent.image_two}`,
        image_title_one: viewingContent.image_title_one,
        image_title_two: viewingContent.image_title_two,
        image_desc_one: viewingContent.image_desc_one,
        image_desc_two: viewingContent.image_desc_two,
        link_one: viewingContent.link_one,
        link_two: viewingContent.link_two,
        image_source: viewingContent.image_source,
        closing_date: viewingContent.closing_date,
      },
    });
  }

  //Delete Content CMS Controller
  @Post(':id')
  async deleteContent(
    @Param('id') id,
    @Res() res: Response,
    @Query('section_id') section_id,
  ) {
    try {
      const deletedContent = await this.contentService.deleteContent(
        id,
        section_id,
      );
      return res.json({
        status: 'Success',
        message: 'Content deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: 'Cannot add more than one Content',
      });
    }
  }
}
