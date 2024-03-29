import { Request, Response } from 'express';
import { ProjectsService } from './projects.service';
import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  UseInterceptors,
  Req,
  UploadedFile,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';
import { calculatePagination } from 'src/helpers/pagination';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectService: ProjectsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  //Get all Projects CMS Controller
  @Get()
  async getAllProjects(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allProjects = await this.projectService.getAllProjects();
    let allProjectsRow = [];
    allProjects.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = `${item.thumb_image}`;
      allProjectsRow.push(tempItem);
    });
    if (keywords) {
      const tempArray = allProjectsRow.filter((item) =>
        item.title.toLowerCase().includes(keywords.toLowerCase()),
      );
      allProjectsRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allProjectsRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allProjectsRow.slice(startIndex, endIndex);
    return res.render('projects/list', {
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

  //Get all Projects API Controller
  @Get('api')
  async getAllProjectsApi(@Res() res: Response) {
    const allProjects = await this.projectService.getAllProjects();
    const allProjectsRow = [];
    allProjects.forEach((item) => {
      const tempItem = { ...item };
      tempItem.thumb_image = `${item.thumb_image}`;
      allProjectsRow.push(tempItem);
    });
    return res.json({ data: allProjectsRow });
  }

  //Get create Project form CMS Controller
  @Get('create-project')
  async getCreateProject(@Res() res: Response) {
    return res.render('projects/create', { layout: 'main' });
  }

  //Post create Project CMS Controller
  @Post('create-Project')
  @UseInterceptors(FileInterceptor('file'))
  async createProject(
    @Body() body,
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile() file,
  ) {
    try {
      const thumbImage = await this.cloudinaryService.uploadImage(file);
      const link = `${body.title.toLowerCase().split(' ').join('-')}`;
      const data = {
        title: body.title,
        description: body.description,
        thumb_image: thumbImage.url,
        link: body.has_landing_page === 'on' ? link : body.link,
        project_location: body.project_location,
        status: body.status,
        year: body.year,
      };

      if (thumbImage) {
        const createdProject = await this.projectService.createProject(data);
      }

      return res.json({
        status: 'Success',
        message: 'Successfully created Project!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  //Get Project edit form CMS Controller
  @Get('edit-project')
  async getEditProject(@Query('id') id, @Res() res: Response) {
    const viewingProject = await this.projectService.viewProject(id);
    return res.render('projects/update', {
      layout: 'main',
      data: {
        title: viewingProject.title,
        description: viewingProject.description,
        thumb_image_source: viewingProject.thumb_image,
        thumb_image: `${viewingProject.thumb_image}`,
        project_location: viewingProject.project_location,
        project_link: viewingProject.link,
        status: viewingProject.status,
        year: viewingProject.year,
      },
    });
  }

  //Edit Project CMS Controller
  @Put('edit-project/:id')
  @UseInterceptors(FileInterceptor('file'))
  async editProject(
    @Body() body,
    @Param('id') id,
    @Res() res: Response,
    @UploadedFile() file,
  ) {
    try {
      const thumbImage = await this.cloudinaryService.uploadImage(file);
      if (thumbImage) {
        const editedProject = await this.projectService.editProject(id, {
          title: body.title,
          description: body.description,
          type: body.project_type,
          thumb_image: thumbImage.url,
          project_link: body.project_link,
          project_location: body.project_location,
          status: body.status,
          year: body.year,
        });
      }

      res.json({
        status: 'success',
        message: 'Successfully edited the project!',
      });
    } catch (error) {
      res.json({ status: 'failed', message: 'Cannot edit the project' });
    }
  }

  //View Project CMS Controller
  @Get('view-project')
  async viewProject(@Query('id') id, @Res() res: Response) {
    const viewingProject = await this.projectService.viewProject(id);
    return res.render('projects/read', {
      layout: 'main',
      data: {
        title: viewingProject.title,
        description: viewingProject.description,
        thumb_image: `${viewingProject.thumb_image}`,
        project_link: viewingProject.link,
        project_location: viewingProject.project_location,
        status: viewingProject.status,
        year: viewingProject.year,
      },
    });
  }

  //Delete Project CMS Controller
  @Post(':id')
  async deleteProject(@Param('id') id, @Res() res: Response) {
    try {
      const deletedProject = await this.projectService.deleteProject(id);
      return res.json({
        status: 'Success',
        message: 'Project deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
