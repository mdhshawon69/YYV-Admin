/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum AboutType {
  ABOUT = 'about',
  PROGRAMS = 'programs',
  PORTFOLIO = 'portfolio',
  ADVISORY_SERVICE = 'advisory_service',
  HOME = 'home',
  MEDIA_KIT = 'media_kit',
}

@Schema()
export class About extends Document {
  @Prop({ required: true, enum: AboutType })
  type: AboutType;

  @Prop()
  title: string;

  @Prop({ required: true })
  description_one: string;

  @Prop({ required: true })
  description_two: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const AboutSchema = SchemaFactory.createForClass(About);
