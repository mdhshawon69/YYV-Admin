import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/entities/contact/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
  ) {}

  async getAllMessages() {
    return await this.contactModel.find().lean();
  }

  async createMessage(message) {
    return await this.contactModel.create(message);
  }

  async viewMessage(id) {
    return await this.contactModel.findById(id);
  }

  async deleteMessage(id) {
    return await this.contactModel.findByIdAndDelete(id);
  }
}
