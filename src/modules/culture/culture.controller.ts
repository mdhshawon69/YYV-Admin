import { CultureService } from './culture.service';
import {
  Controller,
  Get,
  Res,
  Post,
  Put,
  UseInterceptors,
  Body,
  UploadedFile,
  Query,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';
import { calculatePagination } from 'src/helpers/pagination';

@Controller('culture')
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  //Get all Cultures CMS Controller
  @Get()
  async getAllCultures(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allCultures = await this.cultureService.getAllCulture();
    let allCulturesRow = [];
    allCultures.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = `uploads/culture/${item.thumb_image}`;
      allCulturesRow.push(tempItem);
    });

    if (keywords) {
      const tempArray = allCulturesRow.filter((item) =>
        item.title.toLowerCase().includes(keywords.toLowerCase()),
      );
      allCulturesRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allCulturesRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allCulturesRow.slice(startIndex, endIndex);

    return res.render('culture/list', {
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

  //Get all Cultures API Controller
  @Get('api')
  async getAllCulturesApi(@Res() res: Response) {
    const allCultures = await this.cultureService.getAllCultureApi();
    const allCulturesRow = [];
    allCultures.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = `uploads/culture/${item.thumb_image}`;
      allCulturesRow.push(tempItem);
    });
    return res.json({ data: allCulturesRow });
  }

  //Get Culture adding form CMS controller
  @Get('create-culture')
  async getCreateCulture(@Res() res: Response) {
    return res.render('culture/create', { layout: 'main' });
  }

  //Post Cultures CMS Controller
  @Post('create-Culture')
  @UseInterceptors(FileInterceptor('file', fileUpload(`culture`)))
  async createCulture(
    @UploadedFile() file,
    @Body() body,
    @Res() res: Response,
  ) {
    const createdCulture = await this.cultureService.createCulture({
      title: body.title,
      description: body.description,
      thumb_image: file.filename,
    });

    try {
      return res.json({
        status: 'success',
        message: 'Successfully created Culture!',
      });
    } catch (error) {
      return res.json({
        status: 'failed',
        message: error.message,
      });
    }
  }

  //View Project CMS Controller
  @Get('view-culture')
  async viewCulture(@Query('id') id, @Res() res: Response) {
    const viewingCulture = await this.cultureService.getOneCulture(id);
    return res.render('culture/read', {
      layout: 'main',
      data: {
        title: viewingCulture.title,
        description: viewingCulture.description,
        thumb_image: `${process.env.BASE_URL}/uploads/culture/${viewingCulture.thumb_image}`,
      },
    });
  }

  //Get Culture editing form CMS Controller
  @Get('edit-culture')
  async getEditCulture(@Res() res: Response, @Query('id') id) {
    const culture = await this.cultureService.getOneCulture(id);
    console.log(culture);

    res.render('culture/update', {
      layout: 'main',
      data: {
        title: culture.title,
        description: culture.description,
        thumb_image: `${process.env.BASE_URL}/uploads/culture/${culture.thumb_image}`,
      },
    });
  }

  //Post Culture editing CMS Controller
  @Put('edit-culture/:id')
  @UseInterceptors(FileInterceptor('file', fileUpload(`culture`)))
  async editCulture(
    @Body() body,
    @Param('id') id,
    @UploadedFile() file,
    @Res() res: Response,
  ) {
    try {
      const editedCulture = await this.cultureService.editCulture(
        id,
        body.title,
        body.description,
        body.thumb_image,
      );

      return res.json({
        status: 'success',
        message: 'Culture edited successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  @Post(':id')
  async deleteCulture(@Param('id') id, @Res() res: Response) {
    try {
      const deletedCulture = await this.cultureService.deleteCulture(id);
      return res.json({
        status: 'Success',
        message: 'Deleted Culture successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
