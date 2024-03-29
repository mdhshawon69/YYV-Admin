/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  thumb_image: string;

  @Prop()
  link: string;

  @Prop({ required: true })
  project_location: string;

  @Prop({ required: true })
  status: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;

  @Prop()
  year: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
