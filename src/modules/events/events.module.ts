import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsSchema } from '../../entities/events/events.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PersonModule } from './person/person.module';
import { RsvpModule } from './rsvp/rsvp.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Events', schema: EventsSchema }]),
    PersonModule,
    RsvpModule,
  ],
  providers: [EventsService, CloudinaryService],
  controllers: [EventsController],
})
export class EventsModule {}
