import { TeamService } from './team.service';
import { Response } from 'express';
import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Param,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUpload } from 'src/config/multer.config';
import { calculatePagination } from 'src/helpers/pagination';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAllMembers(
    @Res() res: Response,
    @Query('keywords') keywords,
    @Query('page') page,
  ) {
    const allMembers = await this.teamService.getAllMembers();
    let allMemberRow = [];
    allMembers.forEach((item) => {
      const tempItem = { ...item };
      tempItem.profile_image = `${process.env.BASE_URL}/uploads/team/${item.profile_image}`;
      allMemberRow.push(tempItem);
    });
    if (keywords) {
      const tempArray = allMemberRow.filter((item) =>
        item.name.toLowerCase().includes(keywords.toLowerCase()),
      );
      allMemberRow = [...tempArray];
    }

    const currentPage = page || 1;
    const totalItems = allMemberRow.length;

    const {
      startIndex,
      endIndex,
      pages,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    } = calculatePagination(currentPage, totalItems, keywords);

    const itemsForPage = allMemberRow.slice(startIndex, endIndex);
    return res.render('team/list', {
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

  //Get all Members API Controller
  @Get('api')
  async getAllMembersApi(@Res() res: Response) {
    const allMembers = [];
    const teamMembersArr = await this.teamService.getAllMembers();
    allMembers.forEach((item) => {
      const tempItem = { ...item };
      tempItem.profile_image = `${process.env.BASE_URL}/uploads/team/${item.profile_image}`;
      teamMembersArr.push(tempItem);
    });
    return res.json({ data: allMembers });
  }

  //Get create Member form CMS Controller
  @Get('create-member')
  async getCreateMember(@Res() res: Response) {
    return res.render('team/create', { layout: 'main' });
  }

  //Post create Member CMS Controller
  @Post('create-member')
  @UseInterceptors(FileInterceptor('file', fileUpload(`team`)))
  async createMember(@Body() body, @Res() res: Response, @UploadedFile() file) {
    try {
      const createdMember = await this.teamService.createMember({
        name: body.name,
        designation: body.designation,
        linkedin_link: body.linkedin_link,
        profile_image: file.filename,
      });
      return res.json({
        status: 'success',
        message: 'Successfully created Member!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }

  //Get Member edit form CMS Controller
  @Get('edit-member')
  async getEditMember(@Query('id') id, @Res() res: Response) {
    const viewingMember = await this.teamService.viewMember(id);
    return res.render('team/update', {
      layout: 'main',
      data: {
        name: viewingMember.name,
        designation: viewingMember.designation,
        linkedin_link: viewingMember.linkedin_link,
        profile_image: `${process.env.BASE_URL}/uploads/team/${viewingMember.profile_image}`,
      },
    });
  }

  //Edit Member CMS Controller
  @Put('edit-member/:id')
  @UseInterceptors(FileInterceptor('file', fileUpload(`team`)))
  async editMember(@Body() body, @Param('id') id, @Res() res: Response) {
    try {
      const editedMember = await this.teamService.editMember(id, {
        name: body.name,
        designation: body.designation,
        linkedin_link: body.linkedin_link,
        profile_image: body.profile_image,
        is_active: body.is_active,
      });
      res.json({
        status: 'success',
        message: 'Successfully edited the Member!',
      });
    } catch (error) {
      res.json({ status: 'failed', message: 'Cannot edit the Member' });
    }
  }

  //View Member CMS Controller
  @Get('view-member')
  async viewMember(@Query('id') id, @Res() res: Response) {
    const viewingMember = await this.teamService.viewMember(id);
    return res.render('team/read', {
      layout: 'main',
      data: {
        name: viewingMember.name,
        designation: viewingMember.designation,
        linkedin_link: viewingMember.linkedin_link,
        profile_image: viewingMember.profile_image,
        is_active: viewingMember.is_active,
      },
    });
  }

  //Toggle status CMS Controller
  @Post('toggle-status/:id')
  @UseInterceptors(FileInterceptor('file'))
  async toggleStatus(@Param('id') id, @Res() res: Response, @Body() body) {
    try {
      const activeStatus = await this.teamService.toggleStatus(id, {
        is_active: body.status === 'true' ? false : true,
      });
      console.log(activeStatus);
      return res.json({ status: 'success' });
    } catch (error) {
      return res.json({ status: 'failed' });
    }
  }

  //Delete Member CMS Controller
  @Post(':id')
  async deleteMember(@Param('id') id, @Res() res: Response) {
    try {
      const deletedMember = await this.teamService.deleteMember(id);
      return res.json({
        status: 'Success',
        message: 'Member deleted successfully!',
      });
    } catch (error) {
      return res.json({
        status: 'Failed',
        message: error.message,
      });
    }
  }
}
