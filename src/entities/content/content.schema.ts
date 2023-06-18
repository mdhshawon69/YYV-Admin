/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Section } from '../section/section.schema';

@Schema()
export class Content extends Document {
  @Prop({ unique: true })
  title: string;

  @Prop({ unique: true })
  sub_title: string;

  @Prop({ unique: true })
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
}

export const ContentSchema = SchemaFactory.createForClass(Content);
