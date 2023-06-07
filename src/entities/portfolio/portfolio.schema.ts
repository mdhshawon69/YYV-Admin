/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum PortfolioType {
  PROGRAM_ALUMNI = 'program_alumni',
  VENTURE_INVESTMENT = 'venture_investment',
}

@Schema()
export class Portfolio extends Document {
  @Prop({ required: true, enum: PortfolioType })
  type: PortfolioType;

  @Prop({ required: true })
  company_name: string;

  @Prop({ required: true })
  company_logo: string;

  @Prop({ required: true })
  company_link: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: Date.now })
  published_at: Date;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
