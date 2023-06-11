import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Culture } from 'src/entities/culture/culture.schema';

@Injectable()
export class CultureService {
  constructor(
    @InjectModel(Culture.name) private readonly cultureModel: Model<Culture>,
  ) {}

  async getAllCulture() {
    return await this.cultureModel.find().lean();
  }

  async getAllCultureApi() {
    return await this.cultureModel.find().lean();
  }

  async createCulture(culture) {
    return await this.cultureModel.create(culture);
  }

  async getOneCulture(id) {
    return await this.cultureModel.findById(id);
  }

  async editCulture(id, title, description, thumb_image) {
    return await this.cultureModel.findByIdAndUpdate(id, {
      title,
      description,
      thumb_image,
    });
  }

  async deleteCulture(id) {
    return await this.cultureModel.findByIdAndDelete(id);
  }
}
