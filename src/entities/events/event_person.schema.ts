import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop()
  person_type: string;

  @Prop()
  name: string;

  @Prop()
  designation: string;

  @Prop()
  image: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
