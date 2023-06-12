import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
  Query,
  Param,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAllMessages(@Res() res: Response) {
    const allMessages = await this.contactService.getAllMessages();
    return res.render('contact/list', { layout: 'main', row: allMessages });
  }

  @Post('create-message/api')
  @UseInterceptors(FileInterceptor('file'))
  async createMessage(@Body() body, @Res() res: Response) {
    try {
      const createdMessage = await this.contactService.createMessage({
        name: body.name,
        email: body.email,
        company: body.company,
        message: body.message,
      });

      console.log(createdMessage);

      res.json({ status: 'success', message: 'Message sent successfully!' });
    } catch (error) {
      console.log(error);
      res.json({ status: 'failed', message: 'Cannot send the message' });
    }
  }

  @Get('view-message')
  async viewMessage(@Query('id') id, @Res() res: Response) {
    const viewedMessage = await this.contactService.viewMessage(id);
    return res.render('contact/read', {
      layout: 'main',
      data: {
        name: viewedMessage.name,
        email: viewedMessage.email,
        company: viewedMessage.company,
        message: viewedMessage.message,
      },
    });
  }

  @Post(':id')
  async deleteMessage(@Param('id') id, @Res() res: Response) {
    try {
      const deletedMessage = await this.contactService.deleteMessage(id);
      return res.json({
        status: 'Success',
        message: 'Deleted message successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
