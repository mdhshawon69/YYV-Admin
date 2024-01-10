import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class RSVP extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  organization: string;

  @Prop({ default: 'Please select' })
  status: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }] })
  event: mongoose.Schema.Types.ObjectId[];
}

export const RSVPSchema = SchemaFactory.createForClass(RSVP);
