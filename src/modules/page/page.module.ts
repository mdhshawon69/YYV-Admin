import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PageSchema } from 'src/entities/page/page.schema';
import { ProgramsSchema } from 'src/entities/programs/programs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Page', schema: PageSchema },
      { name: 'Programs', schema: ProgramsSchema },
    ]),
  ],
  providers: [PageService],
  controllers: [PageController],
})
export class PageModule {}
