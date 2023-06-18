import { ContentService } from './content.service';
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

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getAllContents(@Res() res: Response, @Query('keywords') keywords) {
    const allContents = await this.contentService.getAllContents();
    const filtedContents = allContents.filter((Content) => {
      return Content.title.toLowerCase().includes(keywords?.toLowerCase());
    });
    return res.render('content/list', {
      layout: 'main',
      row: !keywords ? allContents : filtedContents,
    });
  }

  //API Controller
  @Get('api')
  async getAllContentsApi(@Res() res: Response) {
    const allContents = await this.contentService.getAllContents();
    return res.json({ data: allContents });
  }

  @Get('create-content')
  async getCreateContent(@Res() res: Response) {
    const allSections = await this.contentService.getSections();
    return res.render('content/create', { layout: 'main', data: allSections });
  }

  @Post('create-content')
  @UseInterceptors(FileInterceptor('file', fileUpload(`content`)))
  async createContent(@Body() body, @Res() res, @UploadedFile() file) {
    try {
      const data = {
        section: body.section,
        title: body.title,
        sub_title: body.sub_title,
        extra_title: body.extra_title,
        link_one: body.link_one,
        link_two: body.link_two,
        description_one: body.description_one,
        description_two: body.description_two,
        thumb_image: file.filename,
        banner_image: file.filename,
        image_source: body.image_source,
      };
      console.log(data);
      const sections = await this.contentService.getSections();
      const foundSection = sections.find(
        (section) => section._id == body.section,
      );

      const createdContent = await this.contentService.createContent(data);
      const saved = await this.contentService.saveContentToSection(
        foundSection._id,
        createdContent,
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
  async getEditContent(@Query('id') id, @Res() res: Response) {
    const viewingContent = await this.contentService.viewContent(id);

    return res.render('content/update', {
      layout: 'main',
      data: {
        section_id: viewingContent.section._id,
        section_title: viewingContent.section.title,
        title: viewingContent.title,
        sub_title: viewingContent.sub_title,
        extra_title: viewingContent.extra_title,
        link_one: viewingContent.link_one,
        link_two: viewingContent.link_two,
        description_one: viewingContent.description_one,
        description_two: viewingContent.description_two,
        thumb_image: viewingContent.thumb_image,
        banner_image: `${process.env.BASE_URL}/uploads/content/${viewingContent.thumb_image}`,
        image_source: viewingContent.image_source,
      },
    });
  }

  //Edit Content CMS Controller
  @Put('edit-content/:id')
  @UseInterceptors(FileInterceptor('banner_image', fileUpload(`content`)))
  async editContent(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    try {
      const editedContent = await this.contentService.editContent(id, {
        section: body.section,
        title: body.title,
        sub_title: body.sub_title,
        extra_title: body.extra_title,
        link_one: body.link_one,
        link_two: body.link_two,
        description_one: body.description_one,
        description_two: body.description_two,
        thumb_image: file.filename,
        banner_image: file.filename,
        image_source: body.image_source,
      });
      res.json({
        status: 'success',
        message: 'Successfully edited the Content!',
      });
    } catch (error) {
      res.json({ status: 'failed', message: 'Cannot edit the Content' });
    }
  }

  //View Content CMS Controller
  @Get('view-content')
  async viewContent(@Query('id') id, @Res() res: Response) {
    const viewingContent = await this.contentService.viewContent(id);
    return res.render('content/read', {
      layout: 'main',
      data: {
        section: viewingContent.section,
        title: viewingContent.title,
        sub_title: viewingContent.sub_title,
        extra_title: viewingContent.extra_title,
        link_one: viewingContent.link_one,
        link_two: viewingContent.link_two,
        description_one: viewingContent.description_one,
        description_two: viewingContent.description_two,
        thumb_image: viewingContent.thumb_image,
        banner_image: viewingContent.thumb_image,
        image_source: viewingContent.image_source,
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
    console.log(section_id);
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
