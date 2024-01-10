import { Injectable } from '@nestjs/common';
import { Events } from '../../entities/events/events.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name) private readonly eventsModel: Model<Events>,
  ) {}

  async getEvents(): Promise<Events[]> {
    return await this.eventsModel
      .find()
      .populate('persons')
      .populate('rsvp')
      .lean();
  }

  async addEvent(eventItem): Promise<Events> {
    return await this.eventsModel.create(eventItem);
  }

  async deleteEvent(id) {
    return await this.eventsModel.findByIdAndDelete(id);
  }

  async editEvent(id, event) {
    return await this.eventsModel.findByIdAndUpdate(id, event);
  }

  async getOneEvent(id) {
    const event = await this.eventsModel.findById(id).populate('rsvp').lean();
    return event;
  }
}
