import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  UseInterceptors,
  Req,
  UploadedFiles,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  //Get all Programs CMS Controller
  @Get()
  async getAllPrograms(@Res() res: Response, @Query('keywords') keywords) {
    const allPrograms = await this.programsService.getAllPrograms();
    const allProgramsRow = [];
    allPrograms.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = `${process.env.BASE_URL}/uploads/programs/${item.thumb_image}`;
      allProgramsRow.push(tempItem);
    });
    const filtedPrograms = allProgramsRow.filter((program) => {
      return program.title.toLowerCase().includes(keywords?.toLowerCase());
    });
    return res.render('programs/list', {
      layout: 'main',
      row: !keywords ? allProgramsRow : filtedPrograms,
    });
  }

  //Get all Programs API Controller
  @Get('api')
  async getAllProgramsApi(@Res() res: Response) {
    const allPrograms = await this.programsService.getAllPrograms();
    const allProgramsRow = [];
    allPrograms.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = `uploads/programs/${item.thumb_image}`;
      allProgramsRow.push(tempItem);
    });
    return res.json({ data: allProgramsRow });
  }

  //Get create Program form CMS Controller
  @Get('create-program')
  async getCreateProgram(@Res() res: Response) {
    return res.render('programs/create', { layout: 'main' });
  }

  //Post create Program CMS Controller
  @Post('create-program')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'program_file', maxCount: 1 },
        { name: 'about_file', maxCount: 1 },
      ],
      fileUpload(`programs`),
    ),
  )
  async createProgram(
    @Body() body,
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles()
    files: {
      program_file: Express.Multer.File;
      about_file: Express.Multer.File;
    },
  ) {
    try {
      const createdProgram = await this.programsService.createProgram({
        title: body.title,
        thumb_image: files.program_file[0].filename,
        image_source: body.image_source,
        about_program: {
          about_program_title: body.about_program_title,
          about_program_description_one: body.about_program_description_one,
          about_program_description_two: body.about_program_description_two,
          about_program_thumb_image: files.about_file[0].filename,
          image_source: body.about_program_thumb_image_source,
        },
      });
      console.log(createdProgram);
      return res.json({
        status: 'Success',
        message: 'Successfully created Program!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  //Get Program edit form CMS Controller
  @Get('edit-program')
  async getEditProgram(@Query('id') id, @Res() res: Response) {
    const viewingProgram = await this.programsService.viewProgram(id);
    return res.render('programs/update', {
      layout: 'main',
      data: {
        title: viewingProgram.title,
        thumb_image: `${process.env.BASE_URL}/uploads/programs/${viewingProgram.thumb_image}`,
        image_source: viewingProgram.image_source,
        about_program: {
          title: viewingProgram.about_program.about_program_title,
          description_one:
            viewingProgram.about_program.about_program_description_one,
          description_two:
            viewingProgram.about_program.about_program_description_two,
          about_program_thumb_image: `${process.env.BASE_URL}/uploads/programs/${viewingProgram.about_program.about_program_thumb_image}`,
          image_source: viewingProgram.about_program.image_source,
        },
      },
    });
  }

  //Edit Program CMS Controller
  //   @Put('edit-program/:id')
  //   @UseInterceptors(FileInterceptor('file', fileUpload(`programs`)))
  //   async editProgram(
  //     @Body() body,
  //     @Param('id') id,
  //     @Res() res: Response,
  //     @UploadedFiles() file,
  //   ) {
  //     try {
  //       const editedProgram = await this.programsService.editProgram(id, {
  //         title: body.Program_title,
  //         description: body.description,
  //         type: body.Program_type,
  //         thumb_image: file?.filename,
  //         Program_link: body.Program_link,
  //         Program_location: body.Program_location,
  //       });
  //       console.log(editedProgram);
  //       res.json({
  //         status: 'success',
  //         message: 'Successfully edited the Program!',
  //       });
  //     } catch (error) {
  //       res.json({ status: 'failed', message: 'Cannot edit the Program' });
  //     }
  //   }

  //   //View Program CMS Controller
  //   @Get('view-program')
  //   async viewProgram(@Query('id') id, @Res() res: Response) {
  //     const viewingProgram = await this.programsService.viewProgram(id);
  //     return res.render('Programs/read', {
  //       layout: 'main',
  //       data: {
  //         title: viewingProgram.title,
  //         description: viewingProgram.description,
  //         thumb_image: `${process.env.BASE_URL}/uploads/Programs/${viewingProgram.thumb_image}`,
  //         Program_link: viewingProgram.Program_link,
  //         Program_location: viewingProgram.Program_location,
  //       },
  //     });
  //   }

  //   //Delete Program CMS Controller
  //   @Post(':id')
  //   async deleteProgram(@Param('id') id, @Res() res: Response) {
  //     try {
  //       const deletedProgram = await this.programsService.deleteProgram(id);
  //       return res.json({
  //         status: 'Success',
  //         message: 'Program deleted successfully!',
  //       });
  //     } catch (error) {
  //       return res.json({
  //         status: 'Failed',
  //         message: error.message,
  //       });
  //     }
  //   }
}
