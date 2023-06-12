import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from 'src/entities/team/team.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async getAllMembers() {
    return await this.teamModel.find().lean();
  }

  async createMember(member) {
    return await this.teamModel.create(member);
  }

  async viewMember(id) {
    return await this.teamModel.findById(id);
  }

  async editMember(id, member) {
    return await this.teamModel.findByIdAndUpdate(id, member);
  }

  async deleteMember(id) {
    return await this.teamModel.findByIdAndDelete(id);
  }

  async toggleStatus(id, status) {
    return await this.teamModel.findByIdAndUpdate(id, status);
  }
}
