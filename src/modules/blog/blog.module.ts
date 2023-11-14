import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogSchema } from 'src/entities/blog/blog.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }])],
  providers: [BlogService, CloudinaryService],
  controllers: [BlogController],
})
export class BlogModule {}
