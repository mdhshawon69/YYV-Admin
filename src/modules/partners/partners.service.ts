import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Partners } from 'src/entities/partners/partners.schema';
import { Model } from 'mongoose';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partners.name) private readonly partnersModel: Model<Partners>,
  ) {}

  async getAllPartners() {
    return await this.partnersModel.find().lean();
  }

  async getAllPartnersApi() {
    return await this.partnersModel.find().lean();
  }

  async createPartner(partner) {
    return await this.partnersModel.create(partner);
  }

  async getOnePartner(id) {
    return await this.partnersModel.findById(id);
  }

  async editPartner(id, name, partner_link, partner_logo) {
    return await this.partnersModel.findByIdAndUpdate(id, {
      name,
      partner_link,
      partner_logo,
    });
  }

  async deletePartner(id) {
    return await this.partnersModel.findByIdAndDelete(id);
  }
}
