import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Programs } from 'src/entities/programs/programs.schema';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel(Programs.name)
    private readonly programsModel: Model<Programs>,
  ) {}

  async getAllPrograms() {
    return await this.programsModel.find().lean();
  }

  async createProgram(program) {
    return await this.programsModel.create(program);
  }

  async viewProgram(id) {
    return await this.programsModel.findById(id);
  }

  async editProgram(id, program) {
    return await this.programsModel.findByIdAndUpdate(id, program);
  }

  async deleteProgram(id) {
    return await this.programsModel.findByIdAndDelete(id);
  }
}
