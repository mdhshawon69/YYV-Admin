import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class Events extends Document {
  @Prop()
  banner_img: string;

  @Prop()
  title: string;

  @Prop()
  event_type: string;

  @Prop()
  event_date: string;

  @Prop()
  event_start_time: string;

  @Prop()
  event_end_time: string;

  @Prop()
  event_location: string;

  @Prop()
  event_status: string;

  @Prop()
  event_background: string;

  @Prop()
  event_description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }] })
  persons: mongoose.Schema.Types.ObjectId[];
}

export const EventsSchema = SchemaFactory.createForClass(Events);
