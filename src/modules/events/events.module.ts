import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsSchema } from '../../entities/events/events.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Events', schema: EventsSchema }]),
    PersonModule,
  ],
  providers: [EventsService, CloudinaryService],
  controllers: [EventsController],
})
export class EventsModule {}
