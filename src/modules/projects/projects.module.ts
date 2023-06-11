import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from 'src/entities/projects/projects.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
