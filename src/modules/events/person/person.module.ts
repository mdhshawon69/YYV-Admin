import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from '../../../entities/events/event_person.schema';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { EventsSchema } from '../../../entities/events/events.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: PersonSchema, name: 'Person' },
      { schema: EventsSchema, name: 'Events' },
    ]),
  ],
  controllers: [PersonController],
  providers: [PersonService, CloudinaryService],
})
export class PersonModule {}
