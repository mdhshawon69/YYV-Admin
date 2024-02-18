import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RSVP } from '../../../entities/events/rsvp.schema';
import { Model } from 'mongoose';
import { Events } from '../../../entities/events/events.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class RsvpService {
  constructor(
    @InjectModel(RSVP.name) private readonly RSVPModel: Model<RSVP>,
    @InjectModel(Events.name) private readonly eventsModel: Model<Events>,
  ) {}

  async addRSVP(rsvp): Promise<RSVP> {
    const savedRsvp = await this.RSVPModel.create(rsvp);
    if (savedRsvp) {
      await this.eventsModel.updateOne(
        {
          _id: new ObjectId(rsvp.event),
        },
        { $push: { rsvp: savedRsvp._id } },
      );
    }
    return savedRsvp;
  }

  async updateRSVP(rsvpId, status) {
    return await this.RSVPModel.updateOne(
      { _id: rsvpId },
      { $set: { status: status } },
    );
  }
}
