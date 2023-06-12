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

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  //Get all blogs CMS Controller
  @Get()
  async getAllBlogs(@Res() res: Response, @Query('keywords') keywords) {
    const allBlogs = await this.blogService.getAllBlogs();
    const allBlogsRow = [];
    allBlogs.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = `${process.env.BASE_URL}/uploads/blog/${item.thumb_image}`;
      allBlogsRow.push(tempItem);
    });
    const filtedBlogs = allBlogsRow.filter((blog) => {
      return blog.title.toLowerCase().includes(keywords?.toLowerCase());
    });
    return res.render('blogs/list', {
      layout: 'main',
      row: !keywords ? allBlogsRow : filtedBlogs,
    });
  }

  //Get all blogs API Controller
  @Get('api')
  async getAllBlogsApi(@Res() res: Response) {
    const allBlogs = await this.blogService.getAllBlogs();
    const allBlogsRow = [];
    allBlogs.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = `uploads/blog/${item.thumb_image}`;
      allBlogsRow.push(tempItem);
    });
    return res.json({ data: allBlogsRow });
  }

  //Get create blog form CMS Controller
  @Get('create-blog')
  async getCreateBlog(@Res() res: Response) {
    return res.render('blogs/create', { layout: 'main' });
  }

  //Post create blog CMS Controller
  @Post('create-blog')
  @UseInterceptors(FileInterceptor('file', fileUpload(`blog`)))
  async createBlog(
    @Body() body,
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile() file,
  ) {
    try {
      const createdBlog = await this.blogService.createBlog({
        type: body.blog_type,
        title: body.blog_title,
        description: body.blog_description,
        thumb_image: file.filename,
      });
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
        description: viewingBlog.description,
        thumb_image: `${process.env.BASE_URL}/uploads/blog/${viewingBlog.thumb_image}`,
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
        description: viewingBlog.description,
        thumb_image_source: viewingBlog.thumb_image,
        thumb_image: `${process.env.BASE_URL}/uploads/blog/${viewingBlog.thumb_image}`,
      },
    });
  }

  //Edit Blog CMS Controller
  @Put('edit-blog/:id')
  @UseInterceptors(FileInterceptor('file', fileUpload(`blog`)))
  async editBlog(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    try {
      const editedBlog = await this.blogService.editBlog(id, {
        title: body.blog_title,
        description: body.blog_description,
        type: body.blog_type,
        thumb_image: file?.filename,
      });
      res.json({ status: 'success', message: 'Successfully edited the blog!' });
    } catch (error) {
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
