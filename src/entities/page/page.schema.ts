/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Programs } from '../programs/programs.schema';

@Schema()
export class Page extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
    },
  ])
  section: mongoose.Schema.Types.ObjectId[];

  @Prop({
    required: true,
  })
  page_for: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
