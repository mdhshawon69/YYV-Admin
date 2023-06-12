import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutSchema } from 'src/entities/about/about.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'About', schema: AboutSchema }]),
  ],
  providers: [AboutService],
  controllers: [AboutController],
})
export class AboutModule {}
