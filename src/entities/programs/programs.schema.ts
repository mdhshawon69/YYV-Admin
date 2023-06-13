/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class AboutProgram extends Document {
  @Prop()
  about_program_title: string;

  @Prop()
  about_program_description_one: string;

  @Prop()
  about_program_description_two: string;

  @Prop()
  about_program_thumb_image: string;

  @Prop()
  image_source: string;
}

@Schema()
export class Programs extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  thumb_image: string;

  @Prop()
  image_source: string;

  @Prop()
  about_program: AboutProgram;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const ProgramsSchema = SchemaFactory.createForClass(Programs);
