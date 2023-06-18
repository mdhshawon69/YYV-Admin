/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Page } from '../page/page.schema';

@Schema()
export class Section extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Page' })
  page: Page;

  @Prop({ unique: true })
  name: string;

  @Prop({ unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  is_multiple_content: boolean;

  @Prop()
  content: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Content' }];
}

export const SectionSchema = SchemaFactory.createForClass(Section);