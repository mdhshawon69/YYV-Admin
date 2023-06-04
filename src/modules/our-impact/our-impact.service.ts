import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ImpactNumber } from 'src/entities/our_impact/our_impact.schema';
import { Model } from 'mongoose';

@Injectable()
export class OurImpactService {
  constructor(
    @InjectModel(ImpactNumber.name)
    private readonly impactNumberModel: Model<ImpactNumber>,
  ) {}

  async getImpactNumbers(): Promise<ImpactNumber[]> {
    return await this.impactNumberModel.find().lean();
  }

  async addImpactNumber(impactItem): Promise<ImpactNumber> {
    console.log(impactItem);
    return await this.impactNumberModel.create(impactItem);
  }

  async deleteImpactNumber(id) {
    return await this.impactNumberModel.findByIdAndDelete(id);
  }

  async editImpactNumber(id, title, number) {
    return await this.impactNumberModel.findByIdAndUpdate(id, {
      title: title,
      impact_number: number,
    });
  }

  async getOneImpactNumber(id) {
    const impactNumber = await this.impactNumberModel.findById(id);
    return impactNumber;
  }
}
