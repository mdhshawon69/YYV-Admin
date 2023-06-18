import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionSchema } from 'src/entities/section/section.schema';
import { PageSchema } from 'src/entities/page/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Section', schema: SectionSchema },
      { name: 'Page', schema: PageSchema },
    ]),
  ],
  providers: [SectionService],
  controllers: [SectionController],
})
export class SectionModule {}
