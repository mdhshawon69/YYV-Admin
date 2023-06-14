/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum PageType {
  PROGRAMS_PAGE = 'programs_page',
  EVENTS_PAGE = 'events_page',
}

@Schema()
export class Page extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
