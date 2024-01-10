import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { calculatePagination } from '../../helpers/pagination';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Get()
  async getEvents(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    try {
      const events = await this.eventsService.getEvents();
      let eventRow = [...events];

      if (keywords) {
        const tempArray = eventRow.filter((item) =>
          item.title.toLowerCase().includes(keywords.toLowerCase()),
        );
        eventRow = [...tempArray];
      }

      const currentPage = page || 1;
      const totalItems = eventRow.length;

      const {
        startIndex,
        endIndex,
        pages,
        hasPrev,
        prevPage,
        hasNext,
        nextPage,
      } = calculatePagination(currentPage, totalItems, keywords);

      const itemsForPage = eventRow.slice(startIndex, endIndex);

      return res.render('events/list', {
        layout: 'main',
        data: itemsForPage,
        pages,
        hasPrev,
        prevPage,
        hasNext,
        nextPage,
        keywords,
      });
    } catch (error) {
      console.log(error);
      throw new Error('An error occured');
    }
  }

  //Get all impact numbers API Controller
  @Get('api')
  async getEventsApi(@Res() res: Response) {
    try {
      const events = await this.eventsService.getEvents();
      console.log(events);
      return res.json({ data: events });
    } catch (error) {
      throw new Error('An error occured');
    }
  }

  //Get impact number adding form CMS Controller
  @Get('add-event')
  async getAddEvent(@Res() res: Response) {
    return res.render('events/create', { layout: 'main' });
  }

  //Post impact number CMS Controller
  @Post('add-event')
  @UseInterceptors(FileInterceptor('file'))
  async postAddEvent(@Body() body, @Res() res: Response, @UploadedFile() file) {
    try {
      const banner = await this.cloudinaryService.uploadImage(file);

      if (banner) {
        const eventItem = await this.eventsService.addEvent({
          title: body.title,
          banner_img: banner.url,
          event_type: body.event_type,
          event_date: body.event_date,
          event_start_time: body.event_start_time,
          event_end_time: body.event_start_time,
          event_location: body.event_location,
          event_status: body.event_status,
          event_background: body.event_background,
          event_description: body.event_description,
        });
      }

      return res.json({
        status: 'Success',
        message: 'Successfully added event item',
      });
    } catch (error) {
      res.json({ status: 'Failed', message: error.message });
    }
  }

  // Get impact number editing form CMS Controller
  @Get('edit-event')
  async getEditeEvent(@Query() query, @Res() res: Response) {
    const event = await this.eventsService.getOneEvent(query.id);

    return res.render('events/update', {
      layout: 'main',
      data: {
        title: event.title,
        banner_img: event.banner_img,
        event_type: event.event_type,
        event_date: event.event_date,
        event_start_time: event.event_start_time,
        event_end_time: event.event_start_time,
        event_location: event.event_location,
        event_status: event.event_status,
        event_background: event.event_background,
        event_description: event.event_description,
      },
    });
  }

  //Editing impact number CMS Controller
  @Put('edit-event/:id')
  @UseInterceptors(FileInterceptor('file'))
  async editEvent(
    @Param() param,
    @Body() body,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    const id = param.id;
    const banner = await this.cloudinaryService.uploadImage(file);
    if (banner) {
      try {
        const editedItem = await this.eventsService.editEvent(id, {
          title: body.title,
          banner_img: banner.url,
          event_type: body.event_type,
          event_date: body.event_date,
          event_start_time: body.event_start_time,
          event_end_time: body.event_start_time,
          event_location: body.event_location,
          event_status: body.event_status,
          event_background: body.event_background,
          event_description: body.event_description,
        });

        return res.json({
          status: 'Success',
          message: 'Successfully edited event',
        });
      } catch (error) {
        return res.json({
          status: 'Failed',
          message: error.message,
        });
      }
    }
  }

  @Get('view-event-rsvp')
  async getRSVP(@Query() query, @Res() res: Response) {
    const event = await this.eventsService.getOneEvent(query.id);

    return res.render('events/rsvp', {
      layout: 'main',
      data: {
        title: event.title,
        rsvp: event.rsvp,
      },
    });
  }

  // Delete impact number CMS Controller
  @Post(':id')
  async deleteEvent(@Param() param, @Res() res: Response) {
    try {
      const id = param.id;
      await this.eventsService.deleteEvent(id);
      return res.json({
        status: 'Success',
        message: 'Impact item deleted successfully!',
      });
    } catch (error) {
      return res.json({ status: 'Failed', message: error.message });
    }
  }
}
