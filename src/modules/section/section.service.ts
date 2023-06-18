import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from 'src/entities/page/page.schema';
import { Section } from 'src/entities/section/section.schema';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private readonly sectionModel: Model<Section>,
    @InjectModel(Page.name) private readonly pageModel: Model<Page>,
  ) {}

  async getAllSections() {
    return await this.sectionModel
      .find()
      .populate('content')
      .populate('page', 'name')
      .lean();
  }

  async createSection(Section) {
    return await this.sectionModel.create(Section);
  }

  async viewSection(id) {
    return await this.sectionModel.findById(id).populate('page', 'title');
  }

  async editSection(id, Section) {
    return await this.sectionModel.findByIdAndUpdate(id, Section);
  }

  async deleteSection(id, page_id) {
    const deleteItem = await this.sectionModel.findById(id);

    const deleteFromPage = await this.pageModel.updateOne(
      { _id: page_id },
      { $pull: { section: deleteItem } },
    );

    return await this.sectionModel.findByIdAndDelete(id);
  }

  async getPages() {
    return this.pageModel.find().lean();
  }

  async saveSectionToPage(id, section) {
    const page = await this.pageModel.updateOne(
      { _id: id },
      { $push: { section: section } },
    );
    return page;
  }
}
