import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PageSchema } from 'src/entities/page/page.schema';
import { ProgramsSchema } from 'src/entities/programs/programs.schema';
import { BlogSchema } from 'src/entities/blog/blog.schema';
import { ProjectSchema } from 'src/entities/projects/projects.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Page', schema: PageSchema },
      { name: 'Programs', schema: ProgramsSchema },
      { name: 'Blog', schema: BlogSchema },
      { name: 'Project', schema: ProjectSchema },
    ]),
  ],
  providers: [PageService, CloudinaryService],
  controllers: [PageController],
})
export class PageModule {}
