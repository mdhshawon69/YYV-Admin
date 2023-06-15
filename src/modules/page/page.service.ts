import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from 'src/entities/page/page.schema';
import { Programs } from 'src/entities/programs/programs.schema';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name) private readonly pageModel: Model<Page>,
    @InjectModel(Programs.name) private readonly programsModel: Model<Programs>,
  ) {}

  async getAllPages() {
    return await this.pageModel.find().populate('program', 'title -_id').lean();
  }

  async createPage(Page) {
    return await this.pageModel.create(Page);
  }

  async viewPage(id) {
    return await this.pageModel.findById(id).populate('program', 'title');
  }

  async editPage(id, Page) {
    return await this.pageModel.findByIdAndUpdate(id, Page);
  }

  async deletePage(id) {
    return await this.pageModel.findByIdAndDelete(id);
  }

  async getPrograms() {
    return this.programsModel.find().lean();
  }

  async savePageToProgram(id, page) {
    const program = await this.programsModel.findById(id);
    program.page = page;
    return await program.save();
  }
}
