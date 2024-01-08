import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from '../../../entities/events/event_person.schema';
import { Model } from 'mongoose';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private readonly personModel: Model<Person>,
  ) {}

  async getAllPerson() {
    return this.personModel.find().lean();
  }

  async createPerson(people) {
    return await this.personModel.create(people);
  }

  async viewPerson(id) {
    return await this.personModel.findById(id);
  }

  async editPerson(id, people) {
    console.log(id);
    return await this.personModel.findByIdAndUpdate(id, people);
  }

  async deletePerson(id) {
    return await this.personModel.findByIdAndDelete(id);
  }
}
