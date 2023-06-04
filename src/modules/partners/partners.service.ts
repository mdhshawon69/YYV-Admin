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
    return this.partnersModel.create(partner);
  }
}
