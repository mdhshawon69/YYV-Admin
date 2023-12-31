import { Request, Response } from 'express';
import { BlogService } from './blog.service';
import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  UseInterceptors,
  Req,
  UploadedFile,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';
import { calculatePagination } from '../../helpers/pagination';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private cloudinaryService: CloudinaryService,
  ) {}

  //Get all blogs CMS Controller
  @Get()
  async getAllBlogs(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allBlogs = await this.blogService.getAllBlogs();
    let allBlogsRow = [];
    allBlogs.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = item.thumb_image;
      allBlogsRow.push(tempItem);
    });
    if (keywords) {
      const tempArray = allBlogsRow.filter((item) =>
        item.title.toLowerCase().includes(keywords.toLowerCase()),
      );
      allBlogsRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allBlogsRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allBlogsRow.slice(startIndex, endIndex);

    return res.render('blogs/list', {
      row: itemsForPage,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
      keywords,
    });
  }

  //Get all blogs API Controller
  @Get('api')
  async getAllBlogsApi(@Res() res: Response) {
    const allBlogs = await this.blogService.getAllBlogsApi();
    const allBlogsRow = [];
    allBlogs.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = item.thumb_image;
      allBlogsRow.push(tempItem);
    });
    return res.json({ data: allBlogsRow.reverse() });
  }

  //Get create blog form CMS Controller
  @Get('create-blog')
  async getCreateBlog(@Res() res: Response) {
    return res.render('blogs/create', { layout: 'main' });
  }

  //Post create blog CMS Controller
  @Post('create-blog')
  @UseInterceptors(FileInterceptor('file'))
  async createBlog(
    @Body() body,
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile() file,
  ) {
    try {
      const thumbImage = await this.cloudinaryService.uploadImage(file);
      const data = {
        type: body.blog_type,
        title: body.title,
        sub_title: body.sub_title,
        name_of_viewer: body.name_of_viewer,
        designation_of_viewer: body.designation_of_viewer,
        description: body.blog_description,
        thumb_image: thumbImage.url,
        newsletter_file: body.newsletter_file,
        link: '',
        seo_description: body.seo_description,
        related: body.related,
      };
      data.link = `${body.title
        .replace(/[,:%]/g, '')
        .toLowerCase()
        .split(' ')
        .join('-')}`;
      if (thumbImage) {
        const createdBlog = await this.blogService.createBlog(data);
      }
      return res.json({
        status: 'Success',
        message: 'Successfully created blog!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  //View Blog CMS Controller
  @Get('view-blog')
  async viewBlog(@Query('id') id, @Res() res: Response) {
    const viewingBlog = await this.blogService.viewBlog(id);
    return res.render('blogs/read', {
      layout: 'main',
      data: {
        type: viewingBlog.type,
        title: viewingBlog.title,
        sub_title: viewingBlog.sub_title,
        name_of_viewer: viewingBlog.name_of_viewer,
        designation_of_viewer: viewingBlog.designation_of_viewer,
        description: viewingBlog.description,
        thumb_image: viewingBlog.thumb_image,
        newsletter_file: viewingBlog.newsletter_file,
        seo_description: viewingBlog.seo_description,
        related: viewingBlog.related,
      },
    });
  }

  //Get Blog edit form CMS Controller
  @Get('edit-blog')
  async getEditBlog(@Query('id') id, @Res() res: Response) {
    const viewingBlog = await this.blogService.viewBlog(id);
    return res.render('blogs/update', {
      layout: 'main',
      data: {
        type: viewingBlog.type,
        title: viewingBlog.title,
        sub_title: viewingBlog.sub_title,
        name_of_viewer: viewingBlog.name_of_viewer,
        designation_of_viewer: viewingBlog.designation_of_viewer,
        description: viewingBlog.description,
        thumb_image_source: viewingBlog.thumb_image,
        thumb_image: viewingBlog.thumb_image,
        newsletter_file: viewingBlog.newsletter_file,
        seo_description: viewingBlog.seo_description,
        related: viewingBlog.related,
      },
    });
  }

  //Edit Blog CMS Controller
  @Put('edit-blog/:id')
  @UseInterceptors(FileInterceptor('file'))
  async editBlog(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    try {
      const thumbImage = await this.cloudinaryService.uploadImage(file);
      if (thumbImage) {
        const editedBlog = await this.blogService.editBlog(id, {
          title: body.title,
          sub_title: body.sub_title,
          name_of_viewer: body.name_of_viewer,
          designation_of_viewer: body.designation_of_viewer,
          description: body.blog_description,
          type: body.blog_type,
          thumb_image: thumbImage.url,
          newsletter_file: body.newsletter_file,
          seo_description: body.seo_description,
          related: body.related,
        });
      }

      res.json({ status: 'success', message: 'Successfully edited the blog!' });
    } catch (error) {
      console.log(error);
      res.json({ status: 'failed', message: 'Cannot edit the blog' });
    }
  }

  //Delete Blog CMS Controller
  @Post(':id')
  async deleteBlog(@Param('id') id, @Res() res: Response) {
    try {
      const deletedBlog = await this.blogService.deleteBlog(id);
      return res.json({
        status: 'Success',
        message: 'Blog deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
