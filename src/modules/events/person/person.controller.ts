import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { Request, Response } from 'express';
import { calculatePagination } from '../../../helpers/pagination';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async getAllPersons(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allPersons = await this.personService.getAllPerson();
    let allPersonsRow = [];
    allPersons.forEach((item) => {
      const tempItem = { ...item };
      tempItem.image = `${item.image}`;
      allPersonsRow.push(tempItem);
    });
    if (keywords) {
      const tempArray = allPersonsRow.filter((item) =>
        item.name.toLowerCase().includes(keywords.toLowerCase()),
      );
      allPersonsRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allPersonsRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allPersonsRow.slice(startIndex, endIndex);
    return res.render('person/list', {
      layout: 'main',
      row: itemsForPage,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
      keywords,
    });
  }

  //Get all Persons API Controller
  @Get('api')
  async getAllPersonsApi(@Res() res: Response) {
    const allPersons = await this.personService.getAllPerson();
    const allPersonsRow = [];
    allPersons.forEach((item) => {
      const tempItem = { ...item };
      tempItem.image = `${item.image}`;
      allPersonsRow.push(tempItem);
    });
    return res.json({ data: allPersonsRow });
  }

  //Get create Person form CMS Controller
  @Get('create-person')
  async getCreatePerson(@Res() res: Response) {
    const events = await this.personService.getAllEvents();
    return res.render('person/create', { layout: 'main', row: events });
  }

  //Post create Person CMS Controller
  @Post('create-person')
  @UseInterceptors(FileInterceptor('file'))
  async createPerson(
    @Body() body,
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile() file,
  ) {
    try {
      const image = await this.cloudinaryService.uploadImage(file);
      if (image) {
        const createdPerson = await this.personService.createPerson({
          person_type: body.person_type,
          event_name: body.event_name,
          name: body.name,
          designation: body.designation,
          image: image.url,
        });

        await this.personService.savePersonToEvent(
          body.event_name,
          createdPerson,
        );
      }

      return res.json({
        status: 'success',
        message: 'Successfully created Person!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  //Get Person edit form CMS Controller
  @Get('edit-person')
  async getEditPerson(@Query('id') id, @Res() res: Response) {
    const viewingPerson = await this.personService.viewPerson(id);

    return res.render('person/update', {
      layout: 'main',
      data: {
        event_name: viewingPerson.event_name,
        person_type: viewingPerson.person_type,
        name: viewingPerson.name,
        designation: viewingPerson.designation,
        image: viewingPerson.image,
        event: viewingPerson.event,
      },
    });
  }

  //Edit Person CMS Controller
  @Put('edit-person/:id')
  @UseInterceptors(FileInterceptor('file'))
  async editPerson(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    try {
      const image = await this.cloudinaryService.uploadImage(file);
      if (image) {
        const editedPerson = await this.personService.editPerson(id, {
          person_type: body.person_type,
          event_name: body.event_name,
          name: body.name,
          designation: body.designation,
          image: image.url,
        });
      }
      res.json({
        status: 'success',
        message: 'Successfully edited the Person!',
      });
    } catch (error) {
      res.json({ status: 'failed', message: 'Cannot edit the Person' });
    }
  }

  //Delete Person CMS Controller
  @Post(':id')
  async deletePerson(@Param('id') id, @Res() res: Response) {
    try {
      const deletedPerson = await this.personService.deletePerson(id);

      return res.json({
        status: 'Success',
        message: 'Person deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
