import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/entities/blog/blog.schema';
import { Page } from 'src/entities/page/page.schema';
import { Programs } from 'src/entities/programs/programs.schema';
import { Project } from 'src/entities/projects/projects.schema';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private readonly pageModel: Model<Page>,
    @InjectModel(Programs.name) private readonly programsModel: Model<Programs>,
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async getAllPages() {
    return await this.pageModel
      .find()
      .populate({
        path: 'section',
        populate: {
          path: 'content',
        },
      })
      .lean();
  }

  async createPage(Page) {
    return await this.pageModel.create(Page);
  }

  async viewPage(id) {
    return await this.pageModel
      .findById(id)
      .populate('title')
      .populate('section')
      .populate('content');
  }

  async editPage(id, Page) {
    return await this.pageModel.findByIdAndUpdate(id, Page);
  }

  async deletePage(id) {
    return await this.pageModel.findByIdAndDelete(id);
  }

  async getPageCategory(category: any) {
    if (category === 'program') {
      return this.programsModel.find().lean();
    } else if (category === 'blog') {
      return this.blogModel.find().lean();
    } else if (category === 'project') {
      return this.projectModel.find().lean();
    }
  }

  async savePageToProgram(id, page_id) {
    const program = await this.programsModel.findById(id);
    program.page = page_id;
    return await program.save();
  }
}
