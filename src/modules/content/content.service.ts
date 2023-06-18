import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from 'src/entities/content/content.schema';
import { Section } from 'src/entities/section/section.schema';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private readonly contentModel: Model<Content>,
    @InjectModel(Section.name) private readonly sectionModel: Model<Section>,
  ) {}

  async getAllContents() {
    return await this.contentModel.find().populate('section').lean();
  }

  async createContent(Content) {
    return await this.contentModel.create(Content);
  }

  async viewContent(id) {
    return await this.contentModel.findById(id).populate('section', 'title');
  }

  async editContent(id, Content) {
    return await this.contentModel.findByIdAndUpdate(id, Content);
  }

  async deleteContent(id, section_id) {
    const deleteItem = await this.contentModel.findById(id);
    const deleteFromContent = await this.sectionModel.updateOne(
      { _id: section_id },
      { $pull: { content: deleteItem } },
    );

    return await this.contentModel.findByIdAndDelete(id);
  }

  async getSections() {
    return this.sectionModel.find().lean();
  }

  async saveContentToSection(id, content) {
    const section = await this.sectionModel.updateOne(
      { _id: id },
      { $push: { content: content } },
    );
    return section;
  }
}
