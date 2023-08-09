/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Page } from '../page/page.schema';

@Schema()
export class Section extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Page' })
  page: Page;

  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  is_multiple_content: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }] })
  content: mongoose.Schema.Types.ObjectId[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
