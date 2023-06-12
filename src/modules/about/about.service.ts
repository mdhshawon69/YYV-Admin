import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from 'src/entities/about/about.schema';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(About.name) private readonly aboutModel: Model<About>,
  ) {}

  async getAllAbout() {
    return this.aboutModel.find().lean();
  }

  async createAbout(About) {
    return await this.aboutModel.create(About);
  }

  async viewAbout(id) {
    return await this.aboutModel.findById(id);
  }

  async editAbout(id, About) {
    return await this.aboutModel.findByIdAndUpdate(id, About);
  }

  async deleteAbout(id) {
    return await this.aboutModel.findByIdAndDelete(id);
  }

  async toggleStatus(id, status) {
    return await this.aboutModel.findByIdAndUpdate(id, status);
  }
}
