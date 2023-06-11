import { Talents } from './../../entities/talents/talents.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TalentsService {
  constructor(
    @InjectModel(Talents.name) private readonly talentsModel: Model<Talents>,
  ) {}

  async getAllTalents() {
    return this.talentsModel.find().lean();
  }

  async createTalent(talent) {
    return await this.talentsModel.create(talent);
  }

  async viewTalent(id) {
    return await this.talentsModel.findById(id);
  }

  async editTalent(id, talent) {
    return await this.talentsModel.findByIdAndUpdate(id, talent);
  }

  async deleteTalent(id) {
    return await this.talentsModel.findByIdAndDelete(id);
  }

  async toggleStatus(id, status) {
    return await this.talentsModel.findByIdAndUpdate(id, status);
  }
}
