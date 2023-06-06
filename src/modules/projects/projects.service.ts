import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/entities/Projects/Projects.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly ProjectModel: Model<Project>,
  ) {}

  async getAllProjects() {
    return this.ProjectModel.find().lean();
  }

  async createProject(Project) {
    return await this.ProjectModel.create(Project);
  }

  async viewProject(id) {
    return await this.ProjectModel.findById(id);
  }

  async deleteProject(id) {
    return await this.ProjectModel.findByIdAndDelete(id);
  }
}
