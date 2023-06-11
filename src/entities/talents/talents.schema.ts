/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Talents extends Document {
  @Prop({ required: true })
  job_title: string;

  @Prop({ required: true })
  job_description: string;

  @Prop({ required: true })
  job_responsibilities: string;

  @Prop({ required: true })
  qualifications: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const TalentsSchema = SchemaFactory.createForClass(Talents);
