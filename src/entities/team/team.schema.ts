/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Team extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  linkedin_link: string;

  @Prop({ required: true })
  profile_image: string;

  @Prop({ required: true })
  image_bg: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
