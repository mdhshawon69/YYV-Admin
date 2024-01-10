import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from '../../../entities/events/event_person.schema';
import mongoose, { Model } from 'mongoose';
import { Events } from '../../../entities/events/events.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private readonly personModel: Model<Person>,
    @InjectModel(Events.name) private readonly eventsModel: Model<Events>,
  ) {}

  async getAllPerson() {
    return this.personModel.find().lean();
  }

  async createPerson(person) {
    return await this.personModel.create(person);
  }

  async viewPerson(id) {
    const person = await this.personModel.findById(id).lean();
    const event = await this.eventsModel
      .findById(new ObjectId(person.event_name))
      .lean();

    return { ...person, event };
  }

  async editPerson(id, person) {
    return await this.personModel.findByIdAndUpdate(id, person);
  }

  async deletePerson(id) {
    const person = await this.personModel.findById(id);
    const deletedFromEvent = await this.eventsModel.updateOne(
      {
        _id: new ObjectId(person.event_name),
      },
      { $pull: { persons: id } },
    );
    if (deletedFromEvent) {
      return await this.personModel.findByIdAndDelete(id);
    }
  }

  async getAllEvents() {
    return this.eventsModel.find({}).lean();
  }

  async savePersonToEvent(id, person) {
    const saved = await this.eventsModel.updateOne(
      { _id: id },
      { $push: { persons: person._id } },
    );
    return saved;
  }
}
