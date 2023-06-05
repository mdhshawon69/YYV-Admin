import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/entities/blog/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async getAllBlogs() {
    return this.blogModel.find().lean();
  }

  async createBlog(blog) {
    return await this.blogModel.create(blog);
  }

  async viewBlog(id) {
    return await this.blogModel.findById(id);
  }

  async deleteBlog(id) {
    return await this.blogModel.findByIdAndDelete(id);
  }
}
