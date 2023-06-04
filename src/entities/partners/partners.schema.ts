/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Partners extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: Buffer })
  partner_logo: Buffer;

  @Prop({ required: true })
  partner_link: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const PartnersSchema = SchemaFactory.createForClass(Partners);
