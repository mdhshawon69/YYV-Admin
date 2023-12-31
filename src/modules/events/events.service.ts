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
    return await this.eventsModel.find().lean();
  }

  async addEvent(eventItem): Promise<Events> {
    return await this.eventsModel.create(eventItem);
  }

  async deleteEvent(id) {
    return await this.eventsModel.findByIdAndDelete(id);
  }

  async editEvent(id, title, number) {
    return await this.eventsModel.findByIdAndUpdate(id, {
      title: title,
      impact_number: number,
    });
  }

  async getOneEvent(id) {
    const event = await this.eventsModel.findById(id);
    return event;
  }
}
