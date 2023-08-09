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
import { calculatePagination } from 'src/helpers/pagination';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAllMessages(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allMessages = await this.contactService.getAllMessages();
    let allMessagesRow = [...allMessages];
    if (keywords) {
      const tempArray = allMessagesRow.filter((item) =>
        item.name.toLowerCase().includes(keywords.toLowerCase()),
      );
      allMessagesRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allMessagesRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allMessagesRow.slice(startIndex, endIndex);
    return res.render('contact/list', {
      layout: 'main',
      row: itemsForPage,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    });
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
