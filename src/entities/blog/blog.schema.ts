/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum BlogType {
  NEWS = 'news',
  VIEWS = 'views',
  STORIES = 'stories',
  NEWSLETTER = 'newsletter',
}

@Schema()
export class Blog extends Document {
  @Prop({ required: true, enum: BlogType })
  type: BlogType;

  @Prop({ required: true })
  title: string;

  @Prop()
  sub_title: string;

  @Prop()
  name_of_viewer: string;

  @Prop()
  designation_of_viewer: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  thumb_image: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
