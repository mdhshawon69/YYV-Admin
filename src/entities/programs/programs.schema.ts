/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

enum PageType {
  PROGRAMS_PAGE = 'programs_page',
  EVENTS_PAGE = 'events_page',
}

@Schema()
export class Programs extends Document {
  @Prop({ required: true, enum: PageType })
  type: PageType;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  sub_title: string;

  @Prop({ required: true })
  banner_image: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const ProgramsSchema = SchemaFactory.createForClass(Programs);
