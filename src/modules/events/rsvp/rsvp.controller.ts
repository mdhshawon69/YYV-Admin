import {
  Body,
  Controller,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Post('create-rsvp/api')
  @UseInterceptors(FileInterceptor('file'))
  async createRSVP(@Body() body, @Res() res: Response) {
    try {
      const createdRSVP = await this.rsvpService.addRSVP({
        name: body.name,
        email: body.email,
        organization: body.organization,
        status: body.status,
        event: body.event,
      });

      res.json({
        status: 'success',
        message: 'Registered Successfully!',
        rsvp_id: createdRSVP._id,
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 'failed', message: 'Cannot Register' });
    }
  }

  @Put('edit-rsvp/api')
  @UseInterceptors(FileInterceptor('file'))
  async editRSVP(@Body() body, @Res() res: Response) {
    try {
      const editedRSVP = await this.rsvpService.updateRSVP(
        body.rsvp_id,
        body.status,
      );

      res.json({ status: 'success', message: 'RSVP Updated Successfully!' });
    } catch (error) {
      console.log(error);
      res.json({ status: 'failed', message: 'Cannot Update RSVP' });
    }
  }
}
