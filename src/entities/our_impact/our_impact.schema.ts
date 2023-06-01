/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ImpactNumber extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  impact_number: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop()
  published_at: Date;
}

export const ImpactNumberSchema = SchemaFactory.createForClass(ImpactNumber);
