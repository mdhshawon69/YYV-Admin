import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop()
  person_type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Events' })
  event_name: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  designation: string;

  @Prop()
  image: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
