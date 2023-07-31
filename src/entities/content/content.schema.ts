/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Section } from '../section/section.schema';
import { Page } from '../page/page.schema';

@Schema()
export class Content extends Document {
  @Prop()
  title: string;

  @Prop()
  sub_title: string;

  @Prop()
  extra_title: string;

  @Prop()
  banner_image: string;

  @Prop()
  thumb_image: string;

  @Prop()
  image_source: string;

  @Prop()
  link_one: string;

  @Prop()
  link_two: string;

  @Prop()
  description_one: string;

  @Prop()
  description_two: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Section' })
  section: Section;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Page' })
  page: Page;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
