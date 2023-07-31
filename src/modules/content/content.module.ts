import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from 'src/entities/content/content.schema';
import { SectionSchema } from 'src/entities/section/section.schema';
import { PageSchema } from 'src/entities/page/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Content', schema: ContentSchema },
      { name: 'Section', schema: SectionSchema },
      { name: 'Page', schema: PageSchema },
    ]),
  ],
  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}
