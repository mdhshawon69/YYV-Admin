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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  //Get all blogs CMS Controller
  @Get()
  async getAllBlogs(@Res() res: Response) {
    const allBlogs = await this.blogService.getAllBlogs();
    const allBlogsRow = [];
    allBlogs.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = `${process.env.BASE_URL}/uploads/blog/${item.thumb_image}`;
      allBlogsRow.push(tempItem);
    });
    console.log(allBlogsRow);
    return res.render('blogs/blogs', { layout: 'main', row: allBlogsRow });
  }

  //Get all blogs API Controller
  @Get()
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
    return res.render('blogs/create-blogs-form', { layout: 'main' });
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
    console.log(id);
    const viewingBlog = await this.blogService.viewBlog(id);
    console.log(viewingBlog);
    return res.render('blogs/single_blog', {
      layout: 'main',
      data: {
        type: viewingBlog.type,
        title: viewingBlog.title,
        description: viewingBlog.description,
        thumb_image: `${process.env.BASE_URL}/uploads/blog/${viewingBlog.thumb_image}`,
      },
    });
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
