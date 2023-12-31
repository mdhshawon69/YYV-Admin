import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const EventsSchema = SchemaFactory.createForClass(Events);
