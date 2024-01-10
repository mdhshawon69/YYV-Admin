import { Module } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { RsvpController } from './rsvp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RSVPSchema } from '../../../entities/events/rsvp.schema';
import { EventsSchema } from '../../../entities/events/events.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: RSVPSchema, name: 'RSVP' },
      { schema: EventsSchema, name: 'Events' },
    ]),
  ],
  providers: [RsvpService],
  controllers: [RsvpController],
})
export class RsvpModule {}
