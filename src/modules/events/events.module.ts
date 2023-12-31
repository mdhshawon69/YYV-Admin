import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsSchema } from '../../entities/events/events.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Events', schema: EventsSchema }]),
  ],
  providers: [EventsService, CloudinaryService],
  controllers: [EventsController],
})
export class EventsModule {}
